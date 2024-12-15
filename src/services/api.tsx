import { Test } from '../types/test';

const API_HOST = import.meta.env.VITE_API_HOST;

export const fetchTest = async (testId: string): Promise<Test> => {
  const response = await fetch(`${API_HOST}/ielts/test/${testId}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'anyvalue',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch test details');
  }
  return response.json();
};

export const submitTest = async (testId: string, answers: any) => {

  const response = await fetch(`${API_HOST}/ielts/test/${testId}/score`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'anyvalue',
    },
    body: JSON.stringify(answers),
  });
  
  if (!response.ok) {
    throw new Error('Failed to submit test');
  }
  
  return response.json();
};

export const submitFeedback = async (feedbackData: any) => {
  const response = await fetch(`${API_HOST}/user/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'anyvalue',
    },
    body: JSON.stringify(feedbackData),
  });

  if (!response.ok) {
    throw new Error('Failed to submit feedback');
  }

  alert('Feedback submitted successfully!');
  return response.json();
};