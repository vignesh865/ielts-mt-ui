import React from 'react';
import { Clock } from 'lucide-react';

interface TestSectionProps {
  title: string;
  icon: React.ReactNode;
  duration: string;
  description: string;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick: () => void;
}

const TestSection: React.FC<TestSectionProps> = ({
  title,
  icon,
  duration,
  description,
  isActive = false,
  isDisabled = false,
  onClick,
}) => {
  return (
    <div
      onClick={isDisabled ? undefined : onClick}
      className={`p-6 rounded-xl transition-all gap-2 shadow-lg ${
        isDisabled
          ? 'bg-gray-100 opacity-50 cursor-not-allowed'
          : isActive
          ? 'bg-indigo-600 text-white shadow-lg scale-105 cursor-pointer'
          : 'bg-white hover:bg-indigo-50 cursor-pointer'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${isActive ? 'bg-indigo-500' : 'bg-indigo-100'}`}>
          {icon}
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">{duration}</span>
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className={`text-sm ${isActive ? 'text-indigo-100' : 'text-gray-600'}`}>
        {description}
      </p>
    </div>
  );
};

export default TestSection;