import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import TestLayout from '../components/TestLayout';
import QuestionRenderer from '../components/questions/QuestionRenderer';
import type { BaseQuestion } from '../components/questions/types';
import { useLocation } from 'react-router-dom';


const ListeningTest = () => {
  const [currentPart, setCurrentPart] = useState(1);
  const location = useLocation();
  const sectionData = location.state?.sectionData;
  
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const currentPartData =  sectionData[`part${currentPart}`];

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  return (
    <TestLayout
      title="Listening Test"
      currentSection={`Part ${currentPart}`}
      totalTime={30}
      onBack={() => setCurrentPart((prev) => Math.max(1, prev - 1))}
      onNext={() => setCurrentPart((prev) => Math.min(4, prev + 1))}
      progress={(currentPart / 4) * 100}
    >
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold mb-2">{currentPartData.title}</h3>
          <p className="text-gray-600 mb-4">{currentPartData.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Questions: {currentPartData.questions_count}</span>
          </div>
        </div>

        <div className="space-y-8">
          {currentPartData.data.map((question: BaseQuestion) => (
            <div
              key={question[1].id}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <QuestionRenderer
                question_type={question[0]}
                question={question[1]}
                onAnswer={(answer) => handleAnswer(answer.question_id, answer.answers)}
                currentAnswer={answers[question[1].id]}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentPart((prev) => Math.max(1, prev - 1))}
            disabled={currentPart === 1}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" /> Previous Part
          </button>
          <button
            onClick={() => setCurrentPart((prev) => Math.min(4, prev + 1))}
            disabled={currentPart === 4}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
          >
            Next Part <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </TestLayout>
  );
};

export default ListeningTest;
