import db from '@/DB/db';

export async function getTotalPublicGenerations(
  ipAddress: string,
  type: number
): Promise<number> {
  const [{ count }] = await db('public_generations')
    .where({ ip_address: ipAddress, type })
    .count('* as count');
  return Number(count);
}
