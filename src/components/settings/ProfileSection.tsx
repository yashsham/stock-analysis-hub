import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../stores/authStore';
import { updateUserProfile } from '../../lib/db';
import { LoadingSpinner } from '../common/LoadingSpinner';

interface ProfileFormData {
  firstName: string;
  lastName: string;
  bio: string;
}

export const ProfileSection: React.FC = () => {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>();

  const onSubmit = async (data: ProfileFormData) => {
    if (!user) return;
    setIsLoading(true);
    try {
      await updateUserProfile(user.uid, data);
      // Show success message
    } catch (error) {
      // Show error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white dark:bg-github-secondary rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-github-text-primary mb-6">
        Profile Information
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-github-text-secondary">
              First Name
            </label>
            <input
              {...register('firstName', { required: 'First name is required' })}
              type="text"
              className="input mt-1"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-github-accent-red">{errors.firstName.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-github-text-secondary">
              Last Name
            </label>
            <input
              {...register('lastName', { required: 'Last name is required' })}
              type="text"
              className="input mt-1"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-github-accent-red">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-github-text-secondary">
            Bio
          </label>
          <textarea
            {...register('bio')}
            rows={4}
            className="input mt-1"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary flex items-center space-x-2"
          >
            {isLoading && <LoadingSpinner />}
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </section>
  );
};