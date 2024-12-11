import { useLocation } from 'react-router-dom';
import { ArrowLeft, Award, Target, BookOpen, Headphones, PenLine, Mic } from 'lucide-react';
import SectionScore from '../components/scores/SectionScore';
import SpeakingFeedback from '../components/scores/SpeakingFeedback';
import { useNavigate } from 'react-router-dom';
import WritingFeedback from '../components/scores/WritingFeedback';

const ScoreScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const scoreData = location.state?.scoreData;

  if (!scoreData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Score Data Available</h2>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Back to Tests
          </button>
        </div>
      </div>
    );
  }


  const getSectionIcon = (section: string) => {
    switch (section) {
      case 'listening':
        return <Headphones className="w-6 h-6 text-blue-500" />;
      case 'reading':
        return <BookOpen className="w-6 h-6 text-green-500" />;
      case 'writing':
        return <PenLine className="w-6 h-6 text-yellow-500" />;
      case 'speaking':
        return <Mic className="w-6 h-6 text-purple-500" />;
      default:
        return null;
    }
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

          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-8 mb-8 text-white">
            <div className="flex items-center gap-4 mb-6">
              <Award className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Test Results</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 lg:col-span-1">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="w-6 h-6" />
                  <h3 className="text-lg font-semibold">Overall Band Score</h3>
                </div>
                <p className="text-5xl font-bold">{scoreData.band}</p>
              </div>
              {['listening', 'reading', 'writing', 'speaking'].map((section) => (
                <div
                  key={section}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    {getSectionIcon(section)}
                    <h3 className="text-lg font-semibold capitalize">{section}</h3>
                  </div>
                  <p className="text-4xl font-bold">
                    {scoreData[section] 
                      ? section === 'speaking' || section === 'writing' 
                        ? scoreData[section].band.toFixed(1)
                        : Math.round((scoreData[section].actual_score / scoreData[section].total_score) * 9)
                      : 'N/A'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {['listening', 'reading'].map((section) => (
            scoreData[section] && (
              <SectionScore
                key={section}
                title={section}
                sectionData={scoreData[section]}
              />
            )
          ))}

          {scoreData.speaking && (
            <SpeakingFeedback
              band={scoreData.speaking.band}
              partScores={scoreData.speaking.part_scores}
            />
          )}

        {scoreData.writing && (
            <WritingFeedback
              band={scoreData.writing.band}
              partScores={scoreData.writing.part_scores}
            />
          )}
          {/* {scoreData.writing && (
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Writing Evaluation</h2>
              <p className="text-gray-600">
                Your Writing responses are being evaluated by our assessment system.
                Results will be available soon.
              </p>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ScoreScreen;