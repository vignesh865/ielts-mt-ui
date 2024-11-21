import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Headphones, BookOpen, PenLine, Mic } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import TestSection from '../components/TestSection';
import LoadingState from '../components/LoadingState';

interface TestDetails {
  test_id: string;
  test_name: string;
  test_type: 'GENERAL' | 'ACADEMIC';
  listening: boolean;
  reading: boolean;
  writing: boolean;
  speaking: boolean;
}

function TestSections() {
  const navigate = useNavigate();
  const { testId } = useParams() as { testId: string };
  const [activeSection, setActiveSection] = React.useState<string>('listening');
  const [completedSections, setCompletedSections] = React.useState<string[]>([]);
  const [showSubmitModal, setShowSubmitModal] = React.useState(false);

  const { data: testDetails, status } = useQuery<TestDetails>({
    queryKey: ['test', testId],
    queryFn: async () => {
      const host = import.meta.env.VITE_API_HOST;
      const response = await fetch(`${host}/ielts/${testId}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'anyvalue',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch test details');
      }
      return response.json();
    },
  });

  const sections = [
    {
      id: 'listening',
      title: 'Listening Test',
      icon: <Headphones className="w-6 h-6" />,
      duration: '30 minutes',
      description: 'Listen to four recordings and answer questions',
      enabled: testDetails?.listening,
    },
    {
      id: 'reading',
      title: 'Reading Test',
      icon: <BookOpen className="w-6 h-6" />,
      duration: '60 minutes',
      description: 'Read three passages and answer questions',
      enabled: testDetails?.reading,
    },
    {
      id: 'writing',
      title: 'Writing Test',
      icon: <PenLine className="w-6 h-6" />,
      duration: '60 minutes',
      description: 'Complete two writing tasks',
      enabled: testDetails?.writing,
    },
    {
      id: 'speaking',
      title: 'Speaking Test',
      icon: <Mic className="w-6 h-6" />,
      duration: '11-14 minutes',
      description: 'Face-to-face interview with an examiner',
      enabled: testDetails?.speaking,
    },
  ];

  React.useEffect(() => {
    const storedSections = localStorage.getItem(`test_${testId}_completed`);
    if (storedSections) {
      setCompletedSections(JSON.parse(storedSections));
    }
  }, [testId]);

  const handleSectionClick = (sectionId: string) => {
    if (!completedSections.includes(sectionId)) {
      setActiveSection(sectionId);
      navigate(`/test/${testId}/${sectionId}`);
    }
  };

  const handleSubmitTest = () => {
    setShowSubmitModal(true);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  if (status === 'pending') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <LoadingState message="Loading test details..." />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Test</h2>
          <p className="text-red-500 mb-4">Failed to load test details. Please try again.</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Tests
          </button>
        </div>
      </div>
    );
  }

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

          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{testDetails?.test_name}</h1>
              <p className="text-gray-600 mt-1">{testDetails?.test_type} Test</p>
            </div>
            <button
              onClick={handleSubmitTest}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Submit Test
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section) => (
              <TestSection
                key={section.id}
                title={section.title}
                icon={section.icon}
                duration={section.duration}
                description={section.description}
                isActive={activeSection === section.id}
                isDisabled={!section.enabled || completedSections.includes(section.id)}
                onClick={() => handleSectionClick(section.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {showSubmitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Test Submitted</h3>
            <p className="text-gray-600">Your test has been submitted successfully.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestSections;