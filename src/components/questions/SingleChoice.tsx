import React from 'react';
import type { SingleChoiceQuestion } from './types';

interface Props {
  question: SingleChoiceQuestion;
  onAnswer: (answer: string) => void;
  selectedAnswer?: string;
}

const SingleChoice: React.FC<Props> = ({ question, onAnswer, selectedAnswer }) => {
  return (
    <div className="space-y-4">
      <p className="text-lg font-medium">{question.question}</p>
      <div className="space-y-2">
        {question.choices.map((choice) => (
          <label key={choice.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
            <input
              type="radio"
              name={question.id}
              value={choice.id}
              checked={selectedAnswer === choice.id}
              onChange={(e) => onAnswer(e.target.value)}
              className="mt-1 h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
            />
            <span className="text-gray-700">{choice.text}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SingleChoice;