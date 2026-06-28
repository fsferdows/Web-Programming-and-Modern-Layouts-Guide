import React, { useState, useEffect } from "react";
import { CheckCircle2, Award, BookOpen, TrendingUp, Sparkles, Trophy } from "lucide-react";
import { CURRICULUM_SECTIONS } from "../data/curriculum";

export default function CurriculumTracker() {
  const [completed, setCompleted] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("fundamentals_completed_sections");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("fundamentals_completed_sections", JSON.stringify(completed));
    // Dispatch custom event to sync with other components in real-time
    window.dispatchEvent(new Event("curriculum_completed_updated"));
  }, [completed]);

  const toggleSection = (id: string) => {
    if (completed.includes(id)) {
      setCompleted(completed.filter((item) => item !== id));
    } else {
      setCompleted([...completed, id]);
    }
  };

  const totalSections = CURRICULUM_SECTIONS.length;
  const completedCount = completed.length;
  const percentage = Math.round((completedCount / totalSections) * 100);

  const getMasteryLevel = (pct: number) => {
    if (pct === 0) return { label: "Initiate", color: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700" };
    if (pct <= 20) return { label: "Apprentice", color: "bg-indigo-50/70 text-indigo-750 dark:bg-indigo-950/30 dark:text-indigo-300 border-indigo-100/50 dark:border-indigo-900/40" };
    if (pct <= 60) return { label: "Competent Web Developer", color: "bg-blue-50/70 text-blue-750 dark:bg-blue-950/30 dark:text-blue-300 border-blue-100/50 dark:border-blue-900/40" };
    if (pct <= 80) return { label: "Senior Engineer in Training", color: "bg-amber-50/70 text-amber-750 dark:bg-amber-950/30 dark:text-amber-300 border-amber-100/50 dark:border-amber-900/40" };
    return { label: "Master of Web Pillars", color: "bg-emerald-50/70 text-emerald-750 dark:bg-emerald-955/30 dark:text-emerald-300 border-emerald-100/50 dark:border-emerald-900/40" };
  };

  const mastery = getMasteryLevel(percentage);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs overflow-hidden" id="curriculum-tracker-box">
      {/* Tracker Header */}
      <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-650 dark:text-indigo-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase font-mono tracking-wider">
              Curriculum Mastery Tracker
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
            Mark sections completed to benchmark your core web engineering mastery.
          </p>
        </div>

        {/* Level Indicator Badge */}
        <div className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all duration-300 ${mastery.color}`}>
          {percentage === 100 ? <Trophy className="w-3.5 h-3.5 text-amber-500" /> : <Award className="w-3.5 h-3.5" />}
          <span>{mastery.label}</span>
        </div>
      </div>

      {/* Progress metrics and indicator */}
      <div className="p-5 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-3 flex flex-col items-center justify-center text-center p-4 bg-slate-50/50 dark:bg-slate-850/40 rounded-2xl border border-slate-100 dark:border-slate-800">
          <span className="text-3xl font-extrabold text-slate-950 dark:text-white font-mono tracking-tight">
            {percentage}%
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider font-mono mt-1">
            Mastery level
          </span>
          <span className="text-xs text-slate-650 dark:text-slate-300 mt-2">
            {completedCount} of {totalSections} chapters
          </span>
        </div>

        {/* Progress bar and checklists */}
        <div className="md:col-span-9 space-y-5">
          {/* Progress Bar Container */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-400 font-sans">Syllabus Progress</span>
              <span className="font-bold text-slate-850 dark:text-slate-200 font-mono">{percentage}% Complete</span>
            </div>
            <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200/50 dark:border-slate-700/50">
              <div
                className="h-full bg-slate-950 dark:bg-indigo-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Chapters Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 pt-1">
            {CURRICULUM_SECTIONS.map((section) => {
              const isCompleted = completed.includes(section.id);
              return (
                <button
                  key={section.id}
                  onClick={() => toggleSection(section.id)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer group ${
                    isCompleted
                      ? "bg-slate-950 dark:bg-indigo-650 text-white border-slate-950 dark:border-indigo-600 shadow-2xs"
                      : "bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center space-x-2 min-w-0">
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center border shrink-0 transition-all ${
                        isCompleted
                          ? "bg-amber-450 dark:bg-amber-400 border-amber-400 text-slate-950"
                          : "border-slate-300 dark:border-slate-600 group-hover:border-slate-400 bg-transparent text-transparent"
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    </span>
                    <span className="text-[11px] font-bold truncate tracking-tight">
                      {section.shortTitle.split(". ").pop()}
                    </span>
                  </div>
                  <span className={`text-[9px] font-mono shrink-0 ml-1.5 ${isCompleted ? "text-amber-300 dark:text-amber-200" : "text-slate-400 dark:text-slate-500"}`}>
                    0{section.number}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
