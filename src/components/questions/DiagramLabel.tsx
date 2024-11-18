import React from 'react';
import type { DiagramLabelQuestion } from './types';

interface Props {
  question: DiagramLabelQuestion;
  onAnswer: (answers: Record<string, string>) => void;
  answers: Record<string, string>;
}

const DiagramLabel: React.FC<Props> = ({ question, onAnswer, answers }) => {
  const handleLabelChange = (labelId: string, value: string) => {
    onAnswer({ ...answers, [labelId]: value });
  };

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium">{question.question}</p>
      <div className="relative">
        <img src={question.imageUrl} alt="Diagram" className="max-w-full h-auto" />
        {question.labels.map((label) => (
          <input
            key={label.id}
            type="text"
            value={answers[label.id] || ''}
            onChange={(e) => handleLabelChange(label.id, e.target.value)}
            className="absolute w-24 text-sm px-2 py-1 border rounded bg-white"
            style={{ left: `${label.x}%`, top: `${label.y}%` }}
            placeholder="Label..."
          />
        ))}
      </div>
    </div>
  );
};

export default DiagramLabel;