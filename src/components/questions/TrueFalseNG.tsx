import React from 'react';
import type { TrueFalseQuestion } from './types';

interface Props {
  question: TrueFalseQuestion;
  onAnswer: (answer: 'T' | 'F' | 'NG') => void;
  selectedAnswer?: 'T' | 'F' | 'NG';
}

const TrueFalseNG: React.FC<Props> = ({ question, onAnswer, selectedAnswer }) => {
  const options = [
    { value: 'T', label: 'True' },
    { value: 'F', label: 'False' },
    { value: 'NG', label: 'Not Given' },
  ] as const;

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium">{question.question}</p>
      <div className="flex space-x-4">
        {options.map((option) => (
          <label key={option.value} className="flex items-center space-x-2">
            <input
              type="radio"
              name={question.id}
              value={option.value}
              checked={selectedAnswer === option.value}
              onChange={(e) => onAnswer(e.target.value as 'T' | 'F' | 'NG')}
              className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
            />
            <span className="text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default TrueFalseNG;