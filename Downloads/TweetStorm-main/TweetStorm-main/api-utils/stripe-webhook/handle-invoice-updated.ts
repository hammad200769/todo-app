import db from '@/DB/db';
import Stripe from 'stripe';
import { formatInvoiceAmount } from '../utils';

export async function handleInvoiceUpdated(event: Stripe.InvoiceUpdatedEvent) {
  const invoice = event.data.object;
  const finalizedAt = invoice.status_transitions.finalized_at
    ? new Date(invoice.status_transitions.finalized_at * 1000)
    : null;
  await db('receipts')
    .update({
      amount: formatInvoiceAmount(invoice.total),
      tax: `$${invoice.tax ?? '0.00'}`,
      status: invoice.status,
      amount_due: formatInvoiceAmount(invoice.amount_due),
      amount_paid: formatInvoiceAmount(invoice.amount_paid),
      invoice_url: invoice.hosted_invoice_url,
      finalized_at: finalizedAt,
      updated_at: new Date(),
    })
    .where({ provider_id: invoice.id });
}
