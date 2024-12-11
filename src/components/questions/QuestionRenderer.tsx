import React from 'react';
import MultipleChoice from './MultipleChoice';
import SingleChoice from './SingleChoice';
import TrueFalseNG from './TrueFalseNG';
import MatchingFeatures from './MatchingFeatures';
import NoteCompletion from './NoteCompletion';
import ShortAnswer from './ShortAnswer';
import DiagramLabel from './DiagramLabel';
import FlowCompletion from './FlowCompletion';
import SentenceCompletion from './SentenceCompletion';
import TableCompletion from './TableCompletion';
import type { BaseQuestion } from './types';

interface Props {
  question_type: string;
  question: BaseQuestion;
  onAnswer: (answer: any) => void;
  currentAnswer: any;
  isInstructionsGlowing?: boolean;
  timeLeft?: number;
}

const QuestionRenderer: React.FC<Props> = ({
  question_type,
  question,
  onAnswer,
  currentAnswer,
  isInstructionsGlowing = false,
  timeLeft
}) => {
  var instructions = question?.instructions;

  const renderInstructions = () => {
    if (!instructions) {
      instructions = 'Answer the following questions';
    }      

    return (
      <div className={`relative mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 transition-all duration-300 ${
        isInstructionsGlowing ? 'ring-2 ring-indigo-500 ring-opacity-50' : ''
      }`}>
        {isInstructionsGlowing && timeLeft !== undefined && (
          <div className="absolute top-2 right-2 text-sm text-gray-600">
            Read {timeLeft}s
          </div>
        )}
        
        <div className="px-6 py-4">
          <div className="flex items-center mb-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div>
            <h3 className="text-lg font-semibold text-indigo-900">
              Instructions
            </h3>
          </div>
          <p className="text-gray-800 leading-relaxed">{instructions}</p>
        </div>
      </div>
    );
  };

  const renderQuestion = () => {
    switch (question_type) {
      case 'MULTIPLE_CHOICE':
        return (
          <MultipleChoice
            question={question}
            onAnswer={onAnswer}
            selectedAnswers={currentAnswer || []}
          />
        );
      case 'SINGLE_CHOICE':
        return (
          <SingleChoice
            question={question}
            onAnswer={onAnswer}
            selectedAnswers={currentAnswer || {}}
          />
        );
      case 'T_F_NG':
        return (
          <TrueFalseNG
            question={question}
            onAnswer={onAnswer}
            selectedAnswers={currentAnswer || {}}
          />
        );
      case 'MATCHING_FEATURES':
        return (
          <MatchingFeatures
            question={question}
            onAnswer={onAnswer}
            selectedAnswers={currentAnswer || {}}
          />
        );
      case 'NOTE_COMPLETION':
      case 'LISTENING_NOTE_COMPLETION':
        return (
          <NoteCompletion
            question={question}
            onAnswer={onAnswer}
            answers={currentAnswer || []}
          />
        );
      case 'TABLE_COMPLETION':
        return (
          <TableCompletion
            question={question}
            onAnswer={onAnswer}
            answers={currentAnswer || []}
          />
        );
      case 'SENTENCE_COMPLETION':
        return (
          <SentenceCompletion
            question={question}
            onAnswer={onAnswer}
            answers={currentAnswer || []}
          />
        );
      case 'FLOW_COMPLETION':
        return (
          <FlowCompletion
            question={question}
            onAnswer={onAnswer}
            answers={currentAnswer || []}
          />
        );
      case 'SHORT_ANSWER':
        return (
          <ShortAnswer
            question={question}
            onAnswer={onAnswer}
            answers={currentAnswer || {}}
          />
        );
      case 'DIAGRAM_LABEL_COMPLETION':
        return (
          <DiagramLabel
            question={question}
            onAnswer={onAnswer}
            answers={currentAnswer || {}}
          />
        );
      default:
        return <div>Unsupported question type</div>;
    }
  };

  return (
    <div>
      {renderInstructions()}
      {renderQuestion()}
    </div>
  );
};

export default QuestionRenderer;
