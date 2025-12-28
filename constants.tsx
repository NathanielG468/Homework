
import { Course } from './types';

export const COURSES: Course[] = [
  {
    id: '1',
    title: 'Google Data Analytics Professional Certificate',
    instructor: 'Google Career Certificates',
    description: 'Get started in the high-growth field of data analytics with a professional certificate from Google. Learn how to process and analyze data.',
    image: 'https://picsum.photos/seed/data/800/450',
    category: 'Data Science',
    rating: 4.8,
    students: 1250000,
    level: 'Beginner',
    modules: [
      {
        id: 'm1',
        title: 'Foundations: Data, Data, Everywhere',
        lessons: [
          { id: 'l1', title: 'The data ecosystem', duration: '15m' },
          { id: 'l2', title: 'Introduction to data analytics', duration: '20m' }
        ]
      },
      {
        id: 'm2',
        title: 'Ask Questions to Make Data-Driven Decisions',
        lessons: [
          { id: 'l3', title: 'Problem solving and data', duration: '25m' }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Machine Learning Specialization',
    instructor: 'Andrew Ng',
    description: 'Master the fundamentals of machine learning and build real-world AI applications in this three-course specialization.',
    image: 'https://picsum.photos/seed/ml/800/450',
    category: 'Computer Science',
    rating: 4.9,
    students: 850000,
    level: 'Intermediate',
    modules: [
      {
        id: 'm1',
        title: 'Supervised Machine Learning: Regression and Classification',
        lessons: [
          { id: 'l1', title: 'Introduction to Machine Learning', duration: '30m' },
          { id: 'l2', title: 'Linear Regression with One Variable', duration: '45m' }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'Social Psychology',
    instructor: 'Wesleyan University',
    description: 'Ever wonder why people do what they do? This course offers a comprehensive introduction to social psychology.',
    image: 'https://picsum.photos/seed/psych/800/450',
    category: 'Arts and Humanities',
    rating: 4.7,
    students: 450000,
    level: 'Beginner',
    modules: []
  },
  {
    id: '4',
    title: 'The Science of Well-Being',
    instructor: 'Yale University',
    description: 'Learn research-based strategies to increase your own happiness and build more productive habits.',
    image: 'https://picsum.photos/seed/wellbeing/800/450',
    category: 'Personal Development',
    rating: 4.9,
    students: 3200000,
    level: 'Beginner',
    modules: []
  }
];

export const CATEGORIES = [
  'Data Science',
  'Business',
  'Computer Science',
  'Personal Development',
  'Language Learning',
  'Arts and Humanities'
];
