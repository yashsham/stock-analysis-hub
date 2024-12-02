import React from 'react';
import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface StockCardProps {
  symbol: string;
  companyName: string;
  price: number;
  change: number;
  isStarred?: boolean;
  onStarClick?: () => void;
}

export const StockCard: React.FC<StockCardProps> = ({
  symbol,
  companyName,
  price,
  change,
  isStarred = false,
  onStarClick
}) => {
  const changePercent = (change / price) * 100;
  const isPositive = change >= 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{symbol}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{companyName}</p>
        </div>
        <button
          onClick={onStarClick}
          className="text-gray-400 hover:text-yellow-400 transition-colors"
        >
          {isStarred ? (
            <StarIconSolid className="h-5 w-5 text-yellow-400" />
          ) : (
            <StarIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          ${price.toFixed(2)}
        </p>
        <p className={`text-sm font-medium ${
          isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
        }`}>
          {isPositive ? '+' : ''}{change.toFixed(2)} ({changePercent.toFixed(2)}%)
        </p>
      </div>
    </div>
  );
}