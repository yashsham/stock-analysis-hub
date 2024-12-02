import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../stores/authStore';

export const WelcomeMessage: React.FC = () => {
  const { user } = useAuthStore();
  const [displayText, setDisplayText] = useState('');
  const welcomeText = `Welcome back, ${user?.email}!`;

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= welcomeText.length) {
        setDisplayText(welcomeText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [welcomeText]);

  return (
    <h1 className="text-2xl font-bold mb-6 animate-typing">
      {displayText}
    </h1>
  );
};