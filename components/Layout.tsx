
import React, { useState } from 'react';
import { AppView } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: AppView;
  setView: (view: AppView) => void;
  onSearch: (query: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, setView, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <h1 
              onClick={() => setView('HOME')}
              className="text-2xl font-bold text-blue-700 cursor-pointer tracking-tight"
            >
              EduStream<span className="text-slate-900">AI</span>
            </h1>
            <nav className="hidden md:flex gap-6">
              <button 
                onClick={() => setView('HOME')}
                className={`font-medium text-sm hover:text-blue-600 transition ${currentView === 'HOME' ? 'text-blue-700' : 'text-slate-600'}`}
              >
                Explore
              </button>
              <button 
                onClick={() => setView('MY_LEARNING')}
                className={`font-medium text-sm hover:text-blue-600 transition ${currentView === 'MY_LEARNING' ? 'text-blue-700' : 'text-slate-600'}`}
              >
                My Learning
              </button>
            </nav>
          </div>

          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-lg">
            <div className="relative">
              <input
                type="text"
                placeholder="What do you want to learn?"
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </form>

          <div className="flex items-center gap-4">
            <button className="hidden sm:block text-sm font-semibold text-slate-600 hover:text-blue-700">Log In</button>
            <button className="px-5 py-2 bg-blue-700 text-white text-sm font-semibold rounded hover:bg-blue-800 transition">Join for Free</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">EduStream AI</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Community</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white">Learners</a></li>
                <li><a href="#" className="hover:text-white">Partners</a></li>
                <li><a href="#" className="hover:text-white">Developers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Mobile</h3>
              <div className="flex flex-col gap-2">
                <button className="bg-slate-800 px-4 py-2 rounded text-xs hover:bg-slate-700">App Store</button>
                <button className="bg-slate-800 px-4 py-2 rounded text-xs hover:bg-slate-700">Google Play</button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-sm text-slate-500 flex flex-col md:flex-row justify-between gap-4">
            <p>© 2024 EduStream AI Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Use</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
