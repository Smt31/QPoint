import React from 'react';

const ProfileHeader = ({ user, isCurrentUser, isFollowing, onFollowToggle }) => {
  if (!user) return null;

  return (
    <div className="bg-white p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="mb-4 sm:mb-0 sm:mr-6">
            <div className="bg-center bg-no-repeat bg-cover rounded-full size-24 flex items-center justify-center bg-[#FF6B6B] text-white font-bold">
              {user.avatarUrl ? (
                <img 
                  src={user.avatarUrl} 
                  alt={user.fullName} 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold">{user.fullName?.charAt(0) || user.username?.charAt(0) || 'U'}</span>
              )}
            </div>
          </div>
          
          <div>
            <div className="flex items-center">
              <h1 className="text-2xl font-bold mr-2 text-[#1A1A1A]">
                {user.fullName}
              </h1>
              {user.isVerified && (
                <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                  <svg className="text-[14px]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span>Verified</span>
                </div>
              )}
            </div>
            <p className="text-gray-600">@{user.username}</p>
            
            <div className="mt-2 flex flex-wrap items-center text-sm text-gray-500">
              {user.location && (
                <div className="flex items-center mr-4">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  {user.location}
                </div>
              )}
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Joined {user.joinedAt}
              </div>
            </div>
          </div>
        </div>
        
        {!isCurrentUser && (
          <div className="mt-4 md:mt-0">
            <button 
              className={`px-4 py-2 rounded-full font-medium transition-colors ${isFollowing 
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                : 'bg-[#FF6B6B] hover:bg-[#FF5252] text-white'}`}
              onClick={onFollowToggle}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
        )}
      </div>
      
      {user.bio && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-gray-700">{user.bio}</p>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;