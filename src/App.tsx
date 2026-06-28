import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import SectionViewer from "./components/SectionViewer";
import CodePlayground from "./components/CodePlayground";
import LayoutSandbox from "./components/LayoutSandbox";
import QuizEngine from "./components/QuizEngine";
import CurriculumTracker from "./components/CurriculumTracker";
import { BookOpen, Code2, Boxes, GraduationCap, Sparkles, CheckCircle2, Eye, Wifi, WifiOff } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem("fundamentals_active_tab") || "study";
  });
  const [isZenMode, setIsZenMode] = useState<boolean>(() => {
    return localStorage.getItem("fundamentals_zen_mode") === "true";
  });
  const [isOffline, setIsOffline] = useState<boolean>(() => {
    return typeof navigator !== "undefined" ? !navigator.onLine : false;
  });

  // User-controlled Theme Preference (system/light/dark)
  const [theme, setTheme] = useState<"light" | "dark" | "system">(() => {
    return (localStorage.getItem("fundamentals_theme") as "light" | "dark" | "system") || "system";
  });

  // Offline status listeners
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Sync Theme changes with browser/HTML element
  useEffect(() => {
    const root = window.document.documentElement;
    const updateTheme = () => {
      const isDark =
        theme === "dark" ||
        (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
      if (isDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    updateTheme();

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const listener = () => updateTheme();
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, [theme]);

  const handleSetTheme = (nextTheme: "light" | "dark" | "system") => {
    setTheme(nextTheme);
    localStorage.setItem("fundamentals_theme", nextTheme);
  };

  const handleSetActiveTab = (tab: string) => {
    setActiveTab(tab);
    localStorage.setItem("fundamentals_active_tab", tab);
  };

  const handleToggleZenMode = () => {
    const nextVal = !isZenMode;
    setIsZenMode(nextVal);
    localStorage.setItem("fundamentals_zen_mode", String(nextVal));
  };

  const navItems = [
    { id: "study", label: "Study Guide", icon: BookOpen },
    { id: "playground", label: "Playground", icon: Code2 },
    { id: "lab", label: "Visual Lab", icon: Boxes },
    { id: "quiz", label: "Quiz Practice", icon: GraduationCap },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 flex flex-col font-sans transition-colors duration-200" id="app-container">
      {/* Floating Zen Mode Capsule Dock */}
      {isZenMode && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center bg-slate-950/95 backdrop-blur-md text-white px-4 py-2 rounded-full shadow-lg border border-slate-800 space-x-3 transition-all duration-300 animate-in fade-in slide-in-from-bottom-6" id="floating-zen-dock">
          <div className="flex items-center space-x-1.5 border-r border-slate-800 pr-3 mr-1 text-[11px] font-mono font-bold text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Web Academy</span>
          </div>
          {/* Navigation Items */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSetActiveTab(item.id)}
                  title={item.label}
                  className={`p-2 rounded-full transition-all relative group cursor-pointer ${
                    isActive ? "bg-amber-400 text-slate-950" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-2 py-1 bg-slate-950 border border-slate-800 text-[10px] font-semibold text-white rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none shadow-md">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="h-4 w-px bg-slate-800"></div>
          {/* Offline Status */}
          <div className="flex items-center" title={isOffline ? "Offline Mode Active" : "Online & Synced Locally"}>
            {isOffline ? (
              <WifiOff className="w-4 h-4 text-rose-400 animate-pulse" />
            ) : (
              <Wifi className="w-4 h-4 text-emerald-400" />
            )}
          </div>
          <div className="h-4 w-px bg-slate-800"></div>
          {/* Show Header */}
          <button
            onClick={handleToggleZenMode}
            title="Restore Full Header"
            className="p-2 text-slate-300 hover:bg-slate-800 hover:text-white rounded-full transition-all cursor-pointer group relative"
          >
            <Eye className="w-4 h-4" />
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-2 py-1 bg-slate-950 border border-slate-800 text-[10px] font-semibold text-white rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none shadow-md">
              Show Header
            </span>
          </button>
        </div>
      )}

      {/* Sleek Header & Tab Navigation */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={handleSetActiveTab}
        isZenMode={isZenMode}
        toggleZenMode={handleToggleZenMode}
        isOffline={isOffline}
        theme={theme}
        setTheme={handleSetTheme}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8" id="main-content-flow">
        
        {/* Welcome Stat banner (Only shows on Study tab for layout breathing room) */}
        {activeTab === "study" && (
          <>
            <div className="bg-gradient-to-tr from-indigo-50/70 via-slate-50/60 to-white dark:from-slate-900/95 dark:via-indigo-950/20 dark:to-slate-950 rounded-2xl border border-slate-200/70 dark:border-slate-850 p-6 sm:p-8 md:p-10 lg:p-12 mb-8 shadow-xs dark:shadow-[0_0_40px_rgba(99,102,241,0.05)] relative overflow-hidden" id="welcome-stat-banner">
              <div className="absolute -top-10 -right-10 text-slate-200/35 dark:text-slate-800/15 font-mono text-[120px] sm:text-[180px] md:text-[240px] font-black select-none pointer-events-none leading-none">
                5
              </div>
              
              <div className="relative z-10 max-w-3xl space-y-4">
                <div className="inline-flex items-center space-x-2 bg-indigo-50/80 dark:bg-indigo-950/60 border border-indigo-100/80 dark:border-indigo-900/40 text-indigo-800 dark:text-indigo-300 px-3.5 py-1 rounded-full font-bold text-xs font-mono uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
                  <span>Modern Web Masterclass Q&A Companion</span>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
                  Master the Core Mechanics of Web Programming
                </h1>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal max-w-2xl font-sans">
                  Explore the five structural pillars of modern layout architecture, web request routing, and inclusive accessible design. Interact with real-time browser sandbox frames to experiment with CSS targeting, flex box properties, and responsive matrices.
                </p>
              </div>

              {/* Quick Metrics Bar with auto-fitting grid adjusting based on screen width */}
              <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-4 sm:gap-6 mt-8 pt-8 border-t border-slate-200/80 dark:border-slate-800/80" id="welcome-metrics">
                
                <div className="group flex items-center space-x-3.5 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-50 dark:hover:bg-slate-850 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-900 hover:shadow-xs transition-all duration-300 ease-out hover:-translate-y-1">
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-slate-200 group-hover:bg-slate-950 dark:group-hover:bg-slate-100 group-hover:text-white dark:group-hover:text-slate-950 transition-all duration-300 shadow-2xs">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white leading-none">5 Core</div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 font-semibold font-mono mt-1.5 uppercase tracking-wider">Topic Sections</div>
                  </div>
                </div>

                <div className="group flex items-center space-x-3.5 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-50 dark:hover:bg-slate-850 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-900 hover:shadow-xs transition-all duration-300 ease-out hover:-translate-y-1">
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-slate-200 group-hover:bg-slate-950 dark:group-hover:bg-slate-100 group-hover:text-white dark:group-hover:text-slate-950 transition-all duration-300 shadow-2xs">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white leading-none">5 Presets</div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 font-semibold font-mono mt-1.5 uppercase tracking-wider">Live Playgrounds</div>
                  </div>
                </div>

                <div className="group flex items-center space-x-3.5 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-50 dark:hover:bg-slate-850 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-900 hover:shadow-xs transition-all duration-300 ease-out hover:-translate-y-1">
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-slate-200 group-hover:bg-slate-950 dark:group-hover:bg-slate-100 group-hover:text-white dark:group-hover:text-slate-950 transition-all duration-300 shadow-2xs">
                    <Boxes className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white leading-none">2 Interactive</div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 font-semibold font-mono mt-1.5 uppercase tracking-wider">Visual Labs</div>
                  </div>
                </div>

                <div className="group flex items-center space-x-3.5 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-50 dark:hover:bg-slate-850 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-900 hover:shadow-xs transition-all duration-300 ease-out hover:-translate-y-1">
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-slate-200 group-hover:bg-slate-950 dark:group-hover:bg-slate-100 group-hover:text-white dark:group-hover:text-slate-950 transition-all duration-300 shadow-2xs">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white leading-none">12 Q&As</div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 font-semibold font-mono mt-1.5 uppercase tracking-wider">Practice Quizzes</div>
                  </div>
                </div>

              </div>
            </div>

            {/* Curriculum Progress Tracker banner */}
            <div className="mb-8" id="study-curriculum-tracker-container">
              <CurriculumTracker />
            </div>
          </>
        )}

        {/* Tab content routing with premium Framer Motion transitions */}
        <div id="active-tab-panel">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.99 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeTab === "study" && <SectionViewer />}
              {activeTab === "playground" && <CodePlayground />}
              {activeTab === "lab" && <LayoutSandbox />}
              {activeTab === "quiz" && <QuizEngine />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer with Developer credit and modern styling */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 py-10 mt-12" id="main-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="text-left space-y-1">
              <div className="flex items-center space-x-2 text-white font-bold text-sm">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Web Fundamentals & Layouts Academy</span>
              </div>
              <p className="text-xs text-slate-400 max-w-md font-sans">
                An advanced interactive educational suite designed to master modern web specifications, layout strategies, and WCAG accessibility standards.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a 
                href="https://fsferdows.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center space-x-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 px-4 py-2.5 rounded-xl transition-all duration-300 text-slate-200 hover:text-white"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 group-hover:animate-ping" />
                <div className="text-left">
                  <div className="text-[10px] text-slate-500 font-mono leading-none font-semibold">Curriculum Architect</div>
                  <div className="text-xs font-bold mt-1">fsferdows.vercel.app</div>
                </div>
              </a>
              
              <div className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl flex items-center gap-2">
                <span className="text-[10px] text-slate-500 font-mono font-semibold">Accessibility:</span>
                <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 fill-emerald-950 text-emerald-400" /> WCAG 2.1 AAA Compliant
                </span>
              </div>
            </div>
          </div>
          
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
            <div>
              &copy; 2026 <strong>Web Fundamentals Academy</strong>. All materials aligned with modern W3C specifications. Developed with excellence by <a href="https://fsferdows.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 underline decoration-indigo-500/50 underline-offset-2 transition-colors">Ferdows</a>.
            </div>
            <div className="flex items-center gap-4">
              <a href="#main-header" className="hover:text-white transition-colors">Back to top &uarr;</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
