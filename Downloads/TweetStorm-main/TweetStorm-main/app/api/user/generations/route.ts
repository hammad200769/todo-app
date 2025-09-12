import db from '@/DB/db';
import { getActiveUserSubscription } from '@/api-utils/database/subscriptions';
import { auth, handleRequest } from '@/middlewares';
import { RouteHandler, RouteInitiator } from '@/types/server';
import { jsonStringify } from '@/utils/utils';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export const GET: RouteInitiator = (...params) => {
  return handleRequest(params, handleGet, [auth]);
};

const handleGet: RouteHandler = async (request, next) => {
  try {
    const token = (await getToken({ req: request as NextRequest }))!;
    const searchParams = request.nextUrl.searchParams;

    var page = searchParams.get('page') ?? '1';
    var count = searchParams.get('count') ?? '10';
    var order = searchParams.get('order') ?? 'desc';
    var type = searchParams.get('type') ?? undefined;
    if (type === 'undefined') {
      type = undefined;
    }

    const subscription = await getActiveUserSubscription(token.id as number, [
      'stripe_id',
    ]);

    let limit: number = 5;

    if (subscription) {
      limit = Number.parseInt(count);
    }

    const query = db('user_generations')
      .where({ user_id: token.id })
      .select([
        'text',
        'id',
        'prompted_text as promptedText',
        db.raw("JSON_UNQUOTE(JSON_EXTRACT(prompt_options, '$.tone')) as tone"),
        db.raw(
          "JSON_UNQUOTE(JSON_EXTRACT(prompt_options, '$.keywords')) as keywords"
        ),
        'created_at as createdAt',
        'type',
      ]);

    if (type !== undefined && type !== '') {
      query.where({ type: parseInt(type) });
    }

    query.orderBy('created_at', order as 'asc' | 'desc');

    const rawGenerations = await query
      .limit(limit)
      .offset((parseInt(page) - 1) * limit);
    const generations = rawGenerations.map(row => ({
      ...row,
      keywords: row.keywords ? JSON.parse(row.keywords) : [],
    }));
    return new Response(jsonStringify({ generations }));
  } catch (err) {
    return next(err);
  }
};
