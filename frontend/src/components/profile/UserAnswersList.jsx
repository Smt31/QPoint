import React from 'react';
import { Link } from 'react-router-dom';

const UserAnswersList = ({ answers }) => {
  if (!answers || answers.length === 0) {
    return (
      <div className="bg-white p-4">
        <h3 className="text-xl font-bold mb-4">Answers</h3>
        <div className="text-center py-8">
          <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
          </svg>
          <p className="mt-4 text-gray-500">No answers posted yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4">
      <h3 className="text-xl font-bold mb-4">Answers ({answers.length})</h3>
      <div className="space-y-4">
        {answers.map((answer) => (
          <div key={answer.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
            <div className="flex items-start space-x-3">
              <div className="flex flex-col items-center">
                <button className="text-gray-500 hover:text-[#FF6B6B]">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <span className="text-sm font-medium my-1">{answer.upvotes - answer.downvotes}</span>
                <button className="text-gray-500 hover:text-[#FF6B6B]">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className="flex-1">
                <Link to={`/question/${answer.questionId}`} className="text-[#1A1A1A] hover:text-[#FF6B6B] font-medium transition-colors">
                  {answer.questionTitle}
                </Link>
                <p className="text-gray-700 mt-2 line-clamp-2">
                  {answer.content}
                </p>
                <div className="flex items-center mt-3 text-sm text-gray-500">
                  <span>{answer.upvotes} upvotes</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(answer.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAnswersList;