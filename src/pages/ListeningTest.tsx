import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import TestLayout from '../components/TestLayout';
import QuestionRenderer from '../components/questions/QuestionRenderer';
import AudioPlayer from '../components/AudioPlayer';
import type { BaseQuestion } from '../components/questions/types';
import { useLocation } from 'react-router-dom';

const ListeningTest = () => {
  const [currentPart, setCurrentPart] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isPartGlowing, setIsPartGlowing] = useState(false);
  const [isQuestionGlowing, setIsQuestionGlowing] = useState(false);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [shouldPlayAudio, setShouldPlayAudio] = useState(false);
  const location = useLocation();
  const sectionData = location.state?.sectionData;
  const timeoutRef = useRef<NodeJS.Timeout>();

  const [answers, setAnswers] = useState<Record<string, any>>({});

  const currentPartData = sectionData[`part${currentPart}`];
  const currentAudioUrl = currentPartData?.audio?.[currentAudioIndex]?.download_url;

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const startNextQuestionSequence = () => {
    if (currentQuestionIndex < currentPartData.data.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setIsQuestionGlowing(true);
      timeoutRef.current = setTimeout(() => {
        setIsQuestionGlowing(false);
        setShouldPlayAudio(true);
      }, 30000);
    }
  };

  const handleAudioEnd = () => {
    setShouldPlayAudio(false);
    if (currentAudioIndex < currentPartData.audio.length - 1) {
      setCurrentAudioIndex(prev => prev + 1);
      startNextQuestionSequence();
    }
  };

  useEffect(() => {
    if (currentPartData) {
      // Reset states
      setIsPartGlowing(false);
      setIsQuestionGlowing(false);
      setShouldPlayAudio(false);
      setCurrentQuestionIndex(0);
      setCurrentAudioIndex(0);

      // Start sequence
      setIsPartGlowing(true);
      timeoutRef.current = setTimeout(() => {
        setIsPartGlowing(false);
        setIsQuestionGlowing(true);
        timeoutRef.current = setTimeout(() => {
          setIsQuestionGlowing(false);
          setShouldPlayAudio(true);
        }, 30000);
      }, 15000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentPart]);

  const handlePartChange = (newPart: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setCurrentPart(newPart);
  };

  return (
    <TestLayout
      title="Listening Test"
      currentSection={`Part ${currentPart}`}
      totalTime={30}
      onBack={() => handlePartChange(Math.max(1, currentPart - 1))}
      onNext={() => handlePartChange(Math.min(4, currentPart + 1))}
      progress={(currentPart / 4) * 100}
    >
      <div className="space-y-6">
        <AudioPlayer
          audioUrl={currentAudioUrl}
          onEnded={handleAudioEnd}
          autoPlay={shouldPlayAudio}
        />

        <div className={`bg-white p-6 rounded-xl shadow-sm transition-all duration-300 ${
          isPartGlowing ? 'ring-2 ring-indigo-500 ring-opacity-50' : ''
        }`}>
          <h3 className="text-xl font-bold mb-2">{currentPartData.title}</h3>
          <p className="text-gray-600 mb-4">{currentPartData.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Part Instructions</span>
            <span>Questions: {currentPartData.questions_count}</span>
          </div>
        </div>

        <div className="space-y-8">
          {currentPartData.data.map((question: BaseQuestion, index: number) => (
            <div
              key={question[1].id}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <QuestionRenderer
                question_type={question[0]}
                question={question[1]}
                onAnswer={(answer) =>
                  handleAnswer(answer.question_id, answer.answers)
                }
                currentAnswer={answers[question[1].id]}
                isInstructionsGlowing={isQuestionGlowing && index === currentQuestionIndex}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => handlePartChange(Math.max(1, currentPart - 1))}
            disabled={currentPart === 1}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" /> Previous Part
          </button>
          <button
            onClick={() => handlePartChange(Math.min(4, currentPart + 1))}
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
