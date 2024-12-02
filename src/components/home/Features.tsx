import React from 'react';
import { ChartBarIcon, CurrencyDollarIcon, LightBulbIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Real-time Analytics',
    description: 'Get real-time stock data and analytics to make informed decisions.',
    icon: ChartBarIcon,
  },
  {
    name: 'Portfolio Management',
    description: 'Track and manage your investment portfolio with advanced tools.',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Smart Insights',
    description: 'Receive AI-powered insights and recommendations for your investments.',
    icon: LightBulbIcon,
  },
];

export const Features: React.FC = () => {
  return (
    <div className="py-16 bg-gray-50 dark:bg-github-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-github-accent-blue tracking-wide uppercase">
            Features
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Everything you need to succeed
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-github-text-secondary mx-auto">
            Powerful tools and insights to help you make better investment decisions
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root bg-white dark:bg-github-dark rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-github-accent-blue rounded-md shadow-lg">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                      {feature.name}
                    </h3>
                    <p className="mt-5 text-base text-gray-500 dark:text-github-text-secondary">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};