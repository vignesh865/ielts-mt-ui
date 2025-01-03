import { BlogMetadata } from '../types/blog';
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

export const fetchBlogMetadata = async (): Promise<BlogMetadata[]> => {
  const response = await fetch(`https://ieltsblog.s3.us-east-1.amazonaws.com/metadata.json`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'anyvalue',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }
  const metadata_obj: {"metadata": BlogMetadata[]} = await response.json()
  return metadata_obj["metadata"];
}; 

export const fetchBlog = async (postId: string): Promise<string> => {
  const response = await fetch(`https://ieltsblog.s3.us-east-1.amazonaws.com/${postId}.md`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'anyvalue',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }
  return response.text();
}; 
