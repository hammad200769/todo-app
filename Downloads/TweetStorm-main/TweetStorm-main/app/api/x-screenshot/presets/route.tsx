import { getActiveUserSubscription } from '@/api-utils/database/subscriptions';
import {
  jsonErrorResponse__New,
  validationErrorResponse,
} from '@/api-utils/utils';
import { validationSchemas } from '@/api-utils/validation-schemas';
import db from '@/DB/db';
import { auth, handleRequest } from '@/middlewares';
import { RouteHandler, RouteInitiator } from '@/types/server';
import { ERROR_TYPE } from '@/types/types';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export const GET: RouteInitiator = (...params) => {
  return handleRequest(params, handleGet, [auth]);
};
const handleGet: RouteHandler = async (request, next) => {
  try {
    const token = (await getToken({ req: request as NextRequest }))!;

    const subscription = await getActiveUserSubscription(token.id as number, [
      'id',
    ]);

    if (!subscription) {
      return jsonErrorResponse__New(
        400,
        'User does not have any active subscription',
        ERROR_TYPE.NoActiveSubscription
      );
    }

    const presets = await db('screenshot_presets')
      .where('user_id', token.id as number)
      .select('id', 'preset_name', 'options', 'created_at', 'updated_at');
    // Return a successful response if subscription exists
    return new Response(JSON.stringify({ presets }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return next(err) as Response;
  }
};

export const DELETE: RouteInitiator = (...params) => {
  return handleRequest(params, handleDelete, [auth]);
};
const handleDelete: RouteHandler = async (request, next) => {
  try {
    const { searchParams } = new URL(request.url);
    const presetId = searchParams.get('presetId');
    const token = (await getToken({ req: request as NextRequest }))!;

    const subscription = await getActiveUserSubscription(token.id as number, [
      'id',
    ]);

    if (!subscription) {
      return jsonErrorResponse__New(
        400,
        'User does not have any active subscription',
        ERROR_TYPE.NoActiveSubscription
      );
    }

    await db('screenshot_presets')
      .where('user_id', token.id as number)
      .andWhere('id', presetId)
      .del();
    // Return a successful response if subscription exists
    return new Response(
      JSON.stringify({ message: 'Preset deleted successfully' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    return next(err) as Response;
  }
};

export const POST: RouteInitiator = (...params) => {
  return handleRequest(params, handlePost, [auth]);
};

const handlePost: RouteHandler = async (request, next) => {
  try {
    const body = await request.json();
    const { error } = validationSchemas.screenShotPreset.validate(body);
    if (error) {
      return validationErrorResponse(error);
    }

    const token = (await getToken({ req: request as NextRequest }))!;

    const subscription = await getActiveUserSubscription(token.id as number, [
      'plan_id',
    ]);
    if (!subscription) {
      return jsonErrorResponse__New(
        400,
        'User does not have any active subscription',
        ERROR_TYPE.NoActiveSubscription
      );
    }

    const presetCountResult = await db('screenshot_presets')
      .where('user_id', token.id as number)
      .count('* as count');

    const presetCount = presetCountResult[0]?.count || 0;

    if ((presetCount as number) >= 5 && subscription.plan_id !== 2) {
      return jsonErrorResponse__New(
        400,
        'You can only have 5 presets in free plan. Please upgrade to premium plan to create more presets.',
        ERROR_TYPE.PresetLimitExceeded
      );
    }

    const { options } = body;
    const stringifyOptions = JSON.stringify(options);

    await db('screenshot_presets').insert({
      user_id: token.id as number,
      options: stringifyOptions,
      preset_name: body.presetName || `Preset ${(presetCount as number) + 1}`,
    });

    return new Response(
      JSON.stringify({ message: 'Preset added successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return next(err);
  }
};
