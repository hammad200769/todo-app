import { serverErrorResponse } from '@/api-utils/utils';
import db from '@/DB/db';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function GET(request: Request) {
  try {
    const token = (await getToken({ req: request as NextRequest }))!;

    const count = await db('tweet_searches')
      .where({
        user_id: token.id,
      })
      .count('id as totalCount');
    return new Response(JSON.stringify({ count: count[0].totalCount }), {
      status: 200,
    });
  } catch {
    return serverErrorResponse(
      'There was a server error fetching the saved tweet searches. Contact the support team'
    );
  }
}
