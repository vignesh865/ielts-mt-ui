import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import TestLayout from '../components/TestLayout';
import QuestionRenderer from '../components/questions/QuestionRenderer';
import type { BaseQuestion } from '../components/questions/types';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'

const ReadingTest = () => {
  const [currentPart, setCurrentPart] = useState(1);
  const location = useLocation();
  const testId = location.state?.testId;
  const sectionData = location.state?.sectionData;
  
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const currentPartData = sectionData[`part${currentPart}`];

  const handleAnswer = (questionId: string, answer: any) => {
    const updatedAnswers = {
      ...answers,
      [questionId]: answer,
    };
    setAnswers(updatedAnswers);

    localStorage.setItem(
      `test_${testId}_reading`,
      JSON.stringify(updatedAnswers)
    );
  };

  return (
    <TestLayout
      title="Reading Test"
      currentSection={`Passage ${currentPart}`}
      totalTime={60}
      onBack={() => setCurrentPart((prev) => Math.max(1, prev - 1))}
      onNext={() => setCurrentPart((prev) => Math.min(3, prev + 1))}
      progress={(currentPart / 3) * 100}
    >
      <div className="space-y-2">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold mb-2">{currentPartData.title}</h3>
          <p className="text-gray-600 mb-4">{currentPartData.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Questions: {currentPartData.questions_count}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white p-6 rounded-xl shadow-sm h-[calc(200vh-300px)] overflow-y-auto">
            <div className="prose max-w-none">
              <h4 className="text-lg font-semibold mb-4">Reading Passage</h4>
              <ReactMarkdown className="whitespace-pre-line"
               children={currentPartData?.passage?.text || ''}
               remarkPlugins={[remarkGfm]}/> 
            </div>
          </div>

          <div className="space-y-2 h-[calc(200vh-300px)] overflow-y-auto pr-2">
            {currentPartData.data.map((question: BaseQuestion, index: number) => (
              <div
                key={question[1].id}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-500">
                    Question {index + 1}
                  </span>
                </div>
                <QuestionRenderer
                  question_type={question[0]}
                  question={question[1]}
                  onAnswer={(answer) => handleAnswer(answer.question_id, answer.answers)}
                  currentAnswer={answers[question[1].id]}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentPart((prev) => Math.max(1, prev - 1))}
            disabled={currentPart === 1}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" /> Previous Passage
          </button>
          <button
            onClick={() => setCurrentPart((prev) => Math.min(3, prev + 1))}
            disabled={currentPart === 3}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
          >
            Next Passage <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </TestLayout>
  );
};

export default ReadingTest;
