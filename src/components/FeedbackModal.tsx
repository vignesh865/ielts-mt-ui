import React, { useState } from 'react';
import { Star } from 'lucide-react'; // Assuming you're using lucide-react for icons
import { submitFeedback } from '../services/api';

const FeedbackModal = ({ isOpen, onClose }) => {
  const [feedbackData, setFeedbackData] = useState({
    speaking: 0,
    writing: 0,
    listening: 0,
    reading: 0,
    easeOfUse: 0,
    evaluation: 0,
    thoughts: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

  const handleStarClick = (metric, value) => {
    setFeedbackData((prevData) => ({
      ...prevData,
      [metric]: value,
    }));
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true); // Set loading state to true

    try {
      // Submit feedback to the API
      await submitFeedback(feedbackData);

      // Close the modal after successful submission
      onClose();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('An error occurred while submitting feedback. Please try again.');
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 md:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Feedback</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Speaking */}
            <div className="flex items-center space-x-4">
              <label className="block text-gray-700 text-sm font-bold">
                Speaking:
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 cursor-pointer ${
                      feedbackData.speaking >= star ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                    onClick={() => handleStarClick('speaking', star)}
                  />
                ))}
              </div>
            </div>

            {/* Writing */}
            <div className="flex items-center space-x-4">
              <label className="block text-gray-700 text-sm font-bold">
                Writing:
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 cursor-pointer ${
                      feedbackData.writing >= star ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                    onClick={() => handleStarClick('writing', star)}
                  />
                ))}
              </div>
            </div>

            {/* Listening */}
            <div className="flex items-center space-x-4">
              <label className="block text-gray-700 text-sm font-bold">
                Listening:
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 cursor-pointer ${
                      feedbackData.listening >= star ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                    onClick={() => handleStarClick('listening', star)}
                  />
                ))}
              </div>
            </div>

            {/* Reading */}
            <div className="flex items-center space-x-4">
              <label className="block text-gray-700 text-sm font-bold">
                Reading:
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 cursor-pointer ${
                      feedbackData.reading >= star ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                    onClick={() => handleStarClick('reading', star)}
                  />
                ))}
              </div>
            </div>

            {/* Ease of Use */}
            <div className="flex items-center space-x-4">
              <label className="block text-gray-700 text-sm font-bold">
                Ease of Use:
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 cursor-pointer ${
                      feedbackData.easeOfUse >= star ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                    onClick={() => handleStarClick('easeOfUse', star)}
                  />
                ))}
              </div>
            </div>

            {/* Evaluation */}
            <div className="flex items-center space-x-4">
              <label className="block text-gray-700 text-sm font-bold">
                Evaluation:
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 cursor-pointer ${
                      feedbackData.evaluation >= star ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                    onClick={() => handleStarClick('evaluation', star)}
                  />
                ))}
              </div>
            </div>

            {/* Your Thoughts */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Your Thoughts:
              </label>
              <textarea
                name="thoughts"
                value={feedbackData.thoughts}
                onChange={handleTextChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="4"
                placeholder="Share your thoughts..."
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-6 space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center justify-center ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-700'
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit Feedback'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;