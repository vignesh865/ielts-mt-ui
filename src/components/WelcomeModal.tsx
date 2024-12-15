import React from 'react';

interface WelcomeModalProps {
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full mx-4">
      <h2 className="text-lg font-bold mb-2">Welcome to IELTS Mock!</h2>
      <p className="text-sm mb-4">
        This application is currently in beta testing stage. 
        Your feedback will be very much appreciated. 
        Please provide feedback after use.
      </p>
      <button 
        onClick={onClose} 
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Close
      </button>
    </div>
  </div>
);

export default WelcomeModal;
