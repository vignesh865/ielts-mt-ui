import { useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SectionScore from '../components/scores/SectionScore';
import SpeakingFeedback from '../components/scores/SpeakingFeedback';
import { useNavigate } from 'react-router-dom';

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

  const calculateOverallScore = () => {
    let totalScore = 0;
    let actualScore = 0;
    let sections = 0;

    ['listening', 'reading', 'writing', 'speaking'].forEach(section => {
      if (scoreData[section]) {
        if (section === 'speaking') {
          totalScore += 9;
          actualScore += scoreData[section].band;
        } else {
          totalScore += scoreData[section].total_score;
          actualScore += scoreData[section].actual_score;
        }
        sections++;
      }
    });

    return sections > 0 ? Math.round((actualScore / totalScore) * 9) : 0;
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

          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Test Results</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Overall Band Score</h3>
                <p className="text-4xl font-bold">{calculateOverallScore()}</p>
              </div>
              {['listening', 'reading', 'writing', 'speaking'].map((section) => (
                <div
                  key={section}
                  className="bg-gray-50 rounded-xl p-6"
                >
                  <h3 className="text-lg font-semibold mb-2 capitalize">{section}</h3>
                  <p className="text-4xl font-bold text-gray-900">
                    {scoreData[section] 
                      ? section === 'speaking'
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
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Writing Evaluation</h2>
              <p className="text-gray-600">
                Your Writing responses are being evaluated by our assessment system.
                Results will be available soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScoreScreen;