import React from 'react';

interface PasswordStrengthIndicatorProps {
  password: string;
}

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  const getStrength = (password: string): { strength: number; label: string; color: string } => {
    if (!password) return { strength: 0, label: 'None', color: 'bg-gray-200' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;

    const strengthMap = {
      0: { label: 'None', color: 'bg-gray-200' },
      1: { label: 'Weak', color: 'bg-github-accent-red' },
      2: { label: 'Fair', color: 'bg-github-accent-yellow' },
      3: { label: 'Good', color: 'bg-github-accent-blue' },
      4: { label: 'Strong', color: 'bg-github-accent-green' },
      5: { label: 'Very Strong', color: 'bg-github-accent-green' },
    };

    return { strength, ...strengthMap[strength as keyof typeof strengthMap] };
  };

  const { strength, label, color } = getStrength(password);
  const percentage = (strength / 5) * 100;

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-500 dark:text-github-text-secondary">
          Password Strength:
        </span>
        <span className="text-xs font-medium text-gray-700 dark:text-github-text-primary">
          {label}
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 dark:bg-github-dark rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};