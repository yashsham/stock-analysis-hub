import React from 'react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { ProfileSection } from '../components/settings/ProfileSection';
import { SecuritySection } from '../components/settings/SecuritySection';
import { EmailVerificationBanner } from '../components/settings/EmailVerificationBanner';
import { useAuthStore } from '../stores/authStore';

export const Settings: React.FC = () => {
  const { user } = useAuthStore();
  const isEmailVerified = user?.emailVerified ?? false;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-github-text-primary animate-typing">
          Account Settings
        </h1>
        
        {!isEmailVerified && <EmailVerificationBanner />}
        
        <div className="mt-6 space-y-8">
          <ProfileSection />
          <SecuritySection />
        </div>
      </div>
    </DashboardLayout>
  );
};