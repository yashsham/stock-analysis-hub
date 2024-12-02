import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../common/ThemeToggle';
import { useAuthStore } from '../../stores/authStore';

export const HomeNavbar: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <nav className="bg-white dark:bg-github-dark border-b border-gray-200 dark:border-github-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <svg className="h-8 w-8 text-github-accent-blue" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
              </svg>
              <span className="text-xl font-semibold text-gray-900 dark:text-white">Stock Analytics Hub</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <Link
                to="/dashboard"
                className="bg-github-accent-blue text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 dark:text-github-text-primary hover:text-github-accent-blue"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="bg-github-accent-blue text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};