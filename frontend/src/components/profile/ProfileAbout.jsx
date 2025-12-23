import React from 'react';

const ProfileAbout = ({ about }) => {
  if (!about) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <h3 className="text-xl font-bold mb-4">About</h3>
        <p className="text-gray-500 italic">This user hasn't added a bio yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
      <h3 className="text-xl font-bold mb-4">About</h3>
      <p className="text-gray-700 whitespace-pre-line">{about}</p>
    </div>
  );
};

export default ProfileAbout;