import React from 'react';
import MultipleChoice from './MultipleChoice';
import SingleChoice from './SingleChoice';
import TrueFalseNG from './TrueFalseNG';
import MatchingFeatures from './MatchingFeatures';
import Completion from './Completion';
import ShortAnswer from './ShortAnswer';
import DiagramLabel from './DiagramLabel';
import FlowCompletion from './FlowCompletion';
import SentenceCompletion from './SentenceCompletion';
import type { BaseQuestion } from './types';

interface Props {
  question_type: string;
  question: BaseQuestion;
  onAnswer: (answer: any) => void;
  currentAnswer: any;
}

const QuestionRenderer: React.FC<Props> = ({
  question_type,
  question,
  onAnswer,
  currentAnswer,
}) => {
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
    case 'TABLE_COMPLETION':
      return (
        <Completion
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

export default QuestionRenderer;