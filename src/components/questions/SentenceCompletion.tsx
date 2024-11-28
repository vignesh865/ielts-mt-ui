import React from 'react';
import type { SentenceCompletionQuestion } from './types';

interface Props {
  question: SentenceCompletionQuestion;
  onAnswer: (answer: { question_id: string; answers: string[] }) => void;
  answers: string[];
}

const SentenceCompletion: React.FC<Props> = ({ question, onAnswer, answers }) => {
  const handleAnswerChange = (sentenceIndex: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[sentenceIndex] = value || '';
    onAnswer({
      question_id: question.id,
      answers: question.sentence_completion.sentences.map((_, index) => 
        newAnswers[index] || ''
      ),
    });
  };

  return (
    <div className="space-y-6">
      {question.sentence_completion.sentences.map((sentence, index) => {
        const parts = sentence.split('$$$$');
        const hasBlank = parts.length > 1;

        return (
          <div key={index} className="space-y-2">
            <div className="flex items-start space-x-2">
              <span className="flex-shrink-0 font-medium text-gray-900">
                {index + 1}.
              </span>
              <div className="flex-1">
                {hasBlank ? (
                  <div className="flex items-center flex-wrap gap-2">
                    {parts.map((part, partIndex) => (
                      <React.Fragment key={partIndex}>
                        <span>{part}</span>
                        {partIndex < parts.length - 1 && (
                          <input
                            type="text"
                            value={answers[index] || ''}
                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                            className="px-3 py-1 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none min-w-[120px] bg-gray-50"
                            placeholder="Enter answer..."
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                ) : (
                  <p>{sentence}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
      <div className="text-sm text-gray-500">
        Completed {answers.filter(Boolean).length} of {question.sentence_completion.sentences.length} sentences
      </div>
    </div>
  );
};

export default SentenceCompletion;
