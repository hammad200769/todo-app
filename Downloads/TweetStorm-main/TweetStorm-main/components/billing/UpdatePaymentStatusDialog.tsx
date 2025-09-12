import { URLS } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import DialogWrapper from '../common/DialogBackground';
import { CrossIcon } from '../icons';

type UpdatePaymentStatusDialogProps = {
  onClose: () => void;
  paymentUpdate?: string;
};

function UpdatePaymentStatusDialog({
  onClose,
  paymentUpdate,
}: UpdatePaymentStatusDialogProps) {
  const router = useRouter();

  function handleClose() {
    router.push(URLS.billing);
    onClose();
  }

  return (
    <DialogWrapper>
      <div className='bg-white dark:bg-dark-mode-gray dark:text-white rounded-lg px-6 py-4 grow mx-auto max-w-2xl m-auto'>
        <div className='w-full flex justify-end mb-1'>
          <button onClick={handleClose} className='cursor-pointer'>
            <CrossIcon />
          </button>
        </div>
        {paymentUpdate &&
          (paymentUpdate === 'success' ? (
            <div className='text-green-700 text-center bg-green-100 p-4 rounded-lg mb-4'>
              Payment Details updated successfully
            </div>
          ) : (
            <div className='text-warning-700 text-center bg-warning-100 p-4 rounded-lg mb-4'>
              Payment Details update canceled
            </div>
          ))}
      </div>
    </DialogWrapper>
  );
}

export default UpdatePaymentStatusDialog;
