import { getRemainingUserCredits } from '@/api-utils/database/users';
import { jsonErrorResponse, validationErrorResponse } from '@/api-utils/utils';
import { validationSchemas } from '@/api-utils/validation-schemas';
import db from '@/DB/db';
import { handleRequest } from '@/middlewares';
import { RouteHandler, RouteInitiator } from '@/types/server';

export const POST: RouteInitiator = (...params) => {
  return handleRequest(params, handlePost);
};

const handlePost: RouteHandler = async (request, next) => {
  try {
    const data = await request.json();
    const { error } = validationSchemas.creditsExtension.validate(data);
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
        'The API key is not valid',
        404
      );
    }

    const remainingCredits = await getRemainingUserCredits(apiKey.user_id);

    return Response.json({ credits: { count: remainingCredits } });
  } catch (err) {
    return next(err);
  }
};
