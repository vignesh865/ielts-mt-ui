import React from 'react';
import type { CompletionQuestion } from './types';

interface Props {
  question: CompletionQuestion;
  onAnswer: (answers: string[]) => void;
  answers: string[];
}

const Completion: React.FC<Props> = ({ question, onAnswer, answers }) => {
  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    onAnswer(newAnswers);
  };

  const renderInput = (index: number) => (
    <input
      key={index}
      type="text"
      value={answers[index] || ''}
      onChange={(e) => handleAnswerChange(index, e.target.value)}
      className="w-32 inline-block mx-1 px-2 py-1 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none"
      placeholder="Type answer..."
    />
  );

  const parts = question.text.split('_');
  
  return (
    <div className="space-y-4">
      <p className="text-lg font-medium">{question.question}</p>
      <div className="mt-4">
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {index < parts.length - 1 && renderInput(index)}
          </React.Fragment>
        ))}
      </div>
      {question.choices && (
        <div className="mt-4 flex flex-wrap gap-2">
          {question.choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => {
                const emptyIndex = answers.findIndex(a => !a);
                if (emptyIndex !== -1) {
                  handleAnswerChange(emptyIndex, choice.text);
                }
              }}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
            >
              {choice.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Completion;