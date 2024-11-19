import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Headphones, BookOpen, PenLine, Mic } from 'lucide-react';
import TestSection from '../components/TestSection';

function TestSections() {
  const navigate = useNavigate();
  const { testId } = useParams();
  const [activeSection, setActiveSection] = React.useState<string>('listening');

  const sections = [
    {
      id: 'listening',
      title: 'Listening Test',
      icon: <Headphones className="w-6 h-6" />,
      duration: '30 minutes',
      description: 'Listen to four recordings and answer questions',
    },
    {
      id: 'reading',
      title: 'Reading Test',
      icon: <BookOpen className="w-6 h-6" />,
      duration: '60 minutes',
      description: 'Read three passages and answer questions',
    },
    {
      id: 'writing',
      title: 'Writing Test',
      icon: <PenLine className="w-6 h-6" />,
      duration: '60 minutes',
      description: 'Complete two writing tasks',
    },
    {
      id: 'speaking',
      title: 'Speaking Test',
      icon: <Mic className="w-6 h-6" />,
      duration: '11-14 minutes',
      description: 'Face-to-face interview with an examiner',
    },
  ];

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    navigate(`/test/${testId}/${sectionId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Tests
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-8">Select Test Section</h1>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
        </div>
      </div>
    </div>
  );
}

export default TestSections;