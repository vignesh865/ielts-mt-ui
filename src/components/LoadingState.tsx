import React from 'react';

interface LoadingStateProps {
  message: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      <p className="text-gray-600 text-center animate-pulse">{message}</p>
    </div>
  );
};

export default LoadingState;