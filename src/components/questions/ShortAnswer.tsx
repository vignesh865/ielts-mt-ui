import React from 'react';
import type { ShortAnswerQuestion } from './types';

interface Props {
  question: ShortAnswerQuestion;
  onAnswer: (answer: string) => void;
  answer: string;
}

const ShortAnswer: React.FC<Props> = ({ question, onAnswer, answer }) => {
  return (
    <div className="space-y-4">
      <p className="text-lg font-medium">{question.question}</p>
      <div>
        <textarea
          value={answer}
          onChange={(e) => onAnswer(e.target.value)}
          className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Type your answer here..."
        />
        {question.maxWords && (
          <p className="text-sm text-gray-500 mt-2">
            Maximum words: {question.maxWords}
          </p>
        )}
      </div>
    </div>
  );
};

export default ShortAnswer;