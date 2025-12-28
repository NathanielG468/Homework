
import React, { useState, useEffect } from 'react';
import { AppView, Course } from './types';
import { COURSES, CATEGORIES } from './constants';
import Layout from './components/Layout';
import CourseCard from './components/CourseCard';
import AITutor from './components/AITutor';
import { geminiService } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('HOME');
  const [courses, setCourses] = useState<Course[]>(COURSES);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  const [currentLesson, setCurrentLesson] = useState<string>('');

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    // Check if we already have it
    const localMatch = courses.find(c => c.title.toLowerCase().includes(query.toLowerCase()));
    if (localMatch) {
      setSelectedCourse(localMatch);
      setView('COURSE_DETAILS');
      return;
    }

    // Otherwise, let's generate a course for this specific query!
    setIsGenerating(true);
    setView('HOME'); // Stay home but show loader
    try {
      const newCourse = await geminiService.generateCourse(query);
      setCourses(prev => [newCourse, ...prev]);
      setSelectedCourse(newCourse);
      setView('COURSE_DETAILS');
    } catch (error) {
      console.error("Failed to generate course", error);
      alert("Something went wrong generating that course. Please try a simpler topic!");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setView('COURSE_DETAILS');
    if (course.modules?.[0]?.lessons?.[0]) {
      setCurrentLesson(course.modules[0].lessons[0].title);
    }
  };

  const enroll = (id: string) => {
    if (!enrolledCourses.includes(id)) {
      setEnrolledCourses(prev => [...prev, id]);
    }
    setView('MY_LEARNING');
  };

  return (
    <Layout currentView={view} setView={setView} onSearch={handleSearch}>
      {isGenerating && (
        <div className="fixed inset-0 z-[60] bg-white/80 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-bold text-slate-900">EduStream AI is drafting your syllabus...</h2>
            <p className="text-slate-500">Curating the best content for your specific interests.</p>
          </div>
        </div>
      )}

      {view === 'HOME' && (
        <div>
          {/* Hero Section */}
          <section className="bg-slate-50 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid md:grid-cols-2 items-center gap-12">
              <div>
                <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
                  Learn without <span className="text-blue-700">limits</span>.
                </h2>
                <p className="text-xl text-slate-600 mb-8 max-w-lg">
                  Start, switch, or advance your career with more than 7,000 courses, Professional Certificates, and degrees from world-class universities and companies.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-8 py-4 bg-blue-700 text-white font-bold rounded hover:bg-blue-800 transition shadow-lg shadow-blue-200">
                    Join for Free
                  </button>
                  <button className="px-8 py-4 bg-white border border-blue-700 text-blue-700 font-bold rounded hover:bg-blue-50 transition">
                    Try Business
                  </button>
                </div>
              </div>
              <div className="hidden md:block relative">
                <img 
                  src="https://picsum.photos/seed/learn/800/600" 
                  alt="Learning Hero" 
                  className="rounded-2xl shadow-2xl rotate-2"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-slate-100 max-w-[240px]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-green-500 font-bold">94%</span>
                    <span className="text-xs text-slate-500">Success Rate</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-800">Of learners reported career benefits from EduStream.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Categories */}
          <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-slate-900">Explore Top Categories</h3>
                <button className="text-blue-700 font-semibold hover:underline text-sm">See all</button>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {CATEGORIES.map(cat => (
                  <button key={cat} className="px-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-full whitespace-nowrap text-sm font-semibold text-slate-700 transition">
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Course Grid */}
          <section className="py-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">Popular Courses</h3>
                  <p className="text-slate-500">Hand-picked selections for your professional growth.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {courses.map(course => (
                  <CourseCard key={course.id} course={course} onClick={handleCourseClick} />
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {view === 'COURSE_DETAILS' && selectedCourse && (
        <div className="bg-white">
          <div className="bg-slate-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-12 items-center">
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-blue-400 font-semibold text-sm">Professional Certificate</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400 text-sm">{selectedCourse.instructor}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{selectedCourse.title}</h2>
                <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-3xl">
                  {selectedCourse.description}
                </p>
                <div className="flex flex-wrap gap-8 items-center mb-8">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">{selectedCourse.rating}</span>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      ))}
                    </div>
                    <span className="text-slate-400 text-sm">({selectedCourse.students.toLocaleString()} reviews)</span>
                  </div>
                  <div className="text-sm font-semibold text-slate-400">
                    {selectedCourse.level} Level
                  </div>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => enroll(selectedCourse.id)}
                    className="px-8 py-4 bg-blue-700 text-white font-bold rounded hover:bg-blue-800 transition"
                  >
                    Enroll for Free
                  </button>
                  <button className="px-8 py-4 bg-slate-800 text-white font-bold rounded hover:bg-slate-700 transition">
                    Financial Aid Available
                  </button>
                </div>
                <p className="mt-4 text-sm text-slate-500">3,450,234 already enrolled</p>
              </div>
              <div className="hidden md:block">
                <img 
                  src={selectedCourse.image} 
                  alt={selectedCourse.title} 
                  className="rounded-lg shadow-2xl border-4 border-slate-800"
                />
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-8">Course Syllabus</h3>
              <div className="space-y-4">
                {selectedCourse.modules.map((module, i) => (
                  <div key={module.id} className="border border-slate-200 rounded-lg overflow-hidden">
                    <div className="bg-slate-50 p-4 font-bold flex justify-between items-center">
                      <span>Module {i + 1}: {module.title}</span>
                      <span className="text-sm text-slate-500 font-medium">{module.lessons.length} lessons</span>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {module.lessons.map(lesson => (
                        <div key={lesson.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>
                            </div>
                            <span className="text-sm font-medium text-slate-700">{lesson.title}</span>
                          </div>
                          <span className="text-xs text-slate-400 font-mono">{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {selectedCourse.modules.length === 0 && (
                  <p className="text-slate-500 italic">No modules available for this preview.</p>
                )}
              </div>
            </div>
            
            <aside className="space-y-8">
              <div className="sticky top-24">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  Interactive AI Tutor
                </h3>
                <p className="text-sm text-slate-500 mb-6">Ask questions about the syllabus or complex concepts from this course.</p>
                <AITutor courseTitle={selectedCourse.title} />
              </div>
            </aside>
          </div>
        </div>
      )}

      {view === 'MY_LEARNING' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">My Learning</h2>
          
          {enrolledCourses.length === 0 ? (
            <div className="bg-slate-100 rounded-2xl p-12 text-center">
              <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">You haven't enrolled in any courses yet.</h3>
              <p className="text-slate-500 mb-8">Start your learning journey by exploring our massive catalog.</p>
              <button 
                onClick={() => setView('HOME')}
                className="px-8 py-3 bg-blue-700 text-white font-bold rounded hover:bg-blue-800 transition"
              >
                Browse Courses
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.filter(c => enrolledCourses.includes(c.id)).map(course => (
                <div key={course.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                  <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
                  <div className="p-6 flex-grow">
                    <h3 className="font-bold text-lg mb-2 leading-tight">{course.title}</h3>
                    <p className="text-sm text-slate-500 mb-4">{course.instructor}</p>
                    <div className="w-full bg-slate-100 h-2 rounded-full mb-2">
                      <div className="bg-blue-600 h-2 rounded-full w-[15%]"></div>
                    </div>
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-blue-700">15% COMPLETE</span>
                      <span className="text-slate-400 uppercase">Next: {course.modules[0]?.lessons[1]?.title || 'Next Lesson'}</span>
                    </div>
                  </div>
                  <div className="p-4 border-t border-slate-100 bg-slate-50">
                    <button 
                      onClick={() => handleCourseClick(course)}
                      className="w-full py-2 bg-blue-700 text-white text-sm font-bold rounded hover:bg-blue-800 transition"
                    >
                      Resume Learning
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default App;
