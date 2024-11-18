import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface TestLayoutProps {
  children: React.ReactNode;
  title: string;
  currentSection: string;
  totalTime: number;
  progress: number;
  onBack: () => void;
  onNext: () => void;
}

const TestLayout: React.FC<TestLayoutProps> = ({
  children,
  title,
  currentSection,
  totalTime,
  progress,
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Tests
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              <p className="text-gray-600">
                {currentSection} | Total Time: {totalTime} minutes
              </p>
            </div>
          </div>

          <div className="mb-6">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default TestLayout;