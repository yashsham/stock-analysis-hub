import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-github-dark border-t border-gray-200 dark:border-github-border">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 dark:text-github-text-secondary tracking-wider uppercase">
              Product
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/features" className="text-base text-gray-500 dark:text-github-text-primary hover:text-github-accent-blue">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-base text-gray-500 dark:text-github-text-primary hover:text-github-accent-blue">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 dark:text-github-text-secondary tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/about" className="text-base text-gray-500 dark:text-github-text-primary hover:text-github-accent-blue">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-base text-gray-500 dark:text-github-text-primary hover:text-github-accent-blue">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-github-border pt-8">
          <p className="text-base text-gray-400 dark:text-github-text-secondary text-center">
            &copy; {new Date().getFullYear()} Stock Analytics Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};