import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Feedback {
  fluence_and_coherence: number;
  fluence_and_coherence_feedback: string;
  lexical_resource: number;
  lexical_resource_feedback: string;
  grammatical_range_and_accuracy: number;
  grammatical_range_and_accuracy_feedback: string;
}

interface PartScore {
  band: number;
  feedback: Feedback | null;
}

interface SpeakingFeedbackProps {
  band: number;
  partScores: PartScore[];
}

const SpeakingFeedback: React.FC<SpeakingFeedbackProps> = ({ band, partScores }) => {
  const [expandedPart, setExpandedPart] = useState<number | null>(null);

  const togglePart = (index: number) => {
    setExpandedPart(expandedPart === index ? null : index);
  };

  const renderFeedbackSection = (title: string, score: number, feedback: string) => (
    <div className="mb-4 last:mb-0">
      <div className="flex items-center justify-between mb-2">
        <h5 className="font-medium text-gray-900">{title}</h5>
        <span className="text-lg font-semibold text-indigo-600">{score.toFixed(1)}</span>
      </div>
      <p className="text-gray-600 text-sm">{feedback}</p>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Speaking Evaluation</h2>
        <div className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
          Overall Band: {band.toFixed(1)}
        </div>
      </div>

      <div className="space-y-4">
        {partScores.map((part, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => togglePart(index)}
              className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
            >
              <div>
                <h3 className="text-lg font-semibold">Part {index + 1}</h3>
                {part.band > 0 && (
                  <p className="text-sm text-gray-600">Band Score: {part.band.toFixed(1)}</p>
                )}
              </div>
              {expandedPart === index ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {expandedPart === index && part.feedback && (
              <div className="p-6 space-y-6 border-t">
                {renderFeedbackSection(
                  "Fluency and Coherence",
                  part.feedback.fluence_and_coherence,
                  part.feedback.fluence_and_coherence_feedback
                )}
                {renderFeedbackSection(
                  "Lexical Resource",
                  part.feedback.lexical_resource,
                  part.feedback.lexical_resource_feedback
                )}
                {renderFeedbackSection(
                  "Grammatical Range and Accuracy",
                  part.feedback.grammatical_range_and_accuracy,
                  part.feedback.grammatical_range_and_accuracy_feedback
                )}
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Note: Pronunciation evaluation will be included in future updates.
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpeakingFeedback;