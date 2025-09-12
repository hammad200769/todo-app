'use client';
import { useState } from 'react';
import { CrossIcon } from '../icons';

function SuccessfullSubscriptionMessage() {
  const [closeMessage, setCloseMessage] = useState<boolean>(false);

  return closeMessage ? null : (
    <div className='p-4 flex-cb bg-green-200 rounded-lg text-sm mb-3 text-gray-900 cursor-pointer'>
      <p> Your subscription has been started successfully.</p>
      <button onClick={() => setCloseMessage(true)}>
        <CrossIcon />
      </button>
    </div>
  );
}

export default SuccessfullSubscriptionMessage;
