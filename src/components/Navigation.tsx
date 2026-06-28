import React from "react";
import { BookOpen, Code2, Boxes, GraduationCap, Sparkles } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const navItems = [
    { id: "study", label: "Interactive Study Guide", icon: BookOpen, desc: "Master the 5 core sections" },
    { id: "playground", label: "Live Code Playground", icon: Code2, desc: "Edit HTML/CSS & see results" },
    { id: "lab", label: "Visual Layout Lab", icon: Boxes, desc: "Explore Flex, Grid & Display visually" },
    { id: "quiz", label: "Interactive Practice", icon: GraduationCap, desc: "Test skills with Quizzes & Flashcards" },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs" id="main-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3" id="brand-container">
            <div className="flex items-center space-x-3">
              <div className="bg-slate-900 text-white p-2.5 rounded-xl shadow-md flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">
                  Web Fundamentals & Layouts
                </h1>
                <p className="text-xs text-slate-500 font-mono mt-1">
                  COMPREHENSIVE Q&A ACADEMY
                </p>
              </div>
            </div>
            <a 
              href="https://fsferdows.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-800 hover:text-slate-950 px-2.5 py-1 rounded-full font-mono font-bold transition-all duration-300 flex items-center gap-1.5 border border-slate-200 shadow-3xs hover:border-slate-300 cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
              <span>Dev: Ferdows</span>
            </a>
          </div>

          <nav className="flex flex-wrap gap-2" id="nav-tabs">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`tab-btn-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
