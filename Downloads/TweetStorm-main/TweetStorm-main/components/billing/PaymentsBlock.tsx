'use client';

import { useNextPayment, usePaymentMethod, useSubscription } from '@/hooks/swr';
import { MONTHS } from '@/utils/constants';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import DialogDisplayer from '../common/DialogDisplayer';
import {
  AmericanExpressIcon,
  DefaultCardIcon,
  JcbIcon,
  MasterCardIcon,
  UnionPayIcon,
  VisaIcon,
} from '../icons';
import EditPayment from './EditPayment';
import UpdatePaymentStatusDialog from './UpdatePaymentStatusDialog';

const cards: { [key: string]: JSX.Element } = {
  visa: <VisaIcon />,
  mastercard: <MasterCardIcon />,
  unionpay: <UnionPayIcon />,
  jcb: <JcbIcon />,
  amex: <AmericanExpressIcon />,
  default: <DefaultCardIcon />,
};

function PaymentsBlock() {
  const { data: subscriptionData } = useSubscription();
  const subscription = subscriptionData?.subscription;
  const { data: nextPaymentData } = useNextPayment();
  const { data: paymentMethod } = usePaymentMethod();
  const nextPayment = nextPaymentData?.nextPayment;
  const pm = paymentMethod?.pm;
  const [showDialog, setShowDialog] = useState<boolean>(true);
  const isSubscriptionPendingCancelation: boolean =
    (subscription?.status === 'active' ||
      subscription?.status === 'past_due') &&
    subscription.endsAt !== null;
  const paymentUpdate = useSearchParams()?.get('paymentUpdate');
  return subscription ? (
    <div className='mt-12'>
      {paymentUpdate && (
        <DialogDisplayer
          showDialog={showDialog}
          dialogComponent={
            <UpdatePaymentStatusDialog
              onClose={() => setShowDialog(false)}
              paymentUpdate={paymentUpdate as string}
            />
          }
        />
      )}
      <h2 className='text-2xl'>Payments</h2>
      <div className='lg:flex-b text-sm bg-white dark:bg-primary-dark shadow-sm sm:rounded-lg p-6 mt-4'>
        {isSubscriptionPendingCancelation ? (
          <div>
            <p className='text-sm'>Next payment</p>
            <h2 className='text-xl font-medium mt-1.5'>
              No payment scheduled.
            </h2>
          </div>
        ) : (
          !!nextPayment && (
            <div>
              <p className='text-sm'>
                Next payment on {MONTHS[new Date(nextPayment.date).getMonth()]}{' '}
                {new Date(nextPayment.date).getDate()},{' '}
                {new Date(nextPayment.date)!.getFullYear()}
              </p>
              <h2 className='text-3xl font-medium my-3'>
                {nextPayment.amount}
              </h2>
              <div className='flex md:flex-row flex-col justify-start md:items-center mt-2 '>
                <span className='dark:bg-gray-300 p-1 rounded-md w-fit'>
                  {pm?.pm_type
                    ? cards[pm.pm_type]
                      ? cards[pm.pm_type]
                      : cards['default']
                    : null}
                </span>
                <span className='md:ml-2'>
                  Ending in <b>**** {pm?.pm_last_four}</b> expiring{' '}
                  {pm?.pm_expiration}
                </span>
              </div>
              {subscription.status === 'past_due' && (
                <div className='mt-2'>
                  <p className='dark:text-red-400 text-red-500'>
                    Payment is <b>Past Due</b> for the billing cycle that ended
                    on{' '}
                    {new Date(
                      subscription.currentPeriodStart
                    ).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                    .
                  </p>
                  <p className='dark:text-red-400 text-red-500'>
                    We&apos;ll retry charging your payment method. Update your
                    payment details to avoid subscription cancellation.
                  </p>
                </div>
              )}
            </div>
          )
        )}
        {(isSubscriptionPendingCancelation || !!nextPayment) && <EditPayment />}
      </div>
    </div>
  ) : null;
}

export default PaymentsBlock;
