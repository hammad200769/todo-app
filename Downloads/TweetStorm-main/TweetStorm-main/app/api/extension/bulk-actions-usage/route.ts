import { getActiveUserSubscription } from '@/api-utils/database/subscriptions';
import { jsonErrorResponse, validationErrorResponse } from '@/api-utils/utils';
import { validationSchemas } from '@/api-utils/validation-schemas';
import db from '@/DB/db';
import { handleRequest } from '@/middlewares';
import { RouteHandler, RouteInitiator } from '@/types/server';
import { BulkUsageResponseType } from '@/types/types';
import { FREE_PLAN_BULK_ACTIONS_USAGE } from '@/utils/constants';
import { camelCaseToKebabCase, jsonStringify } from '@/utils/utils';

export const GET: RouteInitiator = (...params) => {
  return handleRequest(params, handleGet);
};

const handleGet: RouteHandler = async (request, next) => {
  try {
    const apiToken = request.headers.get('Authorization');

    if (!apiToken) {
      return jsonErrorResponse(
        'API-Key-Not-Provided',
        'The API Key is not provided',
        404
      );
    }

    const apiKey = await db('extension_api_keys')
      .where({ key: apiToken })
      .select('user_id')
      .first();
    if (!apiKey) {
      return jsonErrorResponse(
        'API-Key-Not-Found',
        'The API Key is not found',
        404
      );
    }

    const bulkActionsUsage = await db('bulk_actions_usage')
      .where({ user_id: apiKey.user_id })
      .select(
        'tweet_deletions',
        'retweets',
        'tweet_likes',
        'tweet_unlikes',
        'follows',
        'unfollows',
        'last_reset_on'
      )
      .first();
    if (!bulkActionsUsage) {
      return jsonErrorResponse(
        'No-Usage-Data',
        'No usage data found for this user',
        404
      );
    }

    const subscription = await getActiveUserSubscription(apiKey.user_id, [
      'plan_id',
    ]);

    const resp: BulkUsageResponseType = {
      bulkUsage: {
        tweetDeletions: bulkActionsUsage.tweet_deletions,
        retweets: bulkActionsUsage.retweets,
        tweetLikes: bulkActionsUsage.tweet_likes,
        tweetUnlikes: bulkActionsUsage.tweet_unlikes,
        follows: bulkActionsUsage.follows,
        unfollows: bulkActionsUsage.unfollows,
      },
      // Free plan assigned credits
      bulkUsageAssigned: {
        ...FREE_PLAN_BULK_ACTIONS_USAGE,
      },
    };

    if (subscription?.plan_id) {
      const plan = await db('plans')
        .where({ id: subscription.plan_id })
        .select(
          'tweet_deletions',
          'retweets',
          'tweet_likes',
          'tweet_unlikes',
          'follows',
          'unfollows'
        )
        .first();

      if (plan) {
        resp.bulkUsageAssigned = {
          tweetDeletions: plan.tweet_deletions,
          retweets: plan.retweets,
          tweetLikes: plan.tweet_likes,
          tweetUnlikes: plan.tweet_unlikes,
          follows: plan.follows,
          unfollows: plan.unfollows,
        };
      }
    }

    return new Response(jsonStringify(resp));
  } catch (err) {
    return next(err);
  }
};

export const PUT: RouteInitiator = (...params) => {
  return handleRequest(params, handlePut);
};

const handlePut: RouteHandler = async (request, next) => {
  try {
    const apiToken = request.headers.get('Authorization');

    if (!apiToken) {
      return jsonErrorResponse(
        'API-Key-Not-Provided',
        'The API Key is not provided',
        404
      );
    }

    const data = await request.json();
    const { error } = validationSchemas.updateBulkActionsUsage.validate(data);
    if (error) {
      return validationErrorResponse(error);
    }

    const apiKey = await db('extension_api_keys')
      .where({ key: apiToken })
      .select('user_id')
      .first();

    if (!apiKey) {
      return jsonErrorResponse(
        'API-Key-Not-Found',
        'The API Key is not found',
        404
      );
    }

    const updatedData = Object.entries(data).reduce((acc, [key, value]) => {
      if (value != null) {
        acc[camelCaseToKebabCase(key)] = value as number;
      }
      return acc;
    }, {} as Record<string, number>);

    await db('bulk_actions_usage')
      .where({ user_id: apiKey.user_id })
      .update({
        updated_at: new Date(),
      })
      .increment(updatedData);
    return new Response(null, { status: 204 });
  } catch (err) {
    return next(err);
  }
};
