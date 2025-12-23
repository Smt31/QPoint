import React from 'react';
import { Link } from 'react-router-dom';

const UserQuestionsList = ({ questions }) => {
  if (!questions || questions.length === 0) {
    return (
      <div className="bg-white p-4">
        <h3 className="text-xl font-bold mb-4">Questions</h3>
        <div className="text-center py-8">
          <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p className="mt-4 text-gray-500">No questions posted yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4">
      <h3 className="text-xl font-bold mb-4">Questions ({questions.length})</h3>
      <div className="space-y-4">
        {questions.map((question) => (
          <div key={question.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
            <h4 className="text-lg font-semibold mb-2">
              <Link to={`/question/${question.id}`} className="text-[#1A1A1A] hover:text-[#FF6B6B] transition-colors">{question.title}</Link>
            </h4>
            {question.excerpt && (
              <p className="text-gray-600 mb-3">{question.excerpt.substring(0, 150)}...</p>
            )}
            <div className="flex flex-wrap gap-2 mb-3">
              {question.tags && question.tags.map((tag, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">{tag}</span>
              ))}
            </div>
            <div className="flex items-center text-sm text-gray-500 space-x-4">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                </svg>
                {question.votes}
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                {question.answers} answers
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                {question.views} views
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserQuestionsList;