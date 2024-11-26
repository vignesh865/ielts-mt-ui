import React from 'react';
import type { ShortAnswerQuestion } from './types';

interface Props {
  question: ShortAnswerQuestion;
  onAnswer: (answer: { question_id: string; answers: Record<number, string> }) => void;
  answers: Record<number, string>;
}

const ShortAnswer: React.FC<Props> = ({ question, onAnswer, answers }) => {
  const handleAnswer = (questionIndex: number, value: string) => {
    const newAnswers = {
      ...answers,
      [questionIndex]: value,
    };
    onAnswer({
      question_id: question.question_id,
      answers: newAnswers,
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-sm text-gray-500 text-right">
        {question.maxWords ? `Maximum ${question.maxWords} words per answer` : 'Enter your answer'}
      </div>
      {question.questions.map((subQuestion, questionIndex) => (
        <div key={questionIndex} className="space-y-4 pb-6 border-b border-gray-200 last:border-0">
          <p className="text-lg font-medium">
            {questionIndex + 1}. {subQuestion.question}
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
        Answered {Object.keys(answers).length} of {question.questions.length} questions
      </div>
    </div>
  );
};

export default ShortAnswer;