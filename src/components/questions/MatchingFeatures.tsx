import React from 'react';
import type { MatchingFeaturesQuestion } from './types';

interface Props {
  question: MatchingFeaturesQuestion;
  onAnswer: (answer: { question_id: string; answers: Record<number, number> }) => void;
  selectedAnswers: Record<number, number>;
}

const MatchingFeatures: React.FC<Props> = ({ question, onAnswer, selectedAnswers }) => {
  const handleSelection = (statementIndex: number, optionIndex: number) => {
    const newAnswers = {
      ...selectedAnswers,
      [statementIndex]: optionIndex,
    };

    onAnswer({
      question_id: question.id,
      answers: newAnswers,
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-3">Options Reference</h4>
        <div className="grid grid-cols-2 gap-4">
          {question.options.map((option) => (
            <div key={option.index} className="flex items-center space-x-2">
              <span className="font-mono bg-white px-2 py-1 rounded border">
                {option.index}
              </span>
              <span className="text-gray-700">{option.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-4 border-b-2 border-gray-200 bg-gray-50 text-left w-2/3">
                Statements
              </th>
              {question.options.map((option) => (
                <th
                  key={option.index}
                  className="p-4 border-b-2 border-gray-200 bg-gray-50 text-center w-16"
                >
                  {option.index}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {question.statements.map((statement, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-200">
                <td className="p-4 align-middle">
                  <span className="font-medium text-gray-900">
                    {rowIndex + 1}.{' '}
                  </span>
                  {statement.statement}
                </td>
                {question.options.map((option) => (
                  <td key={option.index} className="p-4 text-center">
                    <label className="inline-flex items-center justify-center">
                      <input
                        type="radio"
                        name={`statement-${rowIndex}`}
                        checked={selectedAnswers[rowIndex] === option.index}
                        onChange={() => handleSelection(rowIndex, option.index)}
                        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      />
                    </label>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-sm text-gray-500">
        Selected {Object.keys(selectedAnswers).length} of {question.statements.length} statements
      </div>
    </div>
  );
};

export default MatchingFeatures;
