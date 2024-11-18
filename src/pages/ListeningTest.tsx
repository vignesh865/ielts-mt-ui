import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import TestLayout from '../components/TestLayout';
import QuestionRenderer from '../components/questions/QuestionRenderer';
import type { BaseQuestion } from '../components/questions/types';

const ListeningTest = () => {
  const [currentPart, setCurrentPart] = useState(1);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const parts = [
    {
      part: 1,
      title: 'Social Needs',
      description: 'A conversation between two people discussing everyday social context.',
      questions: [
        {
          id: 'l1q1',
          type: 'MULTIPLE_CHOICE',
          question: 'What is the main purpose of the speaker\'s visit?',
          choices: [
            { id: 'a', text: 'To register for a gym membership' },
            { id: 'b', text: 'To inquire about fitness classes' },
            { id: 'c', text: 'To cancel their membership' },
            { id: 'd', text: 'To book a personal trainer' }
          ],
          correctAnswers: ['a']
        },
        {
          id: 'l1q2',
          type: 'NOTE_COMPLETION',
          question: 'Complete the membership form with the correct information.',
          text: 'Name: _ \nMembership Type: _ \nDuration: _ \nPayment Method: _',
          blanks: 4,
          choices: [
            { id: '1', text: '12 months' },
            { id: '2', text: 'Premium' },
            { id: '3', text: 'Credit Card' },
            { id: '4', text: 'John Smith' }
          ]
        },
        {
          id: 'l1q3',
          type: 'T_F_NG',
          question: 'The gym offers a free trial period.',
          correctAnswer: 'T'
        },
        // Add more questions to total 10
      ]
    },
    {
      part: 2,
      title: 'Public Information',
      description: 'A monologue set in an everyday social context.',
      questions: [
        {
          id: 'l2q1',
          type: 'TABLE_COMPLETION',
          question: 'Complete the train schedule with the correct times and platforms.',
          text: 'London to Manchester\nDeparture: _\nPlatform: _\nArrival: _\nService Type: _',
          blanks: 4
        },
        {
          id: 'l2q2',
          type: 'MATCHING_FEATURES',
          question: 'Match the services with their locations in the station.',
          features: [],
          statements: ['Ticket Office', 'Information Desk', 'Lost Property'],
          matches: ['Platform 1', 'Main Entrance', 'Lower Level']
        },
        // Add more questions to total 10
      ]
    },
    {
      part: 3,
      title: 'Educational Context',
      description: 'A conversation between up to four people set in an educational context.',
      questions: [
        {
          id: 'l3q1',
          type: 'SINGLE_CHOICE',
          question: 'What is the main topic of the group project?',
          choices: [
            { id: 'a', text: 'Environmental Science' },
            { id: 'b', text: 'World History' },
            { id: 'c', text: 'Literature Analysis' },
            { id: 'd', text: 'Economic Theory' }
          ],
          correctAnswer: 'a'
        },
        {
          id: 'l3q2',
          type: 'FLOW_COMPLETION',
          question: 'Complete the project timeline with the correct stages.',
          text: 'Research Phase: _\nData Collection: _\nAnalysis: _\nPresentation: _',
          blanks: 4
        },
        // Add more questions to total 10
      ]
    },
    {
      part: 4,
      title: 'Academic Topic',
      description: 'A monologue on an academic subject.',
      questions: [
        {
          id: 'l4q1',
          type: 'DIAGRAM_LABEL_COMPLETION',
          question: 'Label the parts of the cell structure.',
          imageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          labels: [
            { id: 'l1', x: 25, y: 25 },
            { id: 'l2', x: 50, y: 50 },
            { id: 'l3', x: 75, y: 75 }
          ]
        },
        {
          id: 'l4q2',
          type: 'SHORT_ANSWER',
          question: 'Explain the process of photosynthesis in plants.',
          maxWords: 50
        },
        // Add more questions to total 10
      ]
    }
  ];

  const currentPartData = parts[currentPart - 1];

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  return (
    <TestLayout
      title="Listening Test"
      currentSection={`Part ${currentPart}`}
      totalTime={30}
      onBack={() => setCurrentPart((prev) => Math.max(1, prev - 1))}
      onNext={() => setCurrentPart((prev) => Math.min(4, prev + 1))}
      progress={(currentPart / 4) * 100}
    >
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold mb-2">{currentPartData.title}</h3>
          <p className="text-gray-600 mb-4">{currentPartData.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Questions: {currentPartData.questions.length}</span>
            <span>Time: {Math.round(30 / 4)} minutes</span>
          </div>
        </div>

        <div className="space-y-8">
          {currentPartData.questions.map((question: BaseQuestion) => (
            <div key={question.id} className="bg-white p-6 rounded-xl shadow-sm">
              <QuestionRenderer
                question={question}
                onAnswer={(answer) => handleAnswer(question.id, answer)}
                currentAnswer={answers[question.id]}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentPart((prev) => Math.max(1, prev - 1))}
            disabled={currentPart === 1}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" /> Previous Part
          </button>
          <button
            onClick={() => setCurrentPart((prev) => Math.min(4, prev + 1))}
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