import React from 'react';

const ProfileStats = ({ stats }) => {
  if (!stats) return null;

  const statItems = [
    { label: 'Reputation', value: stats.reputation || 0 },
    { label: 'Followers', value: stats.followers || 0 },
    { label: 'Following', value: stats.following || 0 },
    { label: 'Questions', value: stats.questions || 0 },
    { label: 'Answers', value: stats.answers || 0 },
  ];

  return (
    <div className="bg-white p-4">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {statItems.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-2xl font-bold text-[#1A1A1A]">{stat.value}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileStats;