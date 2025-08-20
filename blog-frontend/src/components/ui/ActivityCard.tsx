import React from 'react';
import { ActivityType } from '../../components/types';

type ActivityCardProps = {
  activity: ActivityType;
};

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  // Determine the border color based on activity type
  const getBorderColor = () => {
    switch (activity.type) {
      case 'post':
        return 'border-blue-500';
      case 'comment':
        return 'border-green-500';
      case 'user':
        return 'border-yellow-500';
      default:
        return 'border-gray-500';
    }
  };

  // Format the date to a readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`border-l-4 ${getBorderColor()} pl-4 py-2 bg-white shadow-sm rounded-r-md`}>
      <p className="font-medium">{activity.title}</p>
      <p className="text-sm text-gray-600">{activity.description}</p>
      <div className="mt-1 flex items-center text-xs text-gray-500">
        <span>By {activity.username}</span>
        <span className="mx-1">•</span>
        <span>{formatDate(activity.createdAt)}</span>
      </div>
    </div>
  );
};

export default ActivityCard;
