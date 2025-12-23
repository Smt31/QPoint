import React from 'react';

const ProfileTabs = ({ activeTab, onChange, isCurrentUser }) => {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'questions', label: 'Questions' },
    { id: 'answers', label: 'Answers' },
  ];

  // Add saved tab only for current user
  if (isCurrentUser) {
    tabs.push({ id: 'saved', label: 'Saved' });
  }

  return (
    <div className="bg-white p-4">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === tab.id 
              ? 'bg-[#FF6B6B] text-white hover:bg-[#FF5252]' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;