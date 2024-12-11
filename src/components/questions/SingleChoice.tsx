import React from 'react';
import type { SingleChoiceQuestion } from './types';

interface Props {
  question: SingleChoiceQuestion;
  onAnswer: (answer: { question_id: string; answers: string[] }) => void;
  selectedAnswers: string[];
}

const SingleChoice: React.FC<Props> = ({ question, onAnswer, selectedAnswers }) => {
  const handleAnswer = (questionIndex: number, answer: string) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[questionIndex] = answer;

    onAnswer({
      question_id: question.id,
      answers: newAnswers,
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-sm text-gray-500 text-left">
        Select 1 answer for each question
      </div>
      {question.questions.map((subQuestion, questionIndex) => {
        const allOptions = [subQuestion.correct_answer, ...subQuestion.wrong_answers].sort();

        return (
          <div key={questionIndex} className="space-y-4 pb-6 border-b border-gray-200 last:border-0">
            <p className="text-lg font-medium">
              {questionIndex + 1}. {subQuestion.question}
            </p>
            <div className="space-y-2">
              {allOptions.map((option, optionIndex) => (
                <label
                  key={optionIndex}
                  className={`flex items-start space-x-3 p-3 rounded-lg cursor-pointer transition-colors
                    ${(selectedAnswers?.[questionIndex] || '') === option
                      ? 'bg-indigo-50 hover:bg-indigo-100'
                      : 'hover:bg-gray-50'}`}
                >
                  <input
                    type="radio"
                    name={`question-${questionIndex}`}
                    checked={(selectedAnswers?.[questionIndex] || '') === option}
                    onChange={() => handleAnswer(questionIndex, option)}
                    className="mt-1 h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );
      })}
      <div className="text-sm text-gray-500">
        Answered {Object.keys(selectedAnswers || {}).length} of {question.questions.length} questions
      </div>
    </div>
  );
};

export default SingleChoice;
