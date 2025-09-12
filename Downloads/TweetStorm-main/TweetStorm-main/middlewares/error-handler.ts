import {
  APP_ENV,
  DOMAIN,
  MAIL_FROM_ADDRESS,
  MAIL_FROM_NAME,
} from '@/api-utils/constants';
import {
  getMailTransport,
  logError,
  serverErrorResponse,
} from '@/api-utils/utils';
import { jsonStringify } from '@/utils/utils';
import { NextRequest } from 'next/server';

export const errorHandler = (req: NextRequest, errorData: any) => {
  const err = errorData.err ? errorData.err : errorData;

  const pathName = req.nextUrl.pathname;
  const fullUrl = req.nextUrl.pathname + req.nextUrl.search;

  let metadata: Record<any, any> = {
    endpoint: fullUrl,
  };

  if (errorData.metadata) {
    metadata = {
      ...metadata,
      ...errorData.metadata,
    };
  }

  if (req.session) {
    metadata.sessionId = req.session.id;
    metadata.sessionEmail = req.session.email;
  }

  sendEmailForServerError({
    err,
    subject: `Error in ${pathName}`,
    key: pathName,
    metadata,
  });

  console.error('**************** SERVER ERROR  ****************');
  console.error('Endpoint: ', fullUrl);
  console.error('Error:\n', err);
  console.error('\n\n');

  return serverErrorResponse();
};

export function handleServerError({
  err,
  key,
  subject,
  metadata = {},
}: {
  err: any;
  key: string;
  subject?: string;
  metadata?: Record<any, any>;
}) {
  console.error('**************** SERVER ERROR ****************');
  console.error('Key: ', key);
  console.error('Timestamp: ', new Date().toISOString());
  console.error('Error:\n', err);
  console.error('\n\n');

  return sendEmailForServerError({
    err,
    subject: subject ?? `Error with key: ${key}`,
    key,
    metadata,
  });
}

const lastEmailSentTime: Record<string, number> = {};

function sendEmailForServerError({
  err,
  key,
  subject,
  metadata = {},
}: {
  err: any;
  key: string;
  subject?: string;
  metadata?: Record<any, any>;
}): Promise<any> {
  if (APP_ENV !== 'production') {
    return Promise.resolve();
  }

  const now = Date.now();
  // Check if same email was sent within the last 1 hour
  const lastSent = lastEmailSentTime[key] || 0;
  const oneHour = 60 * 60 * 1000;

  metadata.environment = DOMAIN === 'tweetstorm.ai' ? 'production' : 'staging';

  if (now - lastSent >= oneHour) {
    lastEmailSentTime[key] = now;

    let emailContent = `
      <h2>Error Report</h2>
      <p><strong>Error Message:</strong> ${err.message}</p>
      <pre><strong>Stack Trace:</strong> ${err.stack}</pre>\n`;

    emailContent += generateServerErrorEmailContent(metadata);
    const devEmail = process.env.DEVELOPER_EMAIL;
    return getMailTransport()
      .sendMail({
        from: {
          name: MAIL_FROM_NAME,
          address: MAIL_FROM_ADDRESS,
        },
        to: devEmail,
        subject: subject ?? `Error with key: ${key}`,
        html: emailContent,
      })
      .catch(err => {
        logError('Error in sending email for server error report:\n' + err);
      });
  }

  return Promise.resolve();
}

function generateServerErrorEmailContent(data: Record<any, any>): string {
  let content = '';
  Object.keys(data).forEach(key => {
    const value =
      typeof data[key] === 'object' ? jsonStringify(data[key]) : data[key];
    content += `<p><strong>${key}: </strong>${value}</p>\n`;
  });
  return content;
}
