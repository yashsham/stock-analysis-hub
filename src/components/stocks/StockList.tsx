import React from 'react';
import { StockEntry } from '../../lib/db/stockService';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

interface StockListProps {
  stocks: StockEntry[];
}

export const StockList: React.FC<StockListProps> = ({ stocks }) => {
  if (stocks.length === 0) {
    return (
      <div className="bg-white dark:bg-github-secondary rounded-lg shadow-sm p-6">
        <p className="text-center text-gray-500 dark:text-github-text-secondary">
          No stocks in your portfolio
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-github-secondary rounded-lg shadow-sm overflow-hidden">
      <div className="divide-y divide-gray-200 dark:divide-github-border">
        {stocks.map((stock) => (
          <div
            key={stock.id}
            className="p-4 hover:bg-gray-50 dark:hover:bg-github-dark transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-github-text-primary">
                  {stock.symbol}
                </h3>
                <p className="text-sm text-gray-500 dark:text-github-text-secondary">
                  {stock.quantity} shares @ ${stock.purchasePrice}
                </p>
                <p className="text-sm text-gray-500 dark:text-github-text-secondary">
                  {new Date(stock.purchaseDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="p-1 text-gray-400 hover:text-github-accent-blue transition-colors"
                  title="Edit stock"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  className="p-1 text-gray-400 hover:text-github-accent-red transition-colors"
                  title="Delete stock"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            {stock.notes && (
              <p className="mt-2 text-sm text-gray-600 dark:text-github-text-secondary">
                {stock.notes}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};