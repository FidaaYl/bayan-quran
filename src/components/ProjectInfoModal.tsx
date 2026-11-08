import React, { useState, useEffect } from 'react';
import { useQuran } from '../context/QuranContext';
import {
  X,
  GraduationCap,
  Mail,
  Copy,
  Check,
  ExternalLink,
  Users,
  Award,
  Sparkle
} from 'lucide-react';

interface ProjectInfoModalProps {
  repoUrl?: string;
  deployUrl?: string;
}

export const ProjectInfoModal: React.FC<ProjectInfoModalProps> = ({
  repoUrl = 'https://github.com/FidaaYl/bayan-quran',
  deployUrl = window.location.origin
}) => {
  const { isProjectInfoOpen, setIsProjectInfoOpen } = useQuran();

  const [student1, setStudent1] = useState(() => {
    return localStorage.getItem('qabas_student_1') || 'Student Name (ID: ...)';
  });
  const [student2, setStudent2] = useState(() => {
    return localStorage.getItem('qabas_student_2') || '';
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    localStorage.setItem('qabas_student_1', student1);
  }, [student1]);

  useEffect(() => {
    localStorage.setItem('qabas_student_2', student2);
  }, [student2]);

  if (!isProjectInfoOpen) return null;

  const emailSubject = encodeURIComponent(
    `[TP Submission] Innovative Quranic Application - Qabas - ${student1}${student2 ? ' & ' + student2 : ''}`
  );

  const emailBodyText = `Dear Professor Sahraoui,

Please find our submission for the Innovative Quranic Application TP competition:

• Project Name: Qabas (قَبَس) — Smart Memorization & Audio Navigator
• Student Author(s): ${student1}${student2 ? ' & ' + student2 : ''}
• Live Deployed URL: ${deployUrl}
• GitHub Repository: ${repoUrl}

Key Innovations:
1. Cognitive Hifz Lab: 4 distinct recall modes (First-word prompts, tap-to-reveal masked verses, cloze blanks fill-ins) with spaced repetition and audio looper.
2. Life & Tadabbur Navigator: Verses categorized for psychological and emotional well-being (Anxiety, Sadness, Sabr, Forgiveness, Guidance, Tawakkul) with contemplation prompts.
3. Synchronized Multi-Reciter Mushaf: 5 world-class reciters, dual French & English translations, and Tafsir Al-Muyassar.
4. Interactive Quiz Battle: Real-time knowledge challenge for live classroom presentation.

Best regards,
${student1}${student2 ? '\n' + student2 : ''}`;

  const mailtoLink = `mailto:sahraoui.mohammed@outlook.com?subject=${emailSubject}&body=${encodeURIComponent(
    emailBodyText
  )}`;

  const handleCopySubmission = () => {
    navigator.clipboard.writeText(emailBodyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                University TP Academic Submission
              </h2>
              <p className="text-[11px] text-slate-400">
                Evaluation by Dr. Mohammed Sahraoui & Peer Voting
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsProjectInfoOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs sm:text-sm">
          {/* Competition Badge */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50/80 to-amber-50/80 dark:from-indigo-950/40 dark:to-slate-800 border border-indigo-200/80 dark:border-indigo-900/60 flex items-start space-x-3">
            <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-indigo-950 dark:text-indigo-200">
                TP Competition (10 PTS Bonus):
              </span>
              <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                Engineered with a modern Nordic minimalist aesthetic, cognitive recall memorization tools, and live presentation trivia.
              </p>
            </div>
          </div>

          {/* Student Names (Editable) */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
              <Users className="w-3.5 h-3.5 text-indigo-600" />
              <span>Student Author(s)</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <span className="text-[10px] text-slate-400">Student 1 (Full Name / ID):</span>
                <input
                  type="text"
                  value={student1}
                  onChange={e => setStudent1(e.target.value)}
                  placeholder="e.g. Sarah Benali (ID: 20240123)"
                  className="w-full mt-1 px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400">Student 2 (Optional Partner):</span>
                <input
                  type="text"
                  value={student2}
                  onChange={e => setStudent2(e.target.value)}
                  placeholder="e.g. Partner Name (or leave blank)"
                  className="w-full mt-1 px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Submission Details */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-500">Instructor:</span>
              <span className="font-mono text-slate-800 dark:text-slate-200">
                sahraoui.mohammed@outlook.com
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-500">GitHub Repo:</span>
              <a
                href={repoUrl}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-indigo-600 hover:underline flex items-center space-x-1"
              >
                <span>{repoUrl}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-500">Live URL:</span>
              <span className="font-mono text-indigo-600">{deployUrl}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
            <a
              href={mailtoLink}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition"
            >
              <Mail className="w-4 h-4" />
              <span>Send Submission to Prof. Sahraoui</span>
            </a>

            <button
              onClick={handleCopySubmission}
              className="flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Text</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
