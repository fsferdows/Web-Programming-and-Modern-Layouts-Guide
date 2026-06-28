import React from "react";
import { BookOpen, Code2, Boxes, GraduationCap, Sparkles, EyeOff, Wifi, WifiOff, Sun, Moon, Laptop } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isZenMode: boolean;
  toggleZenMode: () => void;
  isOffline: boolean;
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;
}

export default function Navigation({
  activeTab,
  setActiveTab,
  isZenMode,
  toggleZenMode,
  isOffline,
  theme,
  setTheme,
}: NavigationProps) {
  const navItems = [
    { id: "study", label: "Interactive Study Guide", icon: BookOpen, desc: "Master the 5 core sections" },
    { id: "playground", label: "Live Code Playground", icon: Code2, desc: "Edit HTML/CSS & see results" },
    { id: "lab", label: "Visual Layout Lab", icon: Boxes, desc: "Explore Flex, Grid & Display visually" },
    { id: "quiz", label: "Interactive Practice", icon: GraduationCap, desc: "Test skills with Quizzes & Flashcards" },
  ];

  if (isZenMode) return null;

  return (
    <header className="bg-white/90 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 sticky top-0 z-40 shadow-xs transition-all duration-200" id="main-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-3 gap-4">
          <div className="flex flex-wrap items-center justify-between sm:justify-start gap-3.5" id="brand-container">
            <div className="flex items-center space-x-3.5">
              <div className="relative bg-slate-950 text-white p-2.5 rounded-2xl shadow-md border border-slate-800/90 flex items-center justify-center shrink-0 group transition-all duration-300 hover:shadow-indigo-500/10">
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-white animate-pulse"></div>
                <Boxes className="w-5 h-5 text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white tracking-tight leading-none bg-[#fbfbfb] dark:bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-200/40 dark:border-slate-700/50 shadow-3xs transition-colors">
                    Web Academy
                  </h1>
                  <span className="inline-flex items-center text-[9px] bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold px-1.5 py-0.5 rounded-md font-mono uppercase tracking-wider">
                    v1.5
                  </span>
                  {/* Dynamic Offline Status badge */}
                  {isOffline ? (
                    <span className="inline-flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-800 dark:text-amber-300 text-[9px] font-bold px-1.5 py-0.5 rounded-md font-mono uppercase tracking-wider">
                      <WifiOff className="w-2.5 h-2.5 text-amber-600 dark:text-amber-400 animate-pulse" />
                      Offline Mode
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/60 text-emerald-850 dark:text-emerald-305 text-[9px] font-bold px-1.5 py-0.5 rounded-md font-mono uppercase tracking-wider">
                      <Wifi className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
                      Offline Ready
                    </span>
                  )}
                </div>
                <p className="text-[9px] text-slate-500 dark:text-slate-400 font-mono mt-1 uppercase tracking-wider font-semibold">
                  COMPREHENSIVE WEB ENGINEERING ACADEMY
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a 
                href="https://fsferdows.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white px-3 py-1.5 rounded-full font-mono font-bold transition-all duration-300 flex items-center gap-1.5 border border-slate-200/80 dark:border-slate-700 shadow-3xs hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer select-none"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
                <span>Dev: Ferdows</span>
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 max-w-full" id="nav-tabs-container">
            <nav className="bg-slate-100/90 dark:bg-slate-800/80 p-1 rounded-xl flex items-center gap-1 overflow-x-auto scrollbar-none border border-slate-200/60 dark:border-slate-750 max-w-full" id="nav-tabs">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`tab-btn-${item.id}`}
                    onClick={() => setActiveTab(item.id)}
                    title={item.desc}
                    className={`flex items-center space-x-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer select-none shrink-0 whitespace-nowrap ${
                      isActive
                        ? "bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-xs border border-slate-200/50 dark:border-slate-800"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-800/30"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-indigo-600 dark:text-indigo-450" : "text-slate-500 dark:text-slate-400"}`} />
                    <span className="hidden sm:inline">{item.label}</span>
                    <span className="sm:hidden">{item.label.split(" ").pop()}</span>
                  </button>
                );
              })}
            </nav>

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden md:block"></div>

            {/* Compact Theme Dropdown Toggle */}
            <div className="flex items-center space-x-1.5 bg-slate-50 dark:bg-slate-800 px-2 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl">
              {theme === "light" && <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
              {theme === "dark" && <Moon className="w-3.5 h-3.5 text-indigo-400 shrink-0" />}
              {theme === "system" && <Laptop className="w-3.5 h-3.5 text-slate-500 dark:text-slate-450 shrink-0" />}
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as any)}
                title="Choose interface theme"
                className="bg-transparent text-slate-755 dark:text-slate-200 text-xs font-semibold outline-none cursor-pointer border-none p-0 pr-1 select-none"
              >
                <option value="system" className="bg-white dark:bg-slate-900 text-slate-950 dark:text-white">Auto Theme</option>
                <option value="light" className="bg-white dark:bg-slate-900 text-slate-950 dark:text-white">Light Mode</option>
                <option value="dark" className="bg-white dark:bg-slate-900 text-slate-950 dark:text-white">Dark Mode</option>
              </select>
            </div>

            {/* Toggle Zen Mode Button */}
            <button
              onClick={toggleZenMode}
              title="Enter Zen Study Mode (Hides Header)"
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer transition-all hover:text-slate-950 dark:hover:text-white shadow-3xs"
            >
              <EyeOff className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span className="hidden lg:inline">Zen Mode</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
