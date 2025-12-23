import React from 'react';

const ProfileSkills = ({ topics }) => {
  if (!topics || topics.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <h3 className="text-xl font-bold mb-4">Skills & Interests</h3>
        <p className="text-gray-500 italic">No skills added yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
      <h3 className="text-xl font-bold mb-4">Skills & Interests</h3>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
            {topic}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProfileSkills;