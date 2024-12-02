import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useStockStore } from '../../stores/stockStore';
import { getUserStocks } from '../../lib/db/stockService';
import { StockList } from './StockList';
import { StockChart } from './StockChart';
import { AddStockModal } from './AddStockModal';
import { PortfolioStats } from './PortfolioStats';
import { LoadingSpinner } from '../common/LoadingSpinner';

export const StockPortfolio: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();
  const { stocks, setStocks, setError } = useStockStore();

  useEffect(() => {
    const loadStocks = async () => {
      if (!user) return;
      
      try {
        const userStocks = await getUserStocks(user.uid);
        setStocks(userStocks);
      } catch (error) {
        console.error('Error loading stocks:', error);
        setError('Failed to load portfolio data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadStocks();
  }, [user, setStocks, setError]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-github-text-primary">
          Portfolio Overview
        </h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary"
        >
          Add Stock
        </button>
      </div>

      <PortfolioStats stocks={stocks} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StockChart stocks={stocks} />
        </div>
        <div>
          <StockList stocks={stocks} />
        </div>
      </div>

      <AddStockModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};