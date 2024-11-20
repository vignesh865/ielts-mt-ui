import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Headphones, BookOpen, PenLine, Mic } from 'lucide-react';
import TestSection from '../components/TestSection';

function TestSections() {
  const navigate = useNavigate();
  const { testId } = useParams();
  const [activeSection, setActiveSection] = React.useState<string>('listening');
  const [completedSections, setCompletedSections] = React.useState<string[]>([]);
  const [showSubmitModal, setShowSubmitModal] = React.useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Select Test Section</h1>
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
                isDisabled={completedSections.includes(section.id)}
                onClick={() => handleSectionClick(section.id)}
              />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <button
              onClick={handleSubmitTest}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-medium"
            >
              Submit Test
            </button>
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