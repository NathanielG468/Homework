
import React from 'react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onClick: (course: Course) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  return (
    <div 
      onClick={() => onClick(course)}
      className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group flex flex-col h-full"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {course.isAIGenerated && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-[10px] font-bold rounded flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>
            AI GENERATED
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">{course.instructor}</p>
        <h3 className="font-bold text-slate-900 line-clamp-2 mb-2 group-hover:text-blue-700 transition-colors leading-tight">
          {course.title}
        </h3>
        <div className="mt-auto">
          <div className="flex items-center gap-1 mb-2">
            <span className="text-amber-500 font-bold text-sm">{course.rating.toFixed(1)}</span>
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-3 h-3 ${i < Math.floor(course.rating) ? 'fill-current' : 'text-slate-200'}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              ))}
            </div>
            <span className="text-xs text-slate-400">({course.students.toLocaleString()})</span>
          </div>
          <div className="text-xs text-slate-600 font-medium">
            {course.level} • {course.category}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
