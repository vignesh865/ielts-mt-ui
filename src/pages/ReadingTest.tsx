import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import TestLayout from '../components/TestLayout';
import QuestionRenderer from '../components/questions/QuestionRenderer';
import type { BaseQuestion } from '../components/questions/types';
import { parts } from '../data/readingParts';

const ReadingTest = () => {
  const [currentPart, setCurrentPart] = useState(1);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const currentPartData = parts[currentPart - 1];

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  return (
    <TestLayout
      title="Reading Test"
      currentSection={`Passage ${currentPart}`}
      totalTime={60}
      onBack={() => setCurrentPart((prev) => Math.max(1, prev - 1))}
      onNext={() => setCurrentPart((prev) => Math.min(3, prev + 1))}
      progress={(currentPart / 3) * 100}
    >
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold mb-2">{currentPartData.title}</h3>
          <p className="text-gray-600 mb-4">{currentPartData.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Questions: {currentPartData.questions.length}</span>
            <span>Time: 20 minutes</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="prose max-w-none">
              <h4 className="text-lg font-semibold mb-4">Reading Passage</h4>
              <div className="whitespace-pre-line">{currentPartData.text}</div>
            </div>
          </div>

          <div className="space-y-6">
            {currentPartData.questions.map((question: BaseQuestion, index) => (
              <div
                key={question.id}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-500">
                    Question {index + 1}
                  </span>
                </div>
                <QuestionRenderer
                  question={question}
                  onAnswer={(answer) => handleAnswer(question.id, answer)}
                  currentAnswer={answers[question.id]}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentPart((prev) => Math.max(1, prev - 1))}
            disabled={currentPart === 1}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" /> Previous Passage
          </button>
          <button
            onClick={() => setCurrentPart((prev) => Math.min(3, prev + 1))}
            disabled={currentPart === 3}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
          >
            Next Passage <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </TestLayout>
  );
};

export default ReadingTest;
