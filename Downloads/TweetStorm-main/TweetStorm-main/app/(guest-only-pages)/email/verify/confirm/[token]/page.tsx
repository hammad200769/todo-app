import { mailerlite } from '@/api-utils/utils';
import EmailVerificationMessage from '@/components/email-verification/EmailVerificationMessage';
import db from '@/DB/db';
import { handleServerError } from '@/middlewares';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TweetStorm.ai - Email Verfication confirmation',
  description: 'We will confirm your email verification link.',
};

export default async function EmailConfirmationPage({
  params,
}: {
  params: { token: string };
}) {
  let token, user;
  try {
    const currentDate = new Date();
    const token = await db('email_verifications')
      .where({ token: params.token })
      .select('user_id', 'expires_at')
      .first();

    if (!token) {
      return (
        <EmailVerificationMessage
          message={'Email verification token does not exist.'}
        />
      );
    }

    const user = await db('users')
      .where({ id: token.user_id })
      .select('email', 'email_verified_at')
      .first();
    if (!user) {
      return (
        <EmailVerificationMessage
          message={'The user does not exist in our database.'}
        />
      );
    }

    // check if email is already verified
    if (user.email_verified_at !== null) {
      return (
        <EmailVerificationMessage
          message={'The provided email is already verified.'}
        />
      );
    }

    // If token exists but has expired
    if (currentDate >= token.expires_at) {
      return (
        <EmailVerificationMessage
          message={
            'Your email verification link has expired. Try generating a new one.'
          }
        />
      );
    }
    await Promise.all([
      // update the email verified field for the user

      db('users')
        .where({
          id: token.user_id,
        })
        .update({
          email_verified_at: new Date(),
        }),
      // TODO: don't wait for the following
      // delete all the tokens for this user as they are not needed

      db('email_verifications')
        .where({
          user_id: token.user_id,
        })
        .del(),
    ]);

    // TODO: don't wait for the following and extract it into a separate function
    try {
      // create mailer lite subscriber
      const response = await mailerlite.subscribers.createOrUpdate({
        email: user.email,
        status: 'active',
      });

      // add the subscriber to the group if not already added.
      if (
        !response.data.data.groups?.find(
          (group: any) => group?.id === process.env.MAILERLITE_GROUP_ID!
        )
      ) {
        const subscriberId = response.data.data.id;
        await mailerlite.groups.assignSubscriber(
          subscriberId,
          process.env.MAILERLITE_GROUP_ID!
        );
      }
    } catch (err) {
      handleServerError({
        err,
        key: 'email-confirmation-page',
        metadata: {
          token,
          user,
        },
      });
    }

    return (
      <EmailVerificationMessage message={'Email verification successfull!'} />
    );
  } catch (err) {
    handleServerError({
      err,
      key: 'email-confirmation-page',
      metadata: {
        token,
        user,
      },
    });
    return (
      <EmailVerificationMessage
        message={`There was a server error while verifying the email. Contact us at ${process.env.MAIL_FROM_ADDRESS}.`}
      />
    );
  }
}
