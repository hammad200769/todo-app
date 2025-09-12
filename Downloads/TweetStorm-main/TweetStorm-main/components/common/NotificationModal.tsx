type ModalProps = {
  message: string;
  onClose: () => void;
};
export default function NotificationModal({ message, onClose }: ModalProps) {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white mt-3 px-10 py-3 rounded-lg shadow-lg relative'>
        <div className='text-center'>
          <p className='mb-4'>{message}</p>
          <button
            onClick={onClose}
            className='bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-sm mt-4'
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
