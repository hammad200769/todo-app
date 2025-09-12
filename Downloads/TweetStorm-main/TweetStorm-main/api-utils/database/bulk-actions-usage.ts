import db from '@/DB/db';

export async function createBulkUsage(userId: number) {
  const currentDate = new Date();

  await db('bulk_actions_usage').insert({
    user_id: userId,
    created_at: currentDate,
    last_reset_on: currentDate,
    updated_at: currentDate,
    tweet_deletions: 0,
    retweets: 0,
    tweet_likes: 0,
    tweet_unlikes: 0,
    follows: 0,
    unfollows: 0,
  });

  return;
}

export function updateBulkRecordForUser(
  userId: number,
  updateData: {
    tweet_deletions?: number;
    tweet_unlikes?: number;
    tweet_likes?: number;
    retweets?: number;
    follows?: number;
    unfollows?: number;
    last_reset_on?: Date;
  }
) {
  return db('bulk_actions_usage')
    .where({
      user_id: userId,
    })
    .update({
      ...updateData,
      updated_at: new Date(),
    });
}
