import React from 'react';
import type { NoteCompletionQuestion } from './types';

interface Props {
  question: NoteCompletionQuestion;
  onAnswer: (answer: { question_id: string; answers: string[] }) => void;
  answers: string[];
}

const NoteCompletion: React.FC<Props> = ({ question, onAnswer, answers }) => {
  const parts = question.note.blanked_note_text.split('$$$$');
  const blankCount = parts.length - 1;

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    onAnswer({
      question_id: question.id,
      answers: newAnswers,
    });
  };

  return (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <div className="space-y-4">
          {parts.map((part, index) => (
            <React.Fragment key={index}>
              <span style={{ whiteSpace: "pre-line" }}>{part}</span>
              {index < parts.length - 1 && (
                <input
                  type="text"
                  value={answers[index] || ''}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  className="mx-2 px-3 py-1 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none min-w-[80px]"
                //   placeholder={`Answer ${index + 1}`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="text-sm text-gray-500">
        Completed {answers.filter(Boolean).length} of {blankCount} blanks
      </div>
    </div>
  );
};

export default NoteCompletion;
