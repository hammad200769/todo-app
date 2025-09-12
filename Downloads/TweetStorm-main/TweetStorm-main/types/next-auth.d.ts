import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    error?: 'sso-account-deleted';
    permanentDeletionAt?: Date;
  }
}
