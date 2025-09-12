import { incrementCreditsUsage } from '@/api-utils/database/credits-usage';
import { getRemainingUserCredits } from '@/api-utils/database/users';
import {
  formatKeywordsArray,
  getMaxTokens,
  getSystemPromptForTweetGeneration,
  getTweetPrompt,
  jsonErrorResponse,
  notEnoughCreditsResponse,
  openaiClient,
  validationErrorResponse,
} from '@/api-utils/utils';
import { validationSchemas } from '@/api-utils/validation-schemas';
import db from '@/DB/db';
import { handleRequest, handleServerError } from '@/middlewares';
import { RouteHandler, RouteInitiator } from '@/types/server';
import { GPT_MODEL, STANDARD_TWEET_LENGTH } from '@/types/types';
import { USER_GENERATION_TYPE_TO_NUMBER_MAP } from '@/utils/constants';
import { getTweetCost } from '@/utils/utils';

export const POST: RouteInitiator = (...params) => {
  return handleRequest(params, handlePost);
};

const handlePost: RouteHandler = async (request, next) => {
  try {
    const data = await request.json();
    const { error } = validationSchemas.tweetGenerationExtension.validate(data);
    if (error) {
      return validationErrorResponse(error);
    }
    const apiKey = await db('extension_api_keys')
      .where({ key: data.apiKey })
      .select('user_id')
      .first();
    if (!apiKey) {
      return jsonErrorResponse(
        'API-Key-Not-Found',
        'The API Key not found',
        404
      );
    }

    const remainingCredits = await getRemainingUserCredits(apiKey.user_id);
    if (remainingCredits - getTweetCost(data.tweetLength) < 0) {
      return notEnoughCreditsResponse(
        'You do not have enough credits to perform this operation.'
      );
    }

    const array = data.keywords ? data.keywords.split(',') : [];

    const keywordsArray = formatKeywordsArray(array);
    const tweetPrompt = getTweetPrompt({
      textPrompt: data.promptedText,
      includeEmojis: data.includeEmojis,
      includeHashtags: data.includeHashtags,
      tweetSentiment: data.tweetSentiment,
      keywords: keywordsArray,
    });
    let includeKeyWordsForPrompt = false;
    if (keywordsArray.length > 0) {
      includeKeyWordsForPrompt = true;
    }
    const gptModel = GPT_MODEL.GPT_4;

    const systemPrompt = getSystemPromptForTweetGeneration(
      data.tweetLength,
      data.tweetSentiment !== 'No-Tone',
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
      prompted_text: data.promptedText,
      text: generatedText,
      user_id: apiKey.user_id,
      type: USER_GENERATION_TYPE_TO_NUMBER_MAP.Tweet,
      created_at: new Date(),
      prompt_options: JSON.stringify({
        includeEmojis: data.includeEmojis ?? false,
        includeHashtags: data.includeHashtags ?? false,
        tone: data.tweetSentiment ?? 'No-Tone',
        keywords: keywordsArray ?? [],
      }),
      updated_at: new Date(),
      cost: getTweetCost(data.tweetLength),
    });
    const url = new URL(request.url).pathname;

    incrementCreditsUsage(apiKey.user_id, getTweetCost(data.tweetLength)).catch(
      err => {
        handleServerError({
          err,
          key: url,
          subject: 'Error in incrementing credits usage',
        });
      } // TODO: if user has run out of credits, then send him appropriate email
    );
    return Response.json({ data: chatCompletion.choices[0].message.content });
  } catch (err) {
    return next(err);
  }
};
