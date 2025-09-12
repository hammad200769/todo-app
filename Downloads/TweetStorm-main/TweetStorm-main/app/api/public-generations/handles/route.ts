import { getTotalPublicGenerations } from '@/api-utils/database/public-generations';
import {
  getSystemPromptForHandlesGeneration,
  jsonErrorResponse,
  openaiClient,
  validationErrorResponse,
} from '@/api-utils/utils';
import { validationSchemas } from '@/api-utils/validation-schemas';
import db from '@/DB/db';
import { handleRequest } from '@/middlewares';
import { RouteHandler, RouteInitiator } from '@/types/server';
import { GPT_MODEL } from '@/types/types';
import {
  MAX_PUBLIC_GENERATIONS_PER_TYPE,
  USER_GENERATION_TYPE_TO_NUMBER_MAP,
} from '@/utils/constants';

export const POST: RouteInitiator = (...params) => {
  return handleRequest(params, handlePost);
};

const handlePost: RouteHandler = async (request, next) => {
  try {
    const data = await request.json();

    const { error } = validationSchemas.publicGeneration.validate(data);
    if (error) {
      return validationErrorResponse(error);
    }

    const clientIp = request.headers.get('x-forwarded-for');
    if (!clientIp) {
      return jsonErrorResponse(
        'bad-request',
        'No client IP address found.',
        400
      );
    }

    const totalGenerations = await getTotalPublicGenerations(
      clientIp,
      USER_GENERATION_TYPE_TO_NUMBER_MAP.Handle
    );
    if (totalGenerations >= MAX_PUBLIC_GENERATIONS_PER_TYPE) {
      return jsonErrorResponse(
        'limit-reached',
        `You can only generate handles ${MAX_PUBLIC_GENERATIONS_PER_TYPE} times when logged out. Login to generate more.`,
        403
      );
    }

    const chatCompletion = await openaiClient.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: getSystemPromptForHandlesGeneration(),
        },
        {
          role: 'user',
          content: `input: ${data.promptedText}`,
        },
      ],
      model: GPT_MODEL['GPT_4.1_mini'],
      max_completion_tokens: 200,
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

    await db('public_generations').insert({
      type: USER_GENERATION_TYPE_TO_NUMBER_MAP.Handle,
      ip_address: clientIp,
      created_at: new Date(),
    });
    return Response.json({ data: generatedText });
  } catch (err) {
    return next(err);
  }
};
