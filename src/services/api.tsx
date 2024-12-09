import { Test } from '../types/test';
import { base64ToBlob } from '../utils/blobUtils';

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
