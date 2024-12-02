import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '../../stores/authStore';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';
import { updateUserPassword, updateSecurityPreferences } from '../../lib/auth/securityService';
import { toast } from 'react-hot-toast';

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface SecurityPreferences {
  twoFactorEnabled: boolean;
  loginNotifications: boolean;
}

export const SecuritySection: React.FC = () => {
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [preferences, setPreferences] = useState<SecurityPreferences>({
    twoFactorEnabled: false,
    loginNotifications: true,
  });
  
  const { user } = useAuthStore();
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<PasswordFormData>();
  const newPassword = watch('newPassword');

  const onSubmit = async (data: PasswordFormData) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const result = await updateUserPassword(
        user,
        data.currentPassword,
        data.newPassword
      );
      
      if (result.success) {
        toast.success('Password updated successfully');
        reset();
      } else {
        toast.error(result.error || 'Failed to update password');
      }
    } catch (error) {
      toast.error('An error occurred while updating password');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreferencesChange = async (key: keyof SecurityPreferences) => {
    if (!user) return;

    const newPreferences = {
      ...preferences,
      [key]: !preferences[key]
    };
    
    setPreferences(newPreferences);
    
    const result = await updateSecurityPreferences(user.uid, newPreferences);
    if (!result.success) {
      // Revert on failure
      setPreferences(preferences);
      toast.error(result.error || 'Failed to update security preferences');
    }
  };

  return (
    <section className="bg-white dark:bg-github-secondary rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-github-text-primary mb-6">
        Security Settings
      </h2>

      <div className="space-y-8">
        {/* Password Change Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-github-text-primary">
            Change Password
          </h3>

          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-github-text-secondary">
              Current Password
            </label>
            <div className="relative mt-1">
              <input
                {...register('currentPassword', { required: 'Current password is required' })}
                type={showPasswords.current ? 'text' : 'password'}
                className="input pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center"
                onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
              >
                {showPasswords.current ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="mt-1 text-sm text-github-accent-red">{errors.currentPassword.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-github-text-secondary">
              New Password
            </label>
            <div className="relative mt-1">
              <input
                {...register('newPassword', {
                  required: 'New password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters'
                  }
                })}
                type={showPasswords.new ? 'text' : 'password'}
                className="input pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center"
                onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
              >
                {showPasswords.new ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <p className="mt-1 text-sm text-github-accent-red">{errors.newPassword.message}</p>
            )}
            <PasswordStrengthIndicator password={newPassword} />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-github-text-secondary">
              Confirm New Password
            </label>
            <div className="relative mt-1">
              <input
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: value => value === newPassword || 'Passwords do not match'
                })}
                type={showPasswords.confirm ? 'text' : 'password'}
                className="input pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center"
                onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
              >
                {showPasswords.confirm ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-github-accent-red">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary flex items-center space-x-2"
            >
              {isLoading && <LoadingSpinner />}
              <span>Update Password</span>
            </button>
          </div>
        </form>

        {/* Security Preferences */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-github-text-primary">
            Additional Security
          </h3>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-github-text-primary">
                Two-Factor Authentication
              </h4>
              <p className="text-sm text-gray-500 dark:text-github-text-secondary">
                Add an extra layer of security to your account
              </p>
            </div>
            <button
              onClick={() => handlePreferencesChange('twoFactorEnabled')}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-github-accent-blue focus:ring-offset-2 ${
                preferences.twoFactorEnabled ? 'bg-github-accent-green' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  preferences.twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-github-text-primary">
                Login Notifications
              </h4>
              <p className="text-sm text-gray-500 dark:text-github-text-secondary">
                Receive notifications for new login attempts
              </p>
            </div>
            <button
              onClick={() => handlePreferencesChange('loginNotifications')}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-github-accent-blue focus:ring-offset-2 ${
                preferences.loginNotifications ? 'bg-github-accent-green' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  preferences.loginNotifications ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};