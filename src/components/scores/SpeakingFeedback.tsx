import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Mic, AlertCircle } from 'lucide-react';

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
    <div className="mb-6 last:mb-0 bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h5 className="font-medium text-gray-900">{title}</h5>
        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full font-semibold">
          Band {score.toFixed(1)}
        </span>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">{feedback}</p>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <Mic className="w-7 h-7 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-900">Speaking Evaluation</h2>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded mb-6">
        <div className="flex gap-2">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-700">
            Note: Individual part and task band scores are provided for your understanding of performance in specific areas. 
            In the actual IELTS test, only an overall speaking band score is awarded.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {partScores.map((part, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => togglePart(index)}
              className={`w-full px-6 py-4 flex items-center justify-between transition-colors ${
                expandedPart === index ? 'bg-indigo-50' : 'bg-gray-50 hover:bg-gray-100'
              }`}
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
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-gray-400" />
                    Pronunciation evaluation will be included in future updates
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