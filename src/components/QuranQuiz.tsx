import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import confetti from 'canvas-confetti';
import {
  Trophy,
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  BookOpen
} from 'lucide-react';

export const QuranQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const question = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
    setIsAnswerSubmitted(true);

    if (idx === question.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsFinished(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-8 max-w-3xl mx-auto w-full">
      {/* Header */}
      <div className="text-center mb-8 space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 text-xs font-semibold">
          <Trophy className="w-3.5 h-3.5" />
          <span>Interactive Knowledge Challenge</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white">
          Quranic Knowledge & Wisdom Quiz
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
          Engage classmates and teachers during your live TP demonstration.
        </p>
      </div>

      {!isFinished ? (
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm">
          {/* Progress Bar & Question Counter */}
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-4">
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">
              Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}
            </span>
            <span className="font-mono">Current Score: {score}</span>
          </div>

          <div className="w-full bg-stone-100 dark:bg-stone-800 h-2 rounded-full mb-6 overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="space-y-3 mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 leading-snug">
              {question.question}
            </h2>
            {question.questionAr && (
              <p
                dir="rtl"
                className="font-arabic text-right text-lg text-emerald-800 dark:text-emerald-400 leading-relaxed font-semibold"
              >
                {question.questionAr}
              </p>
            )}
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            {question.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === question.correctAnswer;

              let btnClass =
                'w-full p-4 rounded-xl text-left text-sm font-semibold border transition flex items-center justify-between ';

              if (!isAnswerSubmitted) {
                btnClass +=
                  'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 text-stone-800 dark:text-stone-200 cursor-pointer';
              } else {
                if (isCorrect) {
                  btnClass +=
                    'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-500 text-emerald-950 dark:text-emerald-200 ring-2 ring-emerald-500/20';
                } else if (isSelected && !isCorrect) {
                  btnClass +=
                    'bg-rose-100 dark:bg-rose-950/80 border-rose-500 text-rose-950 dark:text-rose-200 ring-2 ring-rose-500/20';
                } else {
                  btnClass +=
                    'bg-stone-50/50 dark:bg-stone-800/30 border-stone-200 dark:border-stone-800 text-stone-400 dark:text-stone-600 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswerSubmitted}
                  onClick={() => handleSelectOption(idx)}
                  className={btnClass}
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-md bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswerSubmitted && (
            <div className="mt-6 p-4 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs sm:text-sm text-stone-700 dark:text-stone-300 space-y-1 animate-fadeIn">
              <div className="font-bold text-emerald-800 dark:text-emerald-400 flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Explanation & Context ({question.surahReference})</span>
              </div>
              <p className="leading-relaxed">{question.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {isAnswerSubmitted && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleNext}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-700/20 transition"
              >
                <span>
                  {currentIdx + 1 === QUIZ_QUESTIONS.length ? 'See Final Score' : 'Next Question'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results View */
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-8 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 mx-auto flex items-center justify-center">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
              Quiz Completed!
            </h2>
            <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">
              You scored{' '}
              <span className="font-bold text-emerald-600 text-lg">
                {score} / {QUIZ_QUESTIONS.length}
              </span>{' '}
              ({Math.round((score / QUIZ_QUESTIONS.length) * 100)}%)
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 max-w-md mx-auto text-xs text-stone-600 dark:text-stone-300">
            {score === QUIZ_QUESTIONS.length && '🌟 Perfect Score! Masha\'Allah, exceptional Quranic knowledge!'}
            {score >= QUIZ_QUESTIONS.length / 2 && score < QUIZ_QUESTIONS.length && 'Great performance! Keep reviewing and reflecting on the verses.'}
            {score < QUIZ_QUESTIONS.length / 2 && 'Good try! The best way to learn is by continuing your journey through the Holy Quran.'}
          </div>

          <button
            onClick={handleRestart}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition shadow-md shadow-emerald-700/20"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Challenge</span>
          </button>
        </div>
      )}
    </div>
  );
};
