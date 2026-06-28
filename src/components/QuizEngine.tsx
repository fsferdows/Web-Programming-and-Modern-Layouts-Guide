import React, { useState } from "react";
import { QUIZ_QUESTIONS, FLASHCARDS } from "../data/curriculum";
import { 
  GraduationCap, CheckCircle2, XCircle, ChevronRight, ChevronLeft, 
  RefreshCw, BookOpen, HelpCircle, Sparkles, Award
} from "lucide-react";

export default function QuizEngine() {
  const [activeMode, setActiveMode] = useState<"quiz" | "flashcards">("quiz");

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  // Flashcards state
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Handle quiz selection
  const handleAnswerSelection = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedAnswerIndex(optionIdx);
    setIsAnswered(true);

    const isCorrect = optionIdx === QUIZ_QUESTIONS[currentQuestionIndex].correctAnswerIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setUserAnswers(prev => [...prev, optionIdx]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswerIndex(null);
      setIsAnswered(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setIsAnswered(false);
    setScore(0);
    setQuizComplete(false);
    setUserAnswers([]);
  };

  // Flashcards navigation
  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev + 1) % FLASHCARDS.length);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev - 1 + FLASHCARDS.length) % FLASHCARDS.length);
    }, 150);
  };

  return (
    <div className="py-6 space-y-6" id="quiz-engine-root">
      {/* Selector tab header */}
      <div className="bg-white border border-slate-200 p-5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Active Knowledge Verification</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Browse revision flashcards or take the comprehensive 12-question curriculum test.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveMode("quiz")}
            className={`px-4 py-2 rounded-lg text-xs font-bold font-mono uppercase tracking-wider cursor-pointer border transition-all ${
              activeMode === "quiz"
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
            }`}
          >
            📋 Practice Exam
          </button>
          <button
            onClick={() => setActiveMode("flashcards")}
            className={`px-4 py-2 rounded-lg text-xs font-bold font-mono uppercase tracking-wider cursor-pointer border transition-all ${
              activeMode === "flashcards"
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
            }`}
          >
            ⚡ Flashcards
          </button>
        </div>
      </div>

      {activeMode === "quiz" ? (
        /* PRACTICE QUIZ INTERFACE */
        <div className="max-w-3xl mx-auto" id="quiz-active-interface">
          {!quizComplete ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 space-y-6 shadow-sm">
              {/* Question Header Status */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <span className="text-xs font-bold font-mono text-indigo-600 tracking-wider uppercase">
                  QUESTION {currentQuestionIndex + 1} OF {QUIZ_QUESTIONS.length}
                </span>
                <span className="text-xs font-semibold text-slate-400 font-mono">
                  Topic: {QUIZ_QUESTIONS[currentQuestionIndex].sectionId.replace("-", " ").toUpperCase()}
                </span>
              </div>

              {/* The Question Text */}
              <h3 className="text-lg font-bold text-slate-900 leading-snug">
                {QUIZ_QUESTIONS[currentQuestionIndex].question}
              </h3>

              {/* Options list */}
              <div className="space-y-3" id="quiz-options-container">
                {QUIZ_QUESTIONS[currentQuestionIndex].options.map((option, idx) => {
                  const isSelected = selectedAnswerIndex === idx;
                  const isCorrectAnswer = idx === QUIZ_QUESTIONS[currentQuestionIndex].correctAnswerIndex;
                  
                  let optionStyle = "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800";
                  let iconElement = null;

                  if (isAnswered) {
                    if (isCorrectAnswer) {
                      optionStyle = "bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold";
                      iconElement = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
                    } else if (isSelected) {
                      optionStyle = "bg-rose-50 border-rose-400 text-rose-900 font-semibold";
                      iconElement = <XCircle className="w-5 h-5 text-rose-600 shrink-0" />;
                    } else {
                      optionStyle = "bg-white border-slate-100 text-slate-400 opacity-60";
                    }
                  } else if (isSelected) {
                    optionStyle = "bg-indigo-50 border-indigo-500 text-indigo-900 font-semibold";
                  }

                  return (
                    <button
                      key={idx}
                      id={`quiz-option-${idx}`}
                      onClick={() => handleAnswerSelection(idx)}
                      disabled={isAnswered}
                      className={`w-full text-left p-4 rounded-xl border text-sm flex items-center justify-between gap-4 transition-all ${optionStyle} ${
                        !isAnswered ? "cursor-pointer" : "cursor-default"
                      }`}
                    >
                      <span>{option}</span>
                      {iconElement}
                    </button>
                  );
                })}
              </div>

              {/* Explanatory Rational Detail Card (shown only after answering) */}
              {isAnswered && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 animate-fadeIn space-y-1.5" id="answer-explanation">
                  <div className="flex items-center space-x-2 text-indigo-700 font-bold text-xs font-mono uppercase">
                    <HelpCircle className="w-4 h-4 text-indigo-600" />
                    <span>Learning Explanation Summary:</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-6">
                    {QUIZ_QUESTIONS[currentQuestionIndex].explanation}
                  </p>
                </div>
              )}

              {/* Navigation trigger button */}
              {isAnswered && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextQuestion}
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-5 py-2.5 rounded-lg flex items-center space-x-2 shadow-sm cursor-pointer"
                  >
                    <span>{currentQuestionIndex === QUIZ_QUESTIONS.length - 1 ? "Complete Exam" : "Next Question"}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* QUIZ END / RESULTS DISPLAY */
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-6 shadow-sm" id="quiz-results-card">
              <div className="mx-auto bg-indigo-50 text-indigo-600 w-16 h-16 rounded-full flex items-center justify-center shadow-inner">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Practice Exam Finished!</h3>
                <p className="text-sm text-slate-500">
                  You resolved the curriculum exercises. Here is your structured metric report card.
                </p>
              </div>

              <div className="bg-slate-50 max-w-sm mx-auto border rounded-xl p-6 grid grid-cols-2 gap-4">
                <div className="border-r">
                  <div className="text-2xl font-black text-slate-900">{score} / {QUIZ_QUESTIONS.length}</div>
                  <div className="text-[10px] text-slate-400 font-mono uppercase mt-1">Raw Score</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-indigo-600">
                    {Math.round((score / QUIZ_QUESTIONS.length) * 100)}%
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono uppercase mt-1">Accuracy Grade</div>
                </div>
              </div>

              <div className="text-xs max-w-md mx-auto text-slate-600 leading-relaxed bg-amber-50 border border-amber-100 p-4 rounded-xl">
                {score === QUIZ_QUESTIONS.length ? (
                  <strong>🥇 Pristine Score!</strong>
                ) : score >= 8 ? (
                  <strong>🌟 Excellent Competency!</strong>
                ) : (
                  <strong>📚 Review Recommended!</strong>
                )}{" "}
                {score === QUIZ_QUESTIONS.length 
                  ? "You have achieved flawless mastery across DNS routing, accessibility laws, CSS selector priority vectors, and responsive grid layouts!"
                  : score >= 8
                  ? "You have solid capabilities. Check our Interactive Playground to cement the display block-flow positioning concepts you missed."
                  : "We suggest browsing our Interactive Study Guide and checking display mechanics in our playground before re-attempting."}
              </div>

              <button
                onClick={resetQuiz}
                className="bg-slate-900 text-white hover:bg-slate-850 px-6 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 mx-auto shadow-sm cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retake Quiz Exam</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        /* FLASHCARDS INTERFACE */
        <div className="max-w-xl mx-auto space-y-6" id="flashcards-active-interface">
          <div className="text-center">
            <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-3 py-1 rounded-full uppercase font-bold">
              Card {currentCardIndex + 1} of {FLASHCARDS.length} — category: {FLASHCARDS[currentCardIndex].category}
            </span>
          </div>

          {/* Flashcard container */}
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="perspective-[1000px] w-full min-h-[220px] cursor-pointer"
            id="flashcard-element"
          >
            <div 
              style={{
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                transformStyle: "preserve-3d"
              }}
              className="relative w-full h-full min-h-[220px] transition-transform duration-300 shadow-md border rounded-2xl bg-white"
            >
              {/* Front view */}
              <div 
                style={{ backfaceVisibility: "hidden" }}
                className="absolute inset-0 p-6 flex flex-col justify-between"
              >
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold tracking-widest flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" /> Concept Question
                </div>
                
                <h4 className="text-base font-bold text-slate-900 text-center leading-relaxed">
                  {FLASHCARDS[currentCardIndex].front}
                </h4>

                <div className="text-[10px] text-center text-slate-400 uppercase tracking-wider font-mono font-bold animate-pulse">
                  👆 Click Card To View Response
                </div>
              </div>

              {/* Back view */}
              <div 
                style={{ 
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)"
                }}
                className="absolute inset-0 p-6 flex flex-col justify-between bg-slate-950 text-white rounded-2xl"
              >
                <div className="text-[10px] uppercase font-mono text-indigo-400 font-bold tracking-widest flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Resolved Core Answer
                </div>

                <p className="text-sm font-semibold leading-relaxed text-slate-100 text-center">
                  {FLASHCARDS[currentCardIndex].back}
                </p>

                <div className="text-[10px] text-center text-indigo-400 uppercase tracking-wider font-mono font-bold">
                  Click card to view question
                </div>
              </div>
            </div>
          </div>

          {/* Flashcard navigation buttons */}
          <div className="flex justify-between items-center px-4">
            <button
              onClick={prevCard}
              className="bg-white border text-slate-700 hover:bg-slate-50 p-2 rounded-xl flex items-center space-x-1.5 text-xs font-semibold shadow-xs cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={nextCard}
              className="bg-white border text-slate-700 hover:bg-slate-50 p-2 rounded-xl flex items-center space-x-1.5 text-xs font-semibold shadow-xs cursor-pointer"
            >
              <span>Next Card</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
