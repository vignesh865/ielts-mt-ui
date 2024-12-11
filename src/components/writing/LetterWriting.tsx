import React from 'react';

interface LetterWritingProps {
  taskData: any;
  answer: string;
  onAnswerChange: (id: string, value: string) => void;
}

const LetterWriting: React.FC<LetterWritingProps> = ({
  taskData,
  answer,
  onAnswerChange,
}) => {
  const wordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="prose max-w-none">
          <h4 className="text-lg font-semibold mb-4">Writing Task</h4>
          <div className="whitespace-pre-line">{taskData?.data[1]?.question}</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-semibold">Your Response</h4>
            <span className="text-sm text-gray-500">
              Words: {wordCount(answer)} / 150
            </span>
          </div>
          <textarea
            value={answer}
            onChange={(e) => onAnswerChange(taskData?.data[1]?.id, e.target.value)}
            className="w-full h-[calc(100vh-400px)] p-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono"
            placeholder="Start writing your letter here..."
          />
        </div>
      </div>
    </div>
  );
};

export default LetterWriting;
