import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import TestLayout from '../components/TestLayout';
import { useLocation } from 'react-router-dom';
import LetterWriting from '../components/writing/LetterWriting';
import EssayWriting from '../components/writing/EssayWriting';

const WritingTest = () => {
  const [currentTask, setCurrentTask] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const location = useLocation();
  const testId = location.state?.testId;
  const sectionData = location.state?.sectionData;

  const currentTaskData = sectionData?.[`part${currentTask}`];

  const handleAnswerChange = (questionId: string, answer: string) => {
    const updatedAnswers = {
      ...answers,
      [questionId]: answer,
    };
    setAnswers(updatedAnswers);

    localStorage.setItem(
      `test_${testId}_writing`,
      JSON.stringify(updatedAnswers)
    );
  };

  const getTaskTitle = (taskNumber: number) => {
    return taskNumber === 1 ? 'Letter Writing' : 'Essay Writing';
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
          <h3 className="text-xl font-bold mb-2">{getTaskTitle(currentTask)}</h3>
          <p className="text-gray-600 mb-4">
            {currentTask === 1
              ? 'Write a letter according to the given situation'
              : 'Write an essay expressing your views on the given topic'}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Minimum words: {currentTask === 1 ? 150 : 250}</span>
            <span>Time: {currentTask === 1 ? 20 : 40} minutes</span>
          </div>
        </div>

        {currentTask === 1 ? (
          <LetterWriting
            taskData={currentTaskData}
            answer={answers[currentTaskData?.data[1]?.id] || ''}
            onAnswerChange={handleAnswerChange}
          />
        ) : (
          <EssayWriting
            taskData={currentTaskData}
            answer={answers[currentTaskData?.data[1]?.id] || ''}
            onAnswerChange={handleAnswerChange}
          />
        )}

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