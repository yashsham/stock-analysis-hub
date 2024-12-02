import React, { useState, useEffect } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '../../stores/authStore';
import { LoadingSpinner } from '../common/LoadingSpinner';

export const EmailVerificationBanner: React.FC = () => {
  const [cooldown, setCooldown] = useState(0);
  const { user, loading, error, resendVerification } = useAuthStore();

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  const handleResendVerification = async () => {
    if (!user || cooldown > 0 || loading) return;
    
    await resendVerification();
    if (!error) {
      setCooldown(60); // 60 seconds cooldown
    }
  };

  if (!user || user.emailVerified) return null;

  return (
    <div className="rounded-md bg-yellow-50 dark:bg-github-dark p-4 mt-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon 
            className="h-5 w-5 text-github-accent-yellow" 
            aria-hidden="true" 
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-github-accent-yellow">
            Email Verification Required
          </h3>
          <div className="mt-2 text-sm text-yellow-700 dark:text-github-text-secondary">
            <p>
              Please verify your email address ({user.email}) to access all features.
              Check your inbox for the verification link.
            </p>
          </div>
          {error && (
            <p className="mt-2 text-sm text-github-accent-red">{error}</p>
          )}
          <div className="mt-4">
            <button
              type="button"
              onClick={handleResendVerification}
              disabled={loading || cooldown > 0}
              className="btn-primary inline-flex items-center space-x-2"
            >
              {loading && <LoadingSpinner />}
              <span>
                {cooldown > 0
                  ? `Resend available in ${cooldown}s`
                  : 'Resend verification email'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};