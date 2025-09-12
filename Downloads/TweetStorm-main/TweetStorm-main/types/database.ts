export type Subscription = {
  id: bigint | number;
  user_id: bigint | number;
  plan_id: number;
  stripe_id: string;
  stripe_status: string;
  stripe_price: string | null;
  ends_at: string | Date | null;
  created_at: string | Date | null;
  updated_at: string | Date | null;
  current_period_start: string | Date;
  current_period_end: string | Date;
};
