import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-github-dark pt-16 pb-32">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1>
              <span className="block text-sm font-semibold text-github-accent-blue">
                Introducing Stock Analytics Hub
              </span>
              <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                <span className="block text-gray-900 dark:text-white">Smart Stock Analysis</span>
                <span className="block text-github-accent-blue">for Smart Investors</span>
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 dark:text-github-text-secondary sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Advanced stock analysis platform with real-time data, comprehensive analytics, and portfolio management tools to help you make informed investment decisions.
            </p>
            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left">
              <Link
                to="/register"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-github-accent-blue hover:bg-opacity-90 transition-colors"
              >
                Get started
                <ArrowRightIcon className="ml-2 -mr-1 h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <div className="relative block w-full bg-white dark:bg-github-secondary rounded-lg overflow-hidden">
                <img
                  className="w-full"
                  src="https://via.placeholder.com/600x400/0D1117/58A6FF?text=Stock+Analytics"
                  alt="Stock Analytics Dashboard Preview"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};