import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Timer from './Timer';

interface TestLayoutProps {
  children: React.ReactNode;
  title: string;
  currentSection: string;
  totalTime: number;
  progress: number;
  onBack: () => void;
  onNext: () => void;
  isLastPart?: boolean;
}

const TestLayout: React.FC<TestLayoutProps> = ({
  children,
  title,
  currentSection,
  totalTime,
  progress,
  onBack,
  onNext,
  isLastPart = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const testId = location.pathname.split('/')[2];
  const [showSubmitModal, setShowSubmitModal] = React.useState(false);

  const handleSubmit = () => {
    setShowSubmitModal(true);
    setTimeout(() => {
      navigate(`/test/${testId}/sections`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(`/test/${testId}/sections`)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4" />
                
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                <p className="text-gray-600">
                  {currentSection} | Total Time: {totalTime} minutes
                </p>
              </div>
            </div>
            <Timer duration={totalTime} onTimeEnd={() => navigate(`/test/${testId}/sections`)} />
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

          {/* <div className="flex justify-between mt-6">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>
            {isLastPart ? (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Submit Section
              </button>
            ) : (
              <button
                onClick={onNext}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            )}
          </div> */}

          {showSubmitModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Section Completed</h3>
                <p className="text-gray-600">Your answers have been saved.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestLayout;