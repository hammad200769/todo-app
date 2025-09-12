import { MAIL_FROM_ADDRESS, MAIL_FROM_NAME } from '@/api-utils/constants';
import { customerMessageTemplate } from '@/api-utils/email-templates/customer-message';
import { getMailTransport, validationErrorResponse } from '@/api-utils/utils';
import { validationSchemas } from '@/api-utils/validation-schemas';
import { auth, handleRequest } from '@/middlewares';
import { RouteHandler, RouteInitiator } from '@/types/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export const POST: RouteInitiator = (...params) => {
  return handleRequest(params, handlePost, [auth]);
};

const handlePost: RouteHandler = async (request, next) => {
  try {
    const token = (await getToken({ req: request as NextRequest }))!;
    const body = await request.json();
    const devEmail = process.env.DEVELOPER_EMAIL;
    const { error } = validationSchemas.customerMessage.validate(body);
    if (error) {
      return validationErrorResponse(error);
    }
    if (token.email) {
      await getMailTransport().sendMail({
        from: `"${MAIL_FROM_NAME}" ${MAIL_FROM_ADDRESS}`,
        to: devEmail,
        subject: `Contact Form Submission - ${token.email}`,
        html: customerMessageTemplate(token.email, body.subject, body.message),
      });
      return new Response(null, { status: 200 });
    } else {
      return new Response(null, { status: 401 });
    }
  } catch (err) {
    return next(err);
  }
};
