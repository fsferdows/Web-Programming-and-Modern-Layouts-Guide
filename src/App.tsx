import React, { useState } from "react";
import Navigation from "./components/Navigation";
import SectionViewer from "./components/SectionViewer";
import CodePlayground from "./components/CodePlayground";
import LayoutSandbox from "./components/LayoutSandbox";
import QuizEngine from "./components/QuizEngine";
import { BookOpen, Code2, Boxes, GraduationCap, Sparkles, CheckCircle2 } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("study");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans" id="app-container">
      {/* Sleek Header & Tab Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8" id="main-content-flow">
        
        {/* Welcome Stat banner (Only shows on Study tab for layout breathing room) */}
        {activeTab === "study" && (
          <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 md:p-10 lg:p-12 mb-8 shadow-sm relative overflow-hidden" id="welcome-stat-banner">
            <div className="absolute -top-10 -right-10 text-slate-100 font-mono text-[120px] sm:text-[180px] md:text-[240px] font-black select-none pointer-events-none leading-none opacity-20">
              5
            </div>
            
            <div className="relative z-10 max-w-3xl space-y-3">
              <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-bold text-xs font-mono uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Modern Web Masterclass Q&A Companion</span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
                Master the Core Mechanics of Web Programming
              </h1>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal max-w-2xl">
                Explore the five structural pillars of modern layout architecture, web request routing, and inclusive accessible design. Interact with real-time browser sandbox frames to experiment with CSS targeting, flex box properties, and responsive matrices.
              </p>
            </div>

            {/* Quick Metrics Bar with auto-fitting grid adjusting based on screen width */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 sm:gap-6 mt-8 pt-8 border-t border-slate-200" id="welcome-metrics">
              
              <div className="group flex items-center space-x-3.5 bg-white hover:bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-xs transition-all duration-300 ease-out hover:-translate-y-1">
                <div className="p-3 rounded-xl bg-slate-100 text-slate-950 group-hover:bg-slate-950 group-hover:text-white transition-all duration-300 shadow-2xs">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-extrabold text-slate-950 leading-none">5 Core</div>
                  <div className="text-[11px] text-slate-700 font-semibold font-mono mt-1.5 uppercase tracking-wider">Topic Sections</div>
                </div>
              </div>

              <div className="group flex items-center space-x-3.5 bg-white hover:bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-xs transition-all duration-300 ease-out hover:-translate-y-1">
                <div className="p-3 rounded-xl bg-slate-100 text-slate-950 group-hover:bg-slate-950 group-hover:text-white transition-all duration-300 shadow-2xs">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-extrabold text-slate-950 leading-none">5 Presets</div>
                  <div className="text-[11px] text-slate-700 font-semibold font-mono mt-1.5 uppercase tracking-wider">Live Playgrounds</div>
                </div>
              </div>

              <div className="group flex items-center space-x-3.5 bg-white hover:bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-xs transition-all duration-300 ease-out hover:-translate-y-1">
                <div className="p-3 rounded-xl bg-slate-100 text-slate-950 group-hover:bg-slate-950 group-hover:text-white transition-all duration-300 shadow-2xs">
                  <Boxes className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-extrabold text-slate-950 leading-none">2 Interactive</div>
                  <div className="text-[11px] text-slate-700 font-semibold font-mono mt-1.5 uppercase tracking-wider">Visual Labs</div>
                </div>
              </div>

              <div className="group flex items-center space-x-3.5 bg-white hover:bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-xs transition-all duration-300 ease-out hover:-translate-y-1">
                <div className="p-3 rounded-xl bg-slate-100 text-slate-950 group-hover:bg-slate-950 group-hover:text-white transition-all duration-300 shadow-2xs">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-extrabold text-slate-950 leading-none">12 Q&As</div>
                  <div className="text-[11px] text-slate-700 font-semibold font-mono mt-1.5 uppercase tracking-wider">Practice Quizzes</div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab content routing */}
        <div id="active-tab-panel" className="transition-all duration-300">
          {activeTab === "study" && <SectionViewer />}
          {activeTab === "playground" && <CodePlayground />}
          {activeTab === "lab" && <LayoutSandbox />}
          {activeTab === "quiz" && <QuizEngine />}
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
