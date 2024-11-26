export type Choice = {
  id: string;
  text: string;
};

export type BaseQuestion = [string, any];


export type MultipleChoiceQuestion = BaseQuestion & {
  type: 'MULTIPLE_CHOICE';
  id: string;
  question_with_options: MultipleChoiceQuestionWithOptions
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
  questions: SingleChoiceSubQuestion[];
};

export type TFNGStatement = {
  statement: string;
  answer: 'True' | 'False' | 'Not Given';
};

export type TrueFalseQuestion = BaseQuestion & {
  type: 'T_F_NG';
  id: string;
  statements: TFNGStatement[];
};

export type ShortAnswerSubQuestion = {
  question: string;
  answer: string;
};

export type ShortAnswerQuestion = BaseQuestion & {
  type: 'SHORT_ANSWER';
  question_id: string;
  questions: ShortAnswerSubQuestion[];
  maxWords?: number;
};

export type MatchingFeature = {
  id: string;
  statement: string;
  match: string;
};

export type MatchingFeaturesQuestion = BaseQuestion & {
  type: 'MATCHING_FEATURES';
  features: MatchingFeature[];
  statements: string[];
  matches: string[];
};

export type CompletionQuestion = BaseQuestion & {
  type: 'SENTENCE_COMPLETION' | 'NOTE_COMPLETION' | 'LISTENING_NOTE_COMPLETION' | 'TABLE_COMPLETION' | 'FLOW_COMPLETION';
  text: string;
  blanks: number;
  choices?: Choice[];
};

export type DiagramLabelQuestion = BaseQuestion & {
  type: 'DIAGRAM_LABEL_COMPLETION';
  imageUrl: string;
  labels: { id: string; x: number; y: number }[];
};
