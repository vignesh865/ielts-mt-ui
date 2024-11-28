import React from 'react';
import { ChevronDown } from 'lucide-react';
import type { FlowCompletionQuestion } from './types';

interface Props {
  question: FlowCompletionQuestion;
  onAnswer: (answer: { question_id: string; answers: string[] }) => void;
  answers: string[];
}

const FlowCompletion: React.FC<Props> = ({ question, onAnswer, answers }) => {
  const handleAnswerChange = (stepIndex: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[stepIndex] = value || '';
    onAnswer({
      question_id: question.id,
      answers: question.flow_completion.steps.map((_, index) => 
        newAnswers[index] || ''
      ),
    });
  };

  return (
    <div className="space-y-6">
      {question.flow_completion.steps.map((step, index) => {
        const parts = step.text.split('$$$$');
        const hasBlank = parts.length > 1;

        return (
          <div key={index} className="relative">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-start space-x-2">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full font-medium">
                  {index + 1}
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
                    <p>{step.text}</p>
                  )}
                </div>
              </div>
            </div>
            {index < question.flow_completion.steps.length - 1 && (
              <div className="flex justify-center my-4">
                <ChevronDown className="w-6 h-6 text-gray-400" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FlowCompletion;
