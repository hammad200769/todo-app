import {
  Middleware,
  MiddlewareResponse,
  RequestMetaData,
  RouteHandler,
} from '@/types/server';
import { NextRequest } from 'next/server';
import { errorHandler } from './error-handler';

export async function handleRequest(
  params: [request: NextRequest, requestMetadata: RequestMetaData],
  callback: RouteHandler,
  middlewares: Array<Middleware> = []
) {
  const [request, requestMetadata] = params;
  try {
    for (const middleware of middlewares) {
      const result: MiddlewareResponse = await middleware(
        request,
        requestMetadata
      );

      if (result.pass === false) {
        return result.response!;
      }
    }

    const next = (err: any) => errorHandler(request, err);

    return callback(request, next, requestMetadata);
  } catch (err: any) {
    return errorHandler(request, err);
  }
}
