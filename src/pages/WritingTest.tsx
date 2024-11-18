import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import TestLayout from '../components/TestLayout';

const WritingTest = () => {
  const [currentTask, setCurrentTask] = useState(1);

  const tasks = [
    {
      task: 1,
      title: 'Task 1 - Report Writing',
      description: 'Write a report of at least 150 words describing visual information (graph, table, chart, or diagram).',
      timeLimit: 20,
      wordCount: 150,
    },
    {
      task: 2,
      title: 'Task 2 - Essay Writing',
      description: 'Write an essay of at least 250 words in response to a point of view, argument, or problem.',
      timeLimit: 40,
      wordCount: 250,
    },
  ];

  const currentTaskData = tasks[currentTask - 1];

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

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <textarea
            className="w-full h-64 p-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Start writing here..."
          />
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