import React from 'react';
import { StockEntry } from '../../lib/db/stockService';

interface PortfolioStatsProps {
  stocks: StockEntry[];
}

export const PortfolioStats: React.FC<PortfolioStatsProps> = ({ stocks }) => {
  const calculateTotalValue = () => {
    return stocks.reduce((total, stock) => {
      return total + (stock.purchasePrice * stock.quantity);
    }, 0);
  };

  const totalValue = calculateTotalValue();
  const totalStocks = stocks.length;
  const averagePrice = totalStocks > 0 ? totalValue / totalStocks : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="card p-4">
        <h3 className="text-sm font-medium text-gray-500 dark:text-github-text-secondary">
          Total Portfolio Value
        </h3>
        <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-github-text-primary">
          ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
      </div>

      <div className="card p-4">
        <h3 className="text-sm font-medium text-gray-500 dark:text-github-text-secondary">
          Total Stocks
        </h3>
        <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-github-text-primary">
          {totalStocks}
        </p>
      </div>

      <div className="card p-4">
        <h3 className="text-sm font-medium text-gray-500 dark:text-github-text-secondary">
          Average Stock Price
        </h3>
        <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-github-text-primary">
          ${averagePrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
      </div>
    </div>
  );
};