import { Session } from './server';

declare module 'next/server' {
  interface NextRequest {
    session?: Session;
  }
}
