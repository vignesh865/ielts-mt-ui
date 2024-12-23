import React from 'react';
import type { TableCompletionQuestion } from './types';

interface Props {
  question: TableCompletionQuestion;
  onAnswer: (answer: { question_id: string; answers: string[] }) => void;
  answers: string[];
}

const TableCompletion: React.FC<Props> = ({ question, onAnswer, answers }) => {
  const indexMap: { [key: string]: number } = {};
  let blankCounter = 0; // External variable to track blanks


  const handleAnswerChange = (rowIndex: number, cellIndex: number, value: string) => {
    const flatIndex = getAnswerIndex(rowIndex, cellIndex);
    const newAnswers = [...answers];
    newAnswers[flatIndex] = value;
    
    onAnswer({
      question_id: question.id,
      answers: newAnswers,
    });
  };

  const getAnswerIndex = (rowIndex: number, cellIndex: number) => {
    return indexMap[getAnswerIndexKey(rowIndex, cellIndex)];
  };

  const getAnswerIndexKey = (rowIndex: number, cellIndex: number) => {
    return `${rowIndex}-${cellIndex}`;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-4 border border-gray-200 bg-gray-50"></th>
            {question.table_completion.column_headers.map((header, index) => (
              <th key={index} className="p-4 border border-gray-200 bg-gray-50 font-medium text-gray-900">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {question.table_completion.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="p-4 border border-gray-200 bg-gray-50 font-medium text-gray-900">
                {question.table_completion.row_headers[rowIndex]}
              </td>
              {row.cells.map((cell, cellIndex) => {
                const parts = cell.text.split('$$$$');
                const hasBlank = parts.length > 1;

                if (hasBlank) {
                  indexMap[getAnswerIndexKey(rowIndex, cellIndex)] = blankCounter++;
                }
                const flatIndex = getAnswerIndex(rowIndex, cellIndex);

                return (
                  <td key={cellIndex} className="p-4 border border-gray-200">
                    {hasBlank ? (
                      <div className="flex items-center gap-2">
                        {parts.map((part, partIndex) => (
                          
                          <React.Fragment key={partIndex}>
                            <span>{part}</span>
                            {partIndex < parts.length - 1 && (
                              
                              <input
                                type="text"
                                value={answers[flatIndex] || ''}
                                onChange={(e) => handleAnswerChange(rowIndex, cellIndex, e.target.value)}
                                className="px-3 py-1 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none min-w-[120px] bg-gray-50"
                                placeholder="Enter answer..."
                              />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    ) : (
                      <span>{cell.text}</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableCompletion;
