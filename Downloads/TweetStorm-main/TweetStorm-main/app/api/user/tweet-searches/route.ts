import { getActiveUserSubscription } from '@/api-utils/database/subscriptions';
import { validationErrorResponse__New } from '@/api-utils/utils';
import { validationSchemas } from '@/api-utils/validation-schemas';
import db from '@/DB/db';
import { auth, handleRequest } from '@/middlewares';
import { RouteHandler, RouteInitiator } from '@/types/server';
import { jsonStringify, validateSchema } from '@/utils/utils';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export const GET: RouteInitiator = (...params) => {
  return handleRequest(params, handleGet, [auth]);
};

const handleGet: RouteHandler = async (request, next) => {
  try {
    const token = (await getToken({ req: request }))!;
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page') ?? '1';
    const count = searchParams.get('count') ?? '10';
    let limit: number = 5;

    const subscription = await getActiveUserSubscription(token.id as number);
    if (subscription) {
      limit = Number.parseInt(count);
    }

    const searches = await db('tweet_searches')
      .where({
        user_id: token.id,
      })
      .select([
        'id',
        'name',
        'created_at',
        'all_these_words',
        'any_these_words',
        'hashtags',
        'location',
        'language',
        'start_date',
        'end_date',
        'min_replies',
        'min_likes',
        'min_reposts',
        'distance',
        'exact_match_phrase',
        'excluded_words',
        'mention_accounts',
        'to_accounts ',
        'from_accounts',
        'replies_filter',
        'links_filter',
        'from_followed_people',
        'from_nearby',
      ])
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset((parseInt(page) - 1) * limit);

    return new Response(jsonStringify({ searches }));
  } catch (err) {
    return next(err);
  }
};

export const POST: RouteInitiator = (...params) => {
  return handleRequest(params, handlePost, [auth]);
};

const handlePost: RouteHandler = async (request, next) => {
  try {
    const data = await request.json();
    // TODO: use this function everywhere
    const { error } = validateSchema(validationSchemas.tweetSearch, data);
    if (error) {
      return validationErrorResponse__New(error);
    }
    const token = (await getToken({ req: request as NextRequest }))!;
    const currentDate = new Date();
    const [newTweetSearchId] = await db('tweet_searches')
      .insert({
        ...data.data,
        name: data.name,
        user_id: token.id,
        created_at: currentDate,
        updated_at: currentDate,
        ...(data.data.start_date && {
          start_date: new Date(data.data.start_date),
        }),
        ...(data.data.end_date && { end_date: new Date(data.data.end_date) }),
      })
      .select('id');
    return Response.json(
      { tweetSearchId: newTweetSearchId.toString() },
      { status: 201 }
    );
  } catch (err) {
    return next(err);
  }
};
