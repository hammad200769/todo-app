import db from '@/DB/db';

export function getPlanByPriceId(
  priceId: string,
  columnsToSelect: Array<string>
): Promise<any> {
  const select: Record<string, true> = {};
  columnsToSelect.forEach(column => (select[column] = true));

  return db('plans')
    .where({ stripe_price_id: priceId })
    .select(Object.keys(select))
    .first();
}
