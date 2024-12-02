import React from 'react';

interface Activity {
  id: string;
  type: 'add' | 'remove' | 'update';
  description: string;
  timestamp: string;
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'add',
    description: 'Added AAPL to portfolio',
    timestamp: '2023-11-20T10:30:00Z'
  },
  {
    id: '2',
    type: 'update',
    description: 'Updated TSLA position',
    timestamp: '2023-11-20T09:15:00Z'
  }
];

export const ActivityFeed: React.FC = () => {
  return (
    <div className="space-y-4">
      {mockActivities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-start space-x-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex-shrink-0">
            {activity.type === 'add' && (
              <span className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center">
                <span className="text-green-600 dark:text-green-200">+</span>
              </span>
            )}
            {activity.type === 'update' && (
              <span className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-200">↻</span>
              </span>
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {activity.description}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(activity.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};