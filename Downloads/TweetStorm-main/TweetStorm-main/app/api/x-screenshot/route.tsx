import {
  createNewTwitterSession,
  extractScreenShotData,
  getValidTwitterSession,
  makeTwitterApiRequest,
} from '@/api-utils/utils';
import db from '@/DB/db';
import { handleRequest, handleServerError } from '@/middlewares';
import { RouteHandler, RouteInitiator } from '@/types/server';
import { updateTweetIdInQueryParams } from '@/utils/utils';

export const dynamic = 'force-dynamic';

export const GET: RouteInitiator = (...params) => {
  return handleRequest(params, handleGET);
};

const handleGET: RouteHandler = async (request, next) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const url = searchParams.get('url');

    if (!url) {
      return new Response(JSON.stringify({ error: 'URL is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const tweetId = url.split('/status/')[1];
    if (!tweetId) {
      return new Response(
        JSON.stringify({ error: 'Invalid Twitter URL format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    let session = await getValidTwitterSession();
    // If no valid session, create a new one
    if (!session) {
      session = await createNewTwitterSession(url);
    }

    // Update the query parameters with the new tweet ID
    const updatedQueryParams = updateTweetIdInQueryParams(
      session.query_params as string,
      tweetId
    );
    const apiUrl = `${session.url}?${updatedQueryParams}`;
    let data;

    try {
      data = await makeTwitterApiRequest(apiUrl, session.headers);
    } catch (error: any) {
      if (
        (error instanceof Error && error.message.includes('401')) ||
        error.message.includes('400') ||
        error.message.includes('403')
      ) {
        // Mark current session as invalid
        if (session.id) {
          db('twitter_sessions')
            .where('id', session.id)
            .update({ is_valid: false })
            .catch(err => {
              handleServerError({
                err,
                key: 'invalidate-twitter-session',
              });
            });
        }

        // Create new session and retry
        session = await createNewTwitterSession(url);
        data = await makeTwitterApiRequest(apiUrl, session.headers);
      } else {
        throw error;
      }
    }
    // Extract tweet data
    const tweetData = extractScreenShotData(data);
    if (!tweetData) {
      return new Response(
        JSON.stringify({
          message: 'Tweet not found in API response',
          tweetId: tweetId,
        }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }
    return new Response(
      JSON.stringify({
        tweetData,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return next(error);
  }
};
