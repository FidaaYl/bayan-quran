import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import confetti from 'canvas-confetti';
import {
  Zap,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkle,
  ArrowRight
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
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 max-w-3xl mx-auto w-full">
      {/* Header */}
      <div className="text-center mb-6 space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-200 dark:border-indigo-800">
          <Zap className="w-3.5 h-3.5" />
          <span>Interactive Presentation Battle</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Quranic Knowledge Challenge
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Test knowledge and engage your university audience during live evaluation.
        </p>
      </div>

      {!isFinished ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          {/* Progress Bar & Stats */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3 font-semibold">
            <span className="text-indigo-600 dark:text-indigo-400">
              Round {currentIdx + 1} of {QUIZ_QUESTIONS.length}
            </span>
            <span className="font-mono">Score: {score}</span>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mb-6 overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Question */}
          <div className="space-y-3 mb-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug">
              {question.question}
            </h2>
            {question.questionAr && (
              <p
                dir="rtl"
                className="font-arabic text-right text-base text-indigo-700 dark:text-indigo-400 font-bold"
              >
                {question.questionAr}
              </p>
            )}
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {question.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === question.correctAnswer;

              let btnClass =
                'w-full p-4 rounded-2xl text-left text-xs sm:text-sm font-semibold border transition flex items-center justify-between ';

              if (!isAnswerSubmitted) {
                btnClass +=
                  'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-indigo-500 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20 text-slate-800 dark:text-slate-200 cursor-pointer';
              } else {
                if (isCorrect) {
                  btnClass +=
                    'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-950 dark:text-emerald-200 ring-2 ring-emerald-500/20';
                } else if (isSelected && !isCorrect) {
                  btnClass +=
                    'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-950 dark:text-rose-200 ring-2 ring-rose-500/20';
                } else {
                  btnClass +=
                    'bg-slate-50/40 dark:bg-slate-800/20 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 opacity-50';
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
                    <span className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswerSubmitted && (
            <div className="mt-5 p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <div className="font-bold text-indigo-700 dark:text-indigo-300 flex items-center space-x-1.5">
                <Sparkle className="w-3.5 h-3.5 fill-current" />
                <span>Reference: {question.surahReference}</span>
              </div>
              <p className="leading-relaxed">{question.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {isAnswerSubmitted && (
            <div className="mt-5 flex justify-end">
              <button
                onClick={handleNext}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition"
              >
                <span>
                  {currentIdx + 1 === QUIZ_QUESTIONS.length ? 'Final Results' : 'Next Question'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results View */
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center">
            <Zap className="w-8 h-8 fill-current" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Challenge Finished!
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              You scored{' '}
              <span className="font-bold text-indigo-600 text-lg">
                {score} / {QUIZ_QUESTIONS.length}
              </span>{' '}
              ({Math.round((score / QUIZ_QUESTIONS.length) * 100)}%)
            </p>
          </div>

          <button
            onClick={handleRestart}
            className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition shadow-md shadow-indigo-600/30"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Challenge</span>
          </button>
        </div>
      )}
    </div>
  );
};
