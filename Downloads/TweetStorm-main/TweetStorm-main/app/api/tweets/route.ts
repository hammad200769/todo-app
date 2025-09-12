import { incrementCreditsUsage } from '@/api-utils/database/credits-usage';
import { getRemainingUserCredits } from '@/api-utils/database/users';
import {
  formatKeywordsArray,
  getMaxTokens,
  getSystemPromptForTweetGeneration,
  getTweetPrompt,
  notEnoughCreditsResponse,
  openaiClient,
  validationErrorResponse,
} from '@/api-utils/utils';
import { validationSchemas } from '@/api-utils/validation-schemas';
import db from '@/DB/db';
import { auth, handleRequest, handleServerError } from '@/middlewares';
import { RouteHandler, RouteInitiator } from '@/types/server';
import { GPT_MODEL, STANDARD_TWEET_LENGTH } from '@/types/types';
import { USER_GENERATION_TYPE_TO_NUMBER_MAP } from '@/utils/constants';
import { getTweetCost } from '@/utils/utils';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export const POST: RouteInitiator = (...params) => {
  return handleRequest(params, handlePost, [auth]);
};

const handlePost: RouteHandler = async (request, next) => {
  try {
    const data = await request.json();
    const { error } = validationSchemas.tweetGeneration.validate(data);
    if (error) {
      return validationErrorResponse(error);
    }
    const token = (await getToken({ req: request as NextRequest }))!;

    const remainingCredits = await getRemainingUserCredits(token.id as number);
    if (remainingCredits - getTweetCost(data.tweetLength) < 0) {
      return notEnoughCreditsResponse(
        'You do not have enough credits to perform this operation.'
      );
    }
    const userInput = data.userInput;

    const gptModel = GPT_MODEL.GPT_4;

    const tweetPrompt = getTweetPrompt({
      textPrompt: userInput.promptedText,
      includeEmojis: userInput.includeEmojis,
      includeHashtags: userInput.includeHashtags,
      tweetSentiment: userInput.tone,
      keywords: userInput.keywords,
    });
    const keywordsArray =
      userInput.keywords.length > 0
        ? formatKeywordsArray(userInput.keywords)
        : [];
    let includeKeyWordsForPrompt = false;
    if (keywordsArray.length > 0) {
      includeKeyWordsForPrompt = true;
    }

    const systemPrompt = getSystemPromptForTweetGeneration(
      data.tweetLength,
      userInput.tone !== 'No-Tone',
      includeKeyWordsForPrompt
    );

    const maxTokens =
      data.tweetLength === STANDARD_TWEET_LENGTH.Short
        ? 200
        : getMaxTokens(tweetPrompt.length + systemPrompt.length, gptModel);
    const chatCompletion = await openaiClient.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: tweetPrompt,
        },
      ],
      model: gptModel,
      max_completion_tokens: maxTokens,
    });

    const generatedText = chatCompletion.choices[0].message.content;

    if (!generatedText) {
      return Response.json(
        'An empty response was returned. Can you try changing your prompt?',
        {
          status: 422,
        }
      );
    }
    await db('user_generations').insert({
      prompted_text: userInput.promptedText,
      text: generatedText,
      user_id: token.id,
      type: USER_GENERATION_TYPE_TO_NUMBER_MAP.Tweet,
      created_at: new Date(),
      cost: getTweetCost(data.tweetLength),
      prompt_options: {
        includeEmojis: userInput.includeEmojis,
        includeHashtags: userInput.includeHashtags,
        tone: userInput.tone,
        keywords: keywordsArray,
      },
      updated_at: new Date(),
    });
    const url = new URL(request.url).pathname;

    incrementCreditsUsage(
      token.id as number,
      getTweetCost(data.tweetLength)
    ).catch(err => {
      handleServerError({
        err,
        key: url,
        subject: 'Error in incrementing credits usage',
      });
    });
    // TODO: if user has run out of credits, then send him appropriate email

    return Response.json({ data: generatedText });
  } catch (err) {
    return next(err);
  }
};
