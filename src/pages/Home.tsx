import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Mic, PenLine, Headphones, Clock } from 'lucide-react';
import TestSection from '../components/TestSection';

function Home() {
  const [activeSection, setActiveSection] = useState<string>('listening');
  const navigate = useNavigate();

  const sections = [
    {
      id: 'listening',
      title: 'Listening Test',
      icon: <Headphones className="w-6 h-6" />,
      duration: '30 minutes',
      description: 'Listen to four recordings and answer questions based on what you hear.',
    },
    {
      id: 'reading',
      title: 'Reading Test',
      icon: <BookOpen className="w-6 h-6" />,
      duration: '60 minutes',
      description: 'Read three passages and answer various question types.',
    },
    {
      id: 'writing',
      title: 'Writing Test',
      icon: <PenLine className="w-6 h-6" />,
      duration: '60 minutes',
      description: 'Complete two writing tasks: a report and an essay.',
    },
    {
      id: 'speaking',
      title: 'Speaking Test',
      icon: <Mic className="w-6 h-6" />,
      duration: '11-14 minutes',
      description: 'Participate in a face-to-face interview with an examiner.',
    },
  ];

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    navigate(`/${sectionId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">IELTS Test Suite</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Welcome to your IELTS test preparation portal. Select a section below to begin your
              practice session.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {sections.map((section) => (
              <TestSection
                key={section.id}
                title={section.title}
                icon={section.icon}
                duration={section.duration}
                description={section.description}
                isActive={activeSection === section.id}
                onClick={() => handleSectionClick(section.id)}
              />
            ))}
          </div>

          <div className="mt-8 p-6 bg-white rounded-xl shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <Clock className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Total Test Duration</h3>
                <p className="text-gray-600">2 hours 45 minutes (excluding Speaking Test)</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              The Speaking test may be taken up to 7 days before or after the other tests.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;