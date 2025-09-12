import { Middleware } from '@/types/server';
import { getToken } from 'next-auth/jwt';

export const auth: Middleware = async request => {
  const session: any = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    return {
      pass: false,
      response: Response.json(
        { error: { message: 'Unauthenticated' } },
        { status: 401 }
      ),
    };
  }

  request.session = { id: session.id, email: session.email };

  return {
    pass: true,
  };
};
