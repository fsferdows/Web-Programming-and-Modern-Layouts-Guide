import React from "react";
import { BookOpen, Code2, Boxes, GraduationCap, Sparkles, EyeOff, Wifi, WifiOff } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isZenMode: boolean;
  toggleZenMode: () => void;
  isOffline: boolean;
}

export default function Navigation({ activeTab, setActiveTab, isZenMode, toggleZenMode, isOffline }: NavigationProps) {
  const navItems = [
    { id: "study", label: "Interactive Study Guide", icon: BookOpen, desc: "Master the 5 core sections" },
    { id: "playground", label: "Live Code Playground", icon: Code2, desc: "Edit HTML/CSS & see results" },
    { id: "lab", label: "Visual Layout Lab", icon: Boxes, desc: "Explore Flex, Grid & Display visually" },
    { id: "quiz", label: "Interactive Practice", icon: GraduationCap, desc: "Test skills with Quizzes & Flashcards" },
  ];

  if (isZenMode) return null;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs" id="main-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-3.5 gap-4">
          <div className="flex flex-wrap items-center justify-between sm:justify-start gap-3.5" id="brand-container">
            <div className="flex items-center space-x-3">
              <div className="relative bg-slate-950 text-white p-2 rounded-xl shadow-xs border border-slate-800/80 flex items-center justify-center shrink-0 group">
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-white"></div>
                <Boxes className="w-5 h-5 text-indigo-400 group-hover:rotate-6 transition-transform duration-200" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <h1 className="text-base sm:text-lg font-extrabold text-slate-950 tracking-tight leading-none">
                    Web Academy
                  </h1>
                  <span className="inline-flex items-center text-[9px] bg-slate-100 border border-slate-200 text-slate-700 font-bold px-1.5 py-0.5 rounded-md font-mono uppercase tracking-wider">
                    v1.5
                  </span>
                  {/* Dynamic Offline Status badge */}
                  {isOffline ? (
                    <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-800 text-[9px] font-bold px-1.5 py-0.5 rounded-md font-mono uppercase tracking-wider">
                      <WifiOff className="w-2.5 h-2.5 text-amber-600 animate-pulse" />
                      Offline Mode
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.5 rounded-md font-mono uppercase tracking-wider">
                      <Wifi className="w-2.5 h-2.5 text-emerald-600" />
                      Offline Ready
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-500 font-mono mt-1 uppercase tracking-wide">
                  COMPREHENSIVE WEB ENGINEERING ACADEMY
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
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
          </div>

          <div className="flex flex-wrap items-center gap-2" id="nav-tabs-container">
            <nav className="flex flex-wrap gap-1.5" id="nav-tabs">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`tab-btn-${item.id}`}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-slate-900 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                    <span className="sm:hidden">{item.label.split(" ").pop()}</span>
                  </button>
                );
              })}
            </nav>

            <div className="h-6 w-px bg-slate-200 hidden md:block"></div>

            {/* Toggle Zen Mode Button */}
            <button
              onClick={toggleZenMode}
              title="Enter Zen Study Mode (Hides Header)"
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 cursor-pointer transition-all hover:text-slate-950 shadow-3xs"
            >
              <EyeOff className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden lg:inline">Zen Mode</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
