import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { StockEntry } from '../../lib/db/stockService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface StockChartProps {
  stocks: StockEntry[];
}

export const StockChart: React.FC<StockChartProps> = ({ stocks }) => {
  const chartData = {
    labels: stocks.map(stock => stock.purchaseDate.toLocaleDateString()),
    datasets: [
      {
        label: 'Portfolio Value Over Time',
        data: stocks.map(stock => stock.purchasePrice * stock.quantity),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Portfolio Performance',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Value ($)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Purchase Date',
        },
      },
    },
  };

  if (stocks.length === 0) {
    return (
      <div className="bg-white dark:bg-github-secondary rounded-lg shadow-sm p-6 flex items-center justify-center h-64">
        <p className="text-gray-500 dark:text-github-text-secondary">
          No stock data available
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-github-secondary rounded-lg shadow-sm p-6">
      <Line data={chartData} options={options} />
    </div>
  );
};