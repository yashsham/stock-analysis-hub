import React from 'react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { StockPortfolio } from '../components/stocks/StockPortfolio';

export const Portfolio: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <StockPortfolio />
      </div>
    </DashboardLayout>
  );
};