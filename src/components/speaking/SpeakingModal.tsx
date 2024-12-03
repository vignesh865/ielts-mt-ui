import React, { useState, useEffect, useRef } from 'react';
import { Mic, X, ChevronRight } from 'lucide-react';
import AudioPlayer from '../AudioPlayer';
import Timer from './Timer';

interface SpeakingModalProps {
  isOpen: boolean;
  onClose: () => void;
  audioUrls: string[];
  speakingTime: number;
}

const SpeakingModal: React.FC<SpeakingModalProps> = ({
  isOpen,
  onClose,
  audioUrls,
  speakingTime,
}) => {
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [canRecord, setCanRecord] = useState(false);
  const [recordings, setRecordings] = useState<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal is closed
      setCurrentAudioIndex(0);
      setIsRecording(false);
      setCanRecord(false);
      setRecordings([]);
      stopRecording();
    }
  }, [isOpen]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/mp3' });
        setRecordings(prev => [...prev, blob]);
        chunksRef.current = [];
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    setIsRecording(false);
  };

  const handleAudioEnd = () => {
    setCanRecord(true);
    setTimeout(() => {
      startRecording();
    }, 1000);
  };

  const handleTimerEnd = () => {
    stopRecording();
    moveToNextQuestion();
  };

  const moveToNextQuestion = () => {
    setCanRecord(false);
    if (currentAudioIndex < audioUrls.length - 1) {
      setCurrentAudioIndex(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handleNextClick = () => {
    stopRecording();
    moveToNextQuestion();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="space-y-6">
          <h3 className="text-xl font-bold text-center">
            Question {currentAudioIndex + 1}
          </h3>

          <AudioPlayer
            audioUrl={audioUrls[currentAudioIndex]}
            onEnded={handleAudioEnd}
            autoPlay={true}
          />

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-6">
              <div
                className={`p-4 rounded-full ${
                  isRecording
                    ? 'bg-red-500 animate-pulse'
                    : canRecord
                    ? 'bg-indigo-600'
                    : 'bg-gray-300'
                }`}
              >
                <Mic className="w-6 h-6 text-white" />
              </div>
              {canRecord && (
                <button
                  onClick={handleNextClick}
                  className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              )}
            </div>
            {isRecording && (
              <Timer 
                duration={speakingTime} 
                onTimeEnd={handleTimerEnd}
                label="Recording"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakingModal;
