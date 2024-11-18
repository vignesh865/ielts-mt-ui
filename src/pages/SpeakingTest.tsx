import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import TestLayout from '../components/TestLayout';

const SpeakingTest = () => {
  const [currentPart, setCurrentPart] = useState(1);

  const parts = [
    {
      part: 1,
      title: 'Introduction and Interview',
      description: 'General questions about yourself and a range of familiar topics, such as home, family, work, studies and interests.',
      timeLimit: '4-5',
    },
    {
      part: 2,
      title: 'Individual Long Turn',
      description: "Speak for 1-2 minutes on a given topic. You'll have 1 minute to prepare before speaking.",
      timeLimit: '3-4',
    },
    {
      part: 3,
      title: 'Two-Way Discussion',
      description: 'A discussion of more abstract ideas linked to the topic in Part 2.',
      timeLimit: '4-5',
    },
  ];

  const currentPartData = parts[currentPart - 1];

  return (
    <TestLayout
      title="Speaking Test"
      currentSection={`Part ${currentPart}`}
      totalTime={14}
      onBack={() => setCurrentPart((prev) => Math.max(1, prev - 1))}
      onNext={() => setCurrentPart((prev) => Math.min(3, prev + 1))}
      progress={(currentPart / 3) * 100}
    >
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold mb-2">{currentPartData.title}</h3>
          <p className="text-gray-600 mb-4">{currentPartData.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Duration: {currentPartData.timeLimit} minutes</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="space-y-4">
            <h4 className="font-semibold">Instructions</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Speak clearly and at a natural pace</li>
              <li>Use a range of vocabulary and grammatical structures</li>
              <li>Provide detailed responses</li>
              <li>Stay on topic and answer the questions directly</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentPart((prev) => Math.max(1, prev - 1))}
            disabled={currentPart === 1}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" /> Previous Part
          </button>
          <button
            onClick={() => setCurrentPart((prev) => Math.min(3, prev + 1))}
            disabled={currentPart === 3}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
          >
            Next Part <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </TestLayout>
  );
};

export default SpeakingTest;