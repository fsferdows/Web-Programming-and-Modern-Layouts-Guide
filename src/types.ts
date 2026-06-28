export interface CurriculumSection {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
}

export interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  html: string;
  css: string;
  category: "selectors" | "display" | "positioning" | "flex-grid";
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  sectionId: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  tip?: string;
}
