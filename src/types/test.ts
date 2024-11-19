export interface Test {
  id: string;
  title: string;
  type: 'General' | 'Academic';
  description: string;
  duration: number;
  sections: {
    listening: boolean;
    reading: boolean;
    writing: boolean;
    speaking: boolean;
  };
  createdAt: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}