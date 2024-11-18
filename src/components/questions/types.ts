export type Choice = {
  id: string;
  text: string;
};

export type BaseQuestion = {
  id: string;
  type: string;
  question: string;
  marks?: number;
};

export type MultipleChoiceQuestion = BaseQuestion & {
  type: 'MULTIPLE_CHOICE';
  choices: Choice[];
  correctAnswers: string[];
};

export type SingleChoiceQuestion = BaseQuestion & {
  type: 'SINGLE_CHOICE';
  choices: Choice[];
  correctAnswer: string;
};

export type TrueFalseQuestion = BaseQuestion & {
  type: 'T_F_NG';
  correctAnswer: 'T' | 'F' | 'NG';
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

export type ShortAnswerQuestion = BaseQuestion & {
  type: 'SHORT_ANSWER';
  maxWords?: number;
};

export type DiagramLabelQuestion = BaseQuestion & {
  type: 'DIAGRAM_LABEL_COMPLETION';
  imageUrl: string;
  labels: { id: string; x: number; y: number }[];
};