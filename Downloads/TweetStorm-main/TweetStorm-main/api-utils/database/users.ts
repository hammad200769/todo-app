import db from '@/DB/db';
import { SUBSCRIPTION_NAME } from '@/types/types';
import { SUBSCRIPTION_CREDITS } from '@/utils/constants';
import { MAIL_FROM_ADDRESS, MAIL_FROM_NAME } from '../constants';
import { resetPasswordEmailTemplate } from '../email-templates/reset-password';
import { verifyDeleteAccountTemplate } from '../email-templates/verify-delete-account';
import { verifyEmailTemplate } from '../email-templates/verify-email';
import {
  getDomain,
  getMailTransport,
  getProtocol,
  getSubscriptionName,
} from '../utils';
import { getActiveUserSubscription } from './subscriptions';

export async function getRemainingUserCredits(userId: number): Promise<number> {
  const user = await db('users')
    .where({ id: userId })
    .select('extra_credits')
    .first();

  // TODO: throw error instead
  if (!user) return 0;

  const creditsUsage = await db('credits_usage')
    .where({
      user_id: userId,
    })
    .select('credits_used')
    .first();
  const subscription = await getActiveUserSubscription(userId);

  if (subscription) {
    return (
      (getSubscriptionName(subscription.stripe_price!) ===
      SUBSCRIPTION_NAME.Agency
        ? SUBSCRIPTION_CREDITS.agency
        : SUBSCRIPTION_CREDITS.pro) +
      (user.extra_credits ?? 0) -
      creditsUsage.credits_used
    );
  } else {
    return (
      SUBSCRIPTION_CREDITS.free +
      (user.extra_credits ?? 0) -
      creditsUsage.credits_used
    );
  }
}

export async function sendEmailVerificationEmail({
  emailTo,
  token,
}: {
  emailTo: string;
  token: string;
}) {
  const protocol = getProtocol();
  const domain = getDomain();

  return await getMailTransport().sendMail({
    from: `"${MAIL_FROM_NAME}" ${MAIL_FROM_ADDRESS}`,
    to: emailTo,
    subject: 'Verify Email',
    html: verifyEmailTemplate({
      emailVerificationLink: `${protocol}://${domain}/email/verify/confirm/${token}`,
      homeAddressLink: `${protocol}://${domain}`,
    }),
  });
}

export async function sendDeleteVerificationEmail({
  emailTo,
  verificationCode,
}: {
  emailTo: string;
  verificationCode: number;
}) {
  const protocol = getProtocol();
  const domain = getDomain();

  return await getMailTransport().sendMail({
    from: `"${MAIL_FROM_NAME}" ${MAIL_FROM_ADDRESS}`,
    to: emailTo,
    subject: 'Verify Account Deletion',
    html: verifyDeleteAccountTemplate({
      verificationCode: verificationCode,
      homeAddressLink: `${protocol}://${domain}`,
    }),
  });
}

export async function sendPasswordResetEmail({
  emailTo,
  token,
}: {
  emailTo: string;
  token: string;
}) {
  const protocol = getProtocol();
  const domain = getDomain();

  return await getMailTransport().sendMail({
    from: `"${MAIL_FROM_NAME}" ${MAIL_FROM_ADDRESS}`,
    to: emailTo,
    subject: 'Reset Password Notification',
    html: resetPasswordEmailTemplate({
      passwordResetLink: `${protocol}://${domain}/reset-password/${token}?email=${emailTo}`,
      homeAddressLink: `${protocol}://${domain}`,
    }),
  });
}
