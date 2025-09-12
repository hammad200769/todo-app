import db from '@/DB/db';

export async function createUserCreditsUsage(userId: number) {
  await db('credits_usage').insert({
    user_id: userId,
    credits_used: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return { credits_used: 0 };
}

export async function resetCreditsUsage(userId: number) {
  return await db('credits_usage')
    .where({
      user_id: userId,
    })
    .update({
      credits_used: 0,
      updatedAt: new Date(),
    });
}

export async function incrementCreditsUsage(
  userId: number,
  creditsToIncrement: number
) {
  return await db('credits_usage')
    .where({ user_id: userId })
    .update({
      credits_used: db.raw('credits_used + ?', [creditsToIncrement]),
      updatedAt: new Date(),
    });
}
