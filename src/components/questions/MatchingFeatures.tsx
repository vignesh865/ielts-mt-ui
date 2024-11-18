import React from 'react';
import type { MatchingFeaturesQuestion } from './types';

interface Props {
  question: MatchingFeaturesQuestion;
  onAnswer: (matches: Record<string, string>) => void;
  selectedMatches: Record<string, string>;
}

const MatchingFeatures: React.FC<Props> = ({ question, onAnswer, selectedMatches }) => {
  const handleMatch = (statementId: string, matchId: string) => {
    onAnswer({ ...selectedMatches, [statementId]: matchId });
  };

  return (
    <div className="space-y-6">
      <p className="text-lg font-medium">{question.question}</p>
      
      <div className="grid gap-6">
        {question.statements.map((statement, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <p className="text-gray-700">{statement}</p>
            <select
              value={selectedMatches[index] || ''}
              onChange={(e) => handleMatch(String(index), e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
            >
              <option value="">Select a match</option>
              {question.matches.map((match, matchIndex) => (
                <option key={matchIndex} value={match}>
                  {match}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchingFeatures;