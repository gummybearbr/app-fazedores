// Tipos do Fazedores App

export interface User {
  id: string;
  name: string;
  companyName: string;
  companyStage: 'mei' | 'micro' | 'pequena';
  level: number;
  xp: number;
  coins: number;
  streak: number;
  currentTrailId: string;
  completedLessons: string[];
  completedTasks: string[];
  onboardingCompleted: boolean;
  createdAt: Date;
}

export interface Trail {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessons: Lesson[];
  icon: string;
  color: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;
}

export interface Lesson {
  id: string;
  trailId: string;
  title: string;
  content: string;
  duration: string; // "2 min"
  order: number;
  quiz: Quiz;
  taskGenerated?: Task;
  xpReward: number;
  coinsReward: number;
}

export interface Quiz {
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // índice da resposta correta
  explanation: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  lessonId?: string;
  status: 'todo' | 'doing' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  xpReward: number;
  coinsReward: number;
  createdAt: Date;
}

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  type: 'lesson' | 'task' | 'streak';
  completed: boolean;
  xpReward: number;
  coinsReward: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

export interface OnboardingAnswer {
  question: string;
  answer: string;
}
