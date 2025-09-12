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
    const { error } = validationSchemas.findApiKeyExtension.validate(data);
    if (error) {
      return validationErrorResponse(error);
    }

    const apiKey = await db('extension_api_keys')
      .where({ key: data.apiKey })
      .select('key')
      .first();
    if (!apiKey) {
      return jsonErrorResponse(
        'API-Key-Not-Valid',
        'The API key is not valid',
        404
      );
    }

    return Response.json({}, { status: 200 });
  } catch (err) {
    return next(err);
  }
};
