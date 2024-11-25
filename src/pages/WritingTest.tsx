import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import TestLayout from '../components/TestLayout';
import { tasks } from '../data/writingParts';
import { useLocation } from 'react-router-dom';

const WritingTest = () => {
  const [currentTask, setCurrentTask] = useState(1);
  const location = useLocation();
  const sectionData = location.state?.sectionData;
  
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentTaskData = tasks[currentTask - 1];

  const handleAnswerChange = (taskId: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [`task${taskId}`]: value,
    }));
  };

  const wordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  return (
    <TestLayout
      title="Writing Test"
      currentSection={`Task ${currentTask}`}
      totalTime={60}
      onBack={() => setCurrentTask((prev) => Math.max(1, prev - 1))}
      onNext={() => setCurrentTask((prev) => Math.min(2, prev + 1))}
      progress={(currentTask / 2) * 100}
    >
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold mb-2">{currentTaskData.title}</h3>
          <p className="text-gray-600 mb-4">{currentTaskData.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Minimum words: {currentTaskData.wordCount}</span>
            <span>Time: {currentTaskData.timeLimit} minutes</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="prose max-w-none">
              <h4 className="text-lg font-semibold mb-4">Writing Prompt</h4>
              <div className="whitespace-pre-line">
                {sectionData[`part${currentTask}`]?.data[1].question}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-semibold">Your Response</h4>
                <span className="text-sm text-gray-500">
                  Words: {wordCount(answers[`task${currentTask}`] || '')} /{' '}
                  {currentTaskData.wordCount}
                </span>
              </div>
              <textarea
                value={answers[`task${currentTask}`] || ''}
                onChange={(e) =>
                  handleAnswerChange(currentTask, e.target.value)
                }
                className="w-full h-[calc(100vh-400px)] p-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono"
                placeholder="Start writing here..."
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentTask((prev) => Math.max(1, prev - 1))}
            disabled={currentTask === 1}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" /> Previous Task
          </button>
          <button
            onClick={() => setCurrentTask((prev) => Math.min(2, prev + 1))}
            disabled={currentTask === 2}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
          >
            Next Task <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </TestLayout>
  );
};

export default WritingTest;
