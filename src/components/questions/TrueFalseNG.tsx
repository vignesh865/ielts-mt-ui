import React from 'react';
import type { TrueFalseQuestion } from './types';

interface Props {
  question: TrueFalseQuestion;
  onAnswer: (answer: { question_id: string; answers: Record<number, 'True' | 'False' | 'Not Given'> }) => void;
  selectedAnswers: Record<number, 'True' | 'False' | 'Not Given'>;
}

const TrueFalseNG: React.FC<Props> = ({ question, onAnswer, selectedAnswers }) => {
  const options = ['True', 'False', 'Not Given'] as const;

  const handleAnswer = (statementIndex: number, value: 'True' | 'False' | 'Not Given') => {
    const newAnswers = {
      ...selectedAnswers,
      [statementIndex]: value,
    };
    onAnswer({
      question_id: question.id,
      answers: newAnswers
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-sm text-gray-500 text-left">
        Select True, False, or Not Given for each statement
      </div>
      {question.statements.map((statement, statementIndex) => (
        <div key={statementIndex} className="space-y-4 pb-6 border-b border-gray-200 last:border-0">
          <p className="text-lg font-medium">
            {statementIndex + 1}. {statement.statement}
          </p>
          <div className="flex space-x-6">
            {options.map((option) => (
              <label
                key={option}
                className={`flex items-center space-x-2 p-3 rounded-lg cursor-pointer transition-colors
                  ${(selectedAnswers[statementIndex] || '') === option
                    ? 'bg-indigo-50 hover:bg-indigo-100'
                    : 'hover:bg-gray-50'}`}
              >
                <input
                  type="radio"
                  name={`statement-${statementIndex}`}
                  value={option}
                  checked={(selectedAnswers[statementIndex] || '') === option}
                  onChange={() => handleAnswer(statementIndex, option)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <div className="text-sm text-gray-500">
        Answered {Object.keys(selectedAnswers).length} of {question.statements.length} statements
      </div>
    </div>
  );
};

export default TrueFalseNG;
