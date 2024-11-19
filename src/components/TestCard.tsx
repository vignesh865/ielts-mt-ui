import React from 'react';
import { Clock } from 'lucide-react';
import type { Test } from '../types/test';

interface TestCardProps {
  test: Test;
  onClick: (testId: string) => void;
}

const TestCard: React.FC<TestCardProps> = ({ test, onClick }) => {
  const getTypeColor = (type: Test['type']) => {
    return type === 'Academic' 
      ? 'bg-blue-100 text-blue-800'
      : 'bg-purple-100 text-purple-800';
  };

  return (
    <div
      onClick={() => onClick(test.id)}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 hover:border-indigo-100 h-full"
    >
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-lg font-semibold text-gray-900">{test.title}</h3>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(test.type)}`}>
            {test.type}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{test.duration}m</span>
          </div>
          <span className={`px-2 py-0.5 rounded-full text-xs ${
            test.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
            test.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {test.difficulty}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TestCard;