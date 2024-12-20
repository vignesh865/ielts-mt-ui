export type Choice = {
  id: string;
  text: string;
};

export type BaseQuestion = [string, any];

export type MultipleChoiceQuestion = BaseQuestion & {
  type: 'MULTIPLE_CHOICE';
  id: string;
  instructions?: string;
  question_with_options: MultipleChoiceQuestionWithOptions;
};

export type MultipleChoiceQuestionWithOptions = BaseQuestion & {
  correct_answers: string[];
  question: string;
  wrong_answers: string[];
};

export type SingleChoiceSubQuestion = {
  question: string;
  correct_answer: string;
  wrong_answers: string[];
};

export type SingleChoiceQuestion = BaseQuestion & {
  type: 'SINGLE_CHOICE';
  id: string;
  instructions?: string;
  questions: SingleChoiceSubQuestion[];
};

export type TFNGStatement = {
  statement: string;
  answer: 'True' | 'False' | 'Not Given';
};

export type TrueFalseQuestion = BaseQuestion & {
  type: 'T_F_NG';
  id: string;
  instructions?: string;
  statements: TFNGStatement[];
};

export type ShortAnswerQuestion = BaseQuestion & {
  type: 'SHORT_ANSWER';
  id: string;
  instructions?: string;
  questions: {
    question: string;
  }[];
};

export type MatchingOption = {
  index: number;
  text: string;
};

export type MatchingStatement = {
  index: number;
  statement: string;
};

export type MatchingFeaturesQuestion = BaseQuestion & {
  type: 'MATCHING_FEATURES';
  id: string;
  instructions?: string;
  options: MatchingOption[];
  statements: MatchingStatement[];
};

export type TableCell = {
  text: string;
};

export type TableRow = {
  cells: TableCell[];
};

export type TableCompletionQuestion = BaseQuestion & {
  type: 'TABLE_COMPLETION';
  id: string;
  instructions?: string;
  table_completion: {
    row_headers: string[];
    column_headers: string[];
    rows: TableRow[];
  };
};

export type NoteCompletionQuestion = BaseQuestion & {
  type: 'NOTE_COMPLETION' | 'LISTENING_NOTE_COMPLETION';
  id: string;
  instructions?: string;
  note: {
    blanked_note_text: string;
  };
};

export type SentenceCompletionQuestion = BaseQuestion & {
  type: 'SENTENCE_COMPLETION';
  id: string;
  instructions?: string;
  sentence_completion: {
    sentences: string[];
  };
};

export type FlowCompletionQuestion = BaseQuestion & {
  type: 'FLOW_COMPLETION';
  id: string;
  instructions?: string;
  flow_completion: {
    steps: {
      text: string;
    }[];
  };
};

export type DiagramLabelQuestion = BaseQuestion & {
  type: 'DIAGRAM_LABEL_COMPLETION';
  imageUrl: string;
  instructions?: string;
  labels: { id: string; x: number; y: number }[];
};
