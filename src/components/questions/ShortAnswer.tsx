import React from 'react';
import type { ShortAnswerQuestion } from './types';

interface Props {
  question: ShortAnswerQuestion;
  onAnswer: (answer: { question_id: string; answers: string[] }) => void;
  answers: string[];
}

const ShortAnswer: React.FC<Props> = ({ question, onAnswer, answers }) => {
  
  const handleAnswer = (questionIndex: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = value;
    onAnswer({
      question_id: question.id,
      answers: newAnswers,
    });
  };

  return (
    <div className="space-y-8">
      {question.questions.map((subQuestion, questionIndex) => (
        <div
          key={questionIndex}
          className="space-y-4 pb-6 border-b border-gray-200 last:border-0"
        >
          <p className="text-lg">
            <span className="font-medium text-gray-900">
              {questionIndex + 1}.{' '}
            </span>
            {subQuestion.question}
          </p>
          <input
            type="text"
            value={answers[questionIndex] || ''}
            onChange={(e) => handleAnswer(questionIndex, e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Type your answer..."
          />
        </div>
      ))}
      <div className="text-sm text-gray-500">
        Answered {answers.filter(Boolean).length} of {question.questions.length} questions
      </div>
    </div>
  );
};

export default ShortAnswer;
