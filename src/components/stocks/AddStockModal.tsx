import React from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { AddStockForm } from './AddStockForm';

interface AddStockModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddStockModal: React.FC<AddStockModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md rounded-lg bg-white dark:bg-github-secondary p-6 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-github-text-primary">
              Add New Stock
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-github-text-primary"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          
          <AddStockForm onSuccess={onClose} />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};