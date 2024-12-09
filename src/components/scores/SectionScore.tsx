import { useState } from 'react';
import { ChevronDown, ChevronUp, Check, X } from 'lucide-react';

interface Answer {
  answer: string;
  correct: boolean;
}

interface TaskScore {
  question_id: string;
  question_type: string;
  answers: Answer[];
  total_score: number;
  actual_score: number;
}

interface PartScore {
  total_score: number;
  actual_score: number;
  task_scores: TaskScore[];
}

interface SectionScoreProps {
  title: string;
  sectionData: {
    total_score: number;
    actual_score: number;
    part_scores: PartScore[];
  };
}

const SectionScore: React.FC<SectionScoreProps> = ({ title, sectionData }) => {
  const [expandedPart, setExpandedPart] = useState<number | null>(null);
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  const togglePart = (index: number) => {
    setExpandedPart(expandedPart === index ? null : index);
    setExpandedTask(null);
  };

  const toggleTask = (taskId: string) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  const formatQuestionType = (type: string) => {
    return type
      .split('_')
      .map(word => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 capitalize">{title} Section Details</h2>
      
      <div className="space-y-4">
        {sectionData.part_scores.map((part, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => togglePart(index)}
              className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
            >
              <div>
                <h3 className="text-lg font-semibold">Part {index + 1}</h3>
                <p className="text-sm text-gray-600">
                  Score: {part.actual_score}/{part.total_score}
                </p>
              </div>
              {expandedPart === index ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {expandedPart === index && (
              <div className="p-4 space-y-4">
                {part.task_scores.map((task, taskIndex) => (
                  <div key={task.question_id} className="border rounded-lg">
                    <button
                      onClick={() => toggleTask(task.question_id)}
                      className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
                    >
                      <div>
                        <h4 className="font-medium">
                          Task {taskIndex + 1}: {formatQuestionType(task.question_type)}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Score: {task.actual_score}/{task.total_score}
                        </p>
                      </div>
                      {expandedTask === task.question_id ? (
                        <ChevronUp className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      )}
                    </button>

                    {expandedTask === task.question_id && (
                      <div className="p-4 bg-gray-50">
                        <h5 className="font-medium mb-2">Answers:</h5>
                        <div className="space-y-2">
                          {task.answers.map((answer, answerIndex) => (
                            <div
                              key={answerIndex}
                              className="flex items-center justify-between p-2 bg-white rounded"
                            >
                              <span>{answer.answer}</span>
                              {answer.correct ? (
                                <Check className="w-5 h-5 text-green-500" />
                              ) : (
                                <X className="w-5 h-5 text-red-500" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionScore;