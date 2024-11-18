import React from 'react';
import type { MultipleChoiceQuestion } from './types';

interface Props {
  question: MultipleChoiceQuestion;
  onAnswer: (answers: string[]) => void;
  selectedAnswers: string[];
}

const MultipleChoice: React.FC<Props> = ({ question, onAnswer, selectedAnswers }) => {
  const handleChange = (choiceId: string) => {
    const newAnswers = selectedAnswers.includes(choiceId)
      ? selectedAnswers.filter(id => id !== choiceId)
      : [...selectedAnswers, choiceId];
    onAnswer(newAnswers);
  };

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium">{question.question}</p>
      <div className="space-y-2">
        {question.choices.map((choice) => (
          <label key={choice.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
            <input
              type="checkbox"
              checked={selectedAnswers.includes(choice.id)}
              onChange={() => handleChange(choice.id)}
              className="mt-1 h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
            />
            <span className="text-gray-700">{choice.text}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoice;