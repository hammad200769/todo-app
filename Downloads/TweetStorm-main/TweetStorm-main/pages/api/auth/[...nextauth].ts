import { createBulkUsage } from '@/api-utils/database/bulk-actions-usage';
import { createUserCreditsUsage } from '@/api-utils/database/credits-usage';
import { sendEmailVerificationEmail } from '@/api-utils/database/users';
import { checkPassword, getAffiliateId } from '@/api-utils/utils';
import db from '@/DB/db';
import { ERROR_TYPE, User } from '@/types/types';
import { URLS } from '@/utils/constants';
import { formatDateOnly } from '@/utils/utils';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import TwitterProvider from 'next-auth/providers/twitter';
import { v4 as uuidv4 } from 'uuid';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile) {
        const { name, email } = profile;
        if (!email || email === '') {
          throw new Error('Email not found in Google profile');
        }
        const user = await db('users')
          .leftJoin('account_deletions', 'users.id', 'account_deletions.userId')
          .where('users.email', email)
          .select(
            'users.id',
            'users.email',
            'users.email_verified_at',
            'account_deletions.permanent_deletion_at'
          )
          .first();

        let userId: string = '';
        if (user) {
          const currentDate = new Date();
          userId = user.id.toString();

          // If the account is deleted and 90 days haven't passed
          if (
            user.permanent_deletion_at &&
            user.permanent_deletion_at > currentDate
          ) {
            return {
              error: 'sso-account-deleted',
              permanentDeletionAt: user.permanent_deletion_at,
              id: userId,
              email: user.email,
            };
          } else if (
            user.permanent_deletion_at &&
            // If the account is deleted and 90 days have passed
            user.permanent_deletion_at <= currentDate
          ) {
            // delete the existing user record with same email

            await db('users')
              .where({
                id: user.id,
              })
              .del();
            userId = await createNewUser({ name, email });
          } else {
            const updatedData: Partial<User> = {};
            if (!user.email_verified_at)
              updatedData.email_verified_at = new Date();
            if (updatedData.email_verified_at) {
              await db('users').where({ email }).update(updatedData);
            }
          }
        }
        // If this is the first time signing in using Google, create the account
        else {
          userId = await createNewUser({ name, email });
        }
        return {
          email,
          id: userId,
        };
      },
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      async profile(profile) {
        const { name, email } = profile;

        if (!email || email === '') {
          throw new Error('Email not found in Twitter profile');
        }
        const user = await db('users')
          .leftJoin('account_deletions', 'users.id', 'account_deletions.userId')
          .where('users.email', email)
          .select(
            'users.id',
            'users.email',
            'users.email_verified_at',
            'account_deletions.permanent_deletion_at'
          )
          .first();

        let userId: string = '';
        if (user) {
          const { account_deletions } = user;
          const currentDate = new Date();
          userId = user.id.toString();

          // If the account is deleted and 90 days haven't passed
          if (
            user.permanent_deletion_at &&
            user.permanent_deletion_at > currentDate
          ) {
            return {
              error: 'sso-account-deleted',
              permanentDeletionAt: account_deletions.permanentDeletionAt,
              id: userId,
              email: user.email,
            };
          } else if (
            user.permanent_deletion_at &&
            // If the account is deleted and 90 days have passed
            user.permanent_deletion_at <= currentDate
          ) {
            // delete the existing user record with same email

            await db('users').where({ id: user.id }).del();
            userId = await createNewUser({ name, email });
          } else {
            const updatedData: Partial<User> = {};
            if (!user.email_verified_at)
              updatedData.email_verified_at = new Date();
            if (updatedData.email_verified_at) {
              await db('users')
                .where({
                  email,
                })
                .update({
                  updatedData,
                });
            }
          }
        }
        // If this is the first time signing in using Twitter, create the account
        else {
          userId = await createNewUser({ name, email });
        }
        return {
          email,
          id: userId,
        };
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials as Record<string, string>;
        const user = await db('users')
          .leftJoin('account_deletions', 'users.id', 'account_deletions.userId')
          .where('users.email', email)
          .select(
            'users.id',
            'users.email',
            'users.password',
            'users.email_verified_at',
            'account_deletions.permanent_deletion_at'
          )
          .first();
        if (user === undefined) {
          throw new Error('No user with this email exists');
        }

        if (user.permanent_deletion_at) {
          throw new Error('No user with this email exists');
        }

        if (!user.password) {
          throw new Error(
            'Looks like you signed up using Google or Twitter. Please sign in using Google or Twitter.'
          );
        }

        const passwordMatched = await checkPassword(
          password,
          user.password as string
        );

        if (!passwordMatched) {
          throw new Error('Incorrect password');
        }

        // check if email is verified
        if (user.email_verified_at === null) {
          const currentDate = new Date();
          const token = uuidv4();
          const publicToken = uuidv4();
          const email_verification = await db('email_verifications')
            .where({
              user_id: user.id,
            })
            .select('public_token')
            .first();

          if (email_verification) {
            await db('email_verifications')
              .update({
                expires_at: new Date(
                  currentDate.getTime() + 2 * 60 * 60 * 1000
                ),
                updated_at: currentDate,
                token,
              })
              .where({
                user_id: user.id,
              });
            sendEmailVerificationEmail({
              emailTo: user.email,
              token: token,
            });

            throw new Error(
              `${ERROR_TYPE.EmailNotVerified}_${email_verification.public_token}`
            );
          }

          await db('email_verifications').insert({
            user_id: user.id,
            token,
            expires_at: new Date(currentDate.getTime() + 2 * 60 * 60 * 1000),
            created_at: currentDate,
            public_token: publicToken,
            updated_at: currentDate,
          });
          sendEmailVerificationEmail({
            emailTo: user.email,
            token,
          });

          throw new Error(`${ERROR_TYPE.EmailNotVerified}_${publicToken}`);
        }

        if (user) {
          return {
            id: user.id,
            email: user.email,
          };
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    // @ts-ignore
    jwt({ user, token, trigger }) {
      if (trigger === 'signIn') {
        return { ...token, id: user.id };
      }
      return token;
    },
    // @ts-ignore
    session({ token }) {
      return token;
    },
    signIn(payload) {
      if (payload.user.error === 'sso-account-deleted') {
        const errorMessage = `Your account was deleted. You cannot recreate it before ${formatDateOnly(
          payload.user.permanentDeletionAt!.toString()
        )}. To reactivate it now, please contact us at ${
          process.env.NEXT_PUBLIC_SUPPORT_EMAIL
        }.`;
        return `${URLS.login}?error=${errorMessage}`;
      }
      return true;
    },
  },
  pages: {
    signIn: URLS.login,
  },
};

async function createNewUser({
  email,
  name,
}: {
  email: string;
  name: string;
}): Promise<string> {
  const affiliateId = await getAffiliateId();
  const [userId] = await db('users').insert({
    email,
    name,
    email_verified_at: new Date(),
    affiliate_id: affiliateId,
    created_at: new Date(),
  });
  await Promise.all([createBulkUsage(userId), createUserCreditsUsage(userId)]);
  return userId.toString();
}

export default NextAuth(authOptions);
