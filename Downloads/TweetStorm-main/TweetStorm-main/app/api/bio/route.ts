import { incrementCreditsUsage } from '@/api-utils/database/credits-usage';
import { getRemainingUserCredits } from '@/api-utils/database/users';
import {
  formatKeywordsArray,
  getBioPrompt,
  getSystemPromptForBioGeneration,
  notEnoughCreditsResponse,
  openaiClient,
  validationErrorResponse,
} from '@/api-utils/utils';
import { validationSchemas } from '@/api-utils/validation-schemas';
import db from '@/DB/db';
import { auth, handleRequest, handleServerError } from '@/middlewares';
import { RouteHandler, RouteInitiator } from '@/types/server';
import { GPT_MODEL } from '@/types/types';
import { USER_GENERATION_TYPE_TO_NUMBER_MAP } from '@/utils/constants';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export const POST: RouteInitiator = (...params) => {
  return handleRequest(params, handlePost, [auth]);
};

const handlePost: RouteHandler = async (request, next) => {
  try {
    const data = await request.json();
    const { error } = validationSchemas.bioGenerator.validate(data);
    const userInput = data.userInput;
    if (error) {
      return validationErrorResponse(error);
    }

    const token = (await getToken({ req: request as NextRequest }))!;
    const remainingCredits = await getRemainingUserCredits(token.id as number);
    if (remainingCredits <= 0) {
      return notEnoughCreditsResponse(
        'You do not have enough credits to perform this operation.'
      );
    }
    const userPrompt = getBioPrompt({
      textPrompt: userInput.promptedText,
      includeEmojis: userInput.includeEmojis,
      keywords: userInput.keywords,
      tweetSentiment: userInput.tone,
      bioType: userInput.type,
    });
    const keywordsArray =
      userInput.keywords.length > 0
        ? formatKeywordsArray(userInput.keywords)
        : [];

    let includeKeyWordsForPrompt = false;
    if (keywordsArray.length > 0) {
      includeKeyWordsForPrompt = true;
    }

    const chatCompletion = await openaiClient.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: getSystemPromptForBioGeneration(
            userInput.tone !== 'No-Tone',
            includeKeyWordsForPrompt
          ),
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      model: GPT_MODEL.GPT_4,
      max_completion_tokens: 300,
    });

    const generatedText = chatCompletion.choices[0].message.content;

    if (!generatedText) {
      return Response.json(
        'An empty response was returned. Can you try changing your prompt?',
        {
          status: 400,
        }
      );
    }
    const url = new URL(request.url).pathname;

    await db('user_generations').insert({
      prompted_text: userInput.promptedText,
      text: generatedText,
      user_id: token.id,
      type: USER_GENERATION_TYPE_TO_NUMBER_MAP.Bio,
      prompt_options: JSON.stringify({
        tone: userInput.tone,
        keywords: keywordsArray,
        includeEmojis: userInput.includeEmojis,
      }),
      created_at: new Date(),
      updated_at: new Date(),
    });
    incrementCreditsUsage(token.id as number, 1).catch(err => {
      handleServerError({
        err,
        key: url,
        subject: 'Error in incrementing credits usage',
      });
    });
    return Response.json({ data: generatedText });
  } catch (err) {
    return next(err);
  }
};
