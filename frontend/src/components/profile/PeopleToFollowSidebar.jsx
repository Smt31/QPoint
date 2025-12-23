import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { userApi } from '../../api';

const PeopleToFollowSidebar = ({ suggestedUsers, onFollowToggle }) => {
  const [followingState, setFollowingState] = useState({});

  const handleFollowToggle = async (userId, isFollowing) => {
    try {
      // Update local state immediately for better UX
      setFollowingState(prev => ({
        ...prev,
        [userId]: !isFollowing
      }));

      // Call API to follow/unfollow
      if (isFollowing) {
        await userApi.unfollowUser(userId);
      } else {
        await userApi.followUser(userId);
      }

      // Notify parent component if needed
      if (onFollowToggle) {
        onFollowToggle(userId, !isFollowing);
      }
    } catch (error) {
      // Revert state if API call fails
      setFollowingState(prev => ({
        ...prev,
        [userId]: isFollowing
      }));
      console.error('Error toggling follow status:', error);
    }
  };

  if (!suggestedUsers || suggestedUsers.length === 0) {
    return (
      <div className="bg-white p-4">
        <h3 className="font-semibold text-lg mb-3">People to follow</h3>
        <div className="text-center py-8">
          <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <p className="mt-4 text-gray-500">No suggestions available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 sticky top-16">
      <h3 className="font-semibold text-lg mb-3">People to follow</h3>
      <div className="space-y-4">
        {suggestedUsers.map((user) => {
          const isFollowing = followingState[user.id] ?? user.isFollowing;
          
          return (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Link to={`/profile/${user.id}`}>
                  <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 flex items-center justify-center bg-[#FF6B6B] text-white font-bold">
                    {user.avatarUrl ? (
                      <img 
                        src={user.avatarUrl} 
                        alt={user.fullName}
                        className="w-full h-full rounded-full object-cover"
                        onError={(e) => {
                          e.target.src = '/default-avatar.png';
                        }}
                      />
                    ) : (
                      <span>{user.fullName?.charAt(0) || user.username?.charAt(0) || 'U'}</span>
                    )}
                  </div>
                </Link>
                <div>
                  <Link to={`/profile/${user.id}`} className="font-medium text-[#1A1A1A] hover:text-[#FF6B6B] transition-colors">
                    {user.fullName}
                  </Link>
                  <p className="text-sm text-gray-500">@{user.username}</p>
                </div>
              </div>
              <button
                onClick={() => handleFollowToggle(user.id, isFollowing)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  isFollowing
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : 'bg-[#FF6B6B] hover:bg-[#FF5252] text-white'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PeopleToFollowSidebar;