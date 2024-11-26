import React from 'react';
import type { MultipleChoiceQuestion } from './types';

interface Props {
  question: MultipleChoiceQuestion;
  onAnswer: (answer: { question_id: string; answers: string[] }) => void;
  selectedAnswers: string[];
}

const MultipleChoice: React.FC<Props> = ({ question, onAnswer, selectedAnswers }) => {
  const allOptions = [...question.question_with_options.correct_answers,
     ...question.question_with_options.wrong_answers].sort();

  const requiredSelections = question.question_with_options.correct_answers.length;

  const handleChange = (option: string) => {
    let newAnswers: string[];
    
    if (selectedAnswers.includes(option)) {
      newAnswers = selectedAnswers.filter(answer => answer !== option);
    } else {
      if (selectedAnswers.length >= requiredSelections) {
        newAnswers = [...selectedAnswers.slice(1), option];
      } else {
        newAnswers = [...selectedAnswers, option];
      }
    }

    onAnswer({
      question_id: question.id,
      answers: newAnswers
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-lg font-medium">{question.question_with_options.question}</p>
        <span className="text-sm text-gray-500">
          Select {requiredSelections} answer{requiredSelections > 1 ? 's' : ''}
        </span>
      </div>
      <div className="space-y-2">
        {allOptions.map((option, index) => (
          <label 
            key={index} 
            className={`flex items-start space-x-3 p-3 rounded-lg cursor-pointer transition-colors
              ${selectedAnswers.includes(option) 
                ? 'bg-indigo-50 hover:bg-indigo-100' 
                : 'hover:bg-gray-50'}`}
          >
            <input
              type="checkbox"
              checked={selectedAnswers.includes(option)}
              onChange={() => handleChange(option)}
              className="mt-1 h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
            />
            <span className="text-gray-700">{option}</span>
          </label>
        ))}
      </div>
      {selectedAnswers.length > 0 && (
        <p className="text-sm text-gray-500 mt-4">
          Selected {selectedAnswers.length} of {requiredSelections} required answers
        </p>
      )}
    </div>
  );
};

export default MultipleChoice;
