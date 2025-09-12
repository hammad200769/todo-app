'use client';
import { useUser } from '@/hooks/swr';
import { useState } from 'react';
import DialogDisplayer from '../common/DialogDisplayer';
import DeleteAccountDialog from './DeleteAccountDialog';
import DeleteSSOAccountDialog from './DeleteSSOAccountDialog';

function DeleteAccountButton() {
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState<boolean>(false);
  const { data: userData } = useUser();
  const signedInWithEmail = userData?.user.signedInWithEmail;
  if (signedInWithEmail === undefined) return <div>Loading...</div>;
  return (
    <>
      <button
        onClick={() => setShowDeleteConfirmation(true)}
        type='button'
        className='cursor-pointer inline-flex items-center justify-center px-4 py-2 bg-danger rounded-md font-semibold text-xs text-white hover:bg-rose-700 disabled:opacity-25 transition tracking-widest'
      >
        DELETE ACCOUNT
      </button>
      {signedInWithEmail
        ? showDeleteConfirmation && (
            <DialogDisplayer
              showDialog={showDeleteConfirmation}
              dialogComponent={
                <DeleteAccountDialog
                  onClose={() => setShowDeleteConfirmation(false)}
                />
              }
            />
          )
        : showDeleteConfirmation && (
            <DialogDisplayer
              showDialog={showDeleteConfirmation}
              dialogComponent={
                <DeleteSSOAccountDialog
                  onClose={() => setShowDeleteConfirmation(false)}
                />
              }
            />
          )}
    </>
  );
}

export default DeleteAccountButton;
