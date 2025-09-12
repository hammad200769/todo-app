import { getActiveUserSubscription } from '@/api-utils/database/subscriptions';
import db from '@/DB/db';
import { auth, handleRequest } from '@/middlewares';
import { RouteHandler, RouteInitiator } from '@/types/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export const GET: RouteInitiator = (...params) => {
  return handleRequest(params, handleGet, [auth]);
};

const handleGet: RouteHandler = async (request, next) => {
  try {
    const token = (await getToken({ req: request as NextRequest }))!;

    const subscription = await getActiveUserSubscription(token.id as number, [
      'stripe_id',
    ]);

    if (!subscription) {
      return Response.json({ invoices: null });
    }

    const searchParams = request.nextUrl.searchParams;
    const limitParam = searchParams.get('limit') ?? '5';

    const limit = Number.parseInt(limitParam) ? Number.parseInt(limitParam) : 5;

    const dbInvoices = await db('receipts')
      .where({ subscription_id: subscription.stripe_id })
      .limit(limit)
      .orderBy('created_at', 'desc');

    const invoices = dbInvoices.map(invoice => {
      return {
        id: invoice.id,
        createdAt: invoice.finalized_at,
        amount: invoice.amount,
        amountDue: invoice.amount_due,
        amountPaid: invoice.amount_paid,
        status: invoice.status === 'paid' ? 'paid' : 'unpaid',
        url: invoice.invoice_url,
      };
    });

    return Response.json({ invoices: invoices.length > 0 ? invoices : null });
  } catch (err) {
    return next(err);
  }
};
