
export interface Lesson {
  id: string;
  title: string;
  duration: string;
  content?: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  students: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  modules: Module[];
  isAIGenerated?: boolean;
}

export type AppView = 'HOME' | 'COURSE_DETAILS' | 'MY_LEARNING' | 'SEARCH_RESULTS';
