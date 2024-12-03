import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Play } from 'lucide-react';
import TestLayout from '../components/TestLayout';
import { parts } from '../data/speakingParts';
import SpeakingModal from '../components/speaking/SpeakingModal';
import SpeakingTaskTwoModal from '../components/speaking/SpeakingTaskTwoModal';
import { useLocation } from 'react-router-dom';

const SpeakingTest = () => {
  const [currentPart, setCurrentPart] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const sectionData = location.state?.sectionData;

  const currentPartData = parts[currentPart - 1];
  const speakingData = sectionData?.[`part${currentPart}`];

  return (
    <TestLayout
      title="Speaking Test"
      currentSection={`Part ${currentPart}`}
      totalTime={14}
      onBack={() => setCurrentPart((prev) => Math.max(1, prev - 1))}
      onNext={() => setCurrentPart((prev) => Math.min(3, prev + 1))}
      progress={(currentPart / 3) * 100}
    >
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold mb-2">{currentPartData.title}</h3>
          <p className="text-gray-600 mb-4">{currentPartData.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Duration: {currentPartData.timeLimit} minutes</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="space-y-4">
            <h4 className="font-semibold">Instructions</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Listen carefully to each question</li>
              <li>Speak clearly and at a natural pace</li>
              <li>Use a range of vocabulary and grammatical structures</li>
              <li>Provide detailed responses</li>
              <li>Stay on topic and answer the questions directly</li>
            </ul>
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Play className="w-5 h-5" />
                Start Speaking Test
              </button>
            </div>
          </div>
        </div>

        {currentPart === 1 && speakingData && (
          <SpeakingModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            audioUrls={speakingData.audio.map((a: any) => a.download_url)}
            speakingTime={speakingData.speaking_time}
          />
        )}

        {currentPart === 2 && speakingData && (
          <SpeakingTaskTwoModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            taskCard={speakingData.data.task_card}
            pointsToInclude={speakingData.data.points_to_be_included}
            audioUrls={speakingData.audio.map((a: any) => a.download_url)}
            speakingTime={speakingData.speaking_time}
          />
        )}

        {currentPart === 3 && speakingData && (
          <SpeakingModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            audioUrls={speakingData.audio.map((a: any) => a.download_url)}
            speakingTime={speakingData.speaking_time}
          />
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentPart((prev) => Math.max(1, prev - 1))}
            disabled={currentPart === 1}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" /> Previous Part
          </button>
          <button
            onClick={() => setCurrentPart((prev) => Math.min(3, prev + 1))}
            disabled={currentPart === 3}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
          >
            Next Part <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </TestLayout>
  );
};

export default SpeakingTest;