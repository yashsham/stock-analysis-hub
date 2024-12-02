import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../stores/authStore';
import { addStock } from '../../lib/db/stockService';
import { LoadingSpinner } from '../common/LoadingSpinner';

interface AddStockFormData {
  symbol: string;
  purchasePrice: number;
  quantity: number;
  purchaseDate: string;
  notes?: string;
}

export const AddStockForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const { user } = useAuthStore();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<AddStockFormData>();

  const onSubmit = async (data: AddStockFormData) => {
    if (!user) return;

    try {
      await addStock({
        ...data,
        purchasePrice: Number(data.purchasePrice),
        quantity: Number(data.quantity),
        purchaseDate: new Date(data.purchaseDate),
        userId: user.uid,
      });
      reset();
      onSuccess();
    } catch (error) {
      console.error('Error adding stock:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="symbol" className="block text-sm font-medium text-gray-700 dark:text-github-text-secondary">
          Stock Symbol
        </label>
        <input
          {...register('symbol', { required: 'Stock symbol is required' })}
          type="text"
          className="input mt-1"
          placeholder="e.g., AAPL"
        />
        {errors.symbol && (
          <p className="mt-1 text-sm text-github-accent-red">{errors.symbol.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700 dark:text-github-text-secondary">
            Purchase Price
          </label>
          <input
            {...register('purchasePrice', {
              required: 'Purchase price is required',
              min: { value: 0, message: 'Price must be positive' }
            })}
            type="number"
            step="0.01"
            className="input mt-1"
          />
          {errors.purchasePrice && (
            <p className="mt-1 text-sm text-github-accent-red">{errors.purchasePrice.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-github-text-secondary">
            Quantity
          </label>
          <input
            {...register('quantity', {
              required: 'Quantity is required',
              min: { value: 1, message: 'Quantity must be at least 1' }
            })}
            type="number"
            className="input mt-1"
          />
          {errors.quantity && (
            <p className="mt-1 text-sm text-github-accent-red">{errors.quantity.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700 dark:text-github-text-secondary">
          Purchase Date
        </label>
        <input
          {...register('purchaseDate', { required: 'Purchase date is required' })}
          type="date"
          className="input mt-1"
        />
        {errors.purchaseDate && (
          <p className="mt-1 text-sm text-github-accent-red">{errors.purchaseDate.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-github-text-secondary">
          Notes
        </label>
        <textarea
          {...register('notes')}
          rows={3}
          className="input mt-1"
          placeholder="Optional notes about this purchase"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary flex items-center space-x-2"
        >
          {isSubmitting && <LoadingSpinner />}
          <span>Add Stock</span>
        </button>
      </div>
    </form>
  );
};