import React, { useState, useEffect } from 'react';
import { useQuran } from '../context/QuranContext';
import {
  X,
  GraduationCap,
  Mail,
  Copy,
  Check,
  ExternalLink,
  Code2,
  Sparkles,
  Users,
  Award
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
    return localStorage.getItem('bayan_student_1') || 'Fidaa & Partner';
  });
  const [student2, setStudent2] = useState(() => {
    return localStorage.getItem('bayan_student_2') || '';
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    localStorage.setItem('bayan_student_1', student1);
  }, [student1]);

  useEffect(() => {
    localStorage.setItem('bayan_student_2', student2);
  }, [student2]);

  if (!isProjectInfoOpen) return null;

  const emailSubject = encodeURIComponent(
    `[TP Submission] Innovative Quranic Application - ${student1}${student2 ? ' & ' + student2 : ''}`
  );

  const emailBodyText = `Dear Professor Sahraoui,

Please find our submission for the Innovative Quranic Application TP competition:

• Project Name: Bayan Quran (بيان)
• Student Authors: ${student1}${student2 ? ' & ' + student2 : ''}
• Live Deployed URL: ${deployUrl}
• GitHub Repository: ${repoUrl}

Key Innovations:
1. Intelligent Hifz Studio: Progressive recall (First-Word prompts, masked verses, blank fill-ins, mastery tracking & spaced review).
2. Thematic Spiritual Navigator: Real-life emotional & psychological themes (Anxiety, Sadness, Sabr, Forgiveness, Tawakkul) with curated Ayahs, Tadabbur prompts, and audio.
3. Multi-Reciter Synchronized Mushaf: 5 renowned reciters, ayah repeat looper for memorization, and dual French & English translations + Tafsir Al-Muyassar.
4. Interactive Quran Quiz Challenge: Live classroom presentation quiz.

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900 dark:text-white">
                University TP Academic Submission
              </h2>
              <p className="text-xs text-stone-400">
                Evaluation by Dr. Mohammed Sahraoui & Academic Jury
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsProjectInfoOpen(false)}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-sm">
          {/* Competition Badge */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-emerald-50 dark:from-amber-950/30 dark:to-emerald-950/30 border border-amber-200/60 dark:border-amber-900/40 flex items-start space-x-3">
            <Award className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-amber-900 dark:text-amber-200">
                TP Competition (10 PTS Bonus):
              </span>
              <p className="text-stone-600 dark:text-stone-300 mt-0.5">
                Evaluated and voted on by students and academics. Built with modern web engineering,
                sublime UI/UX, and genuine Quranic innovation.
              </p>
            </div>
          </div>

          {/* Student Names (Editable) */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider flex items-center space-x-1.5">
              <Users className="w-3.5 h-3.5 text-emerald-600" />
              <span>Student Author(s) / Collaborators</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] text-stone-400">Student 1 (Full Name / ID):</span>
                <input
                  type="text"
                  value={student1}
                  onChange={e => setStudent1(e.target.value)}
                  placeholder="e.g. Sarah Benali (ID: 20240123)"
                  className="w-full mt-1 px-3 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <span className="text-[11px] text-stone-400">Student 2 (Optional Partner):</span>
                <input
                  type="text"
                  value={student2}
                  onChange={e => setStudent2(e.target.value)}
                  placeholder="e.g. Partner Name (or leave blank if solo)"
                  className="w-full mt-1 px-3 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Key Innovations Checklist */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Innovative Pillars Implemented</span>
            </span>
            <ul className="text-xs space-y-1.5 text-stone-600 dark:text-stone-300">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>
                  <strong>Intelligent Hifz Studio:</strong> 4 cognitive recall modes (Full, First
                  Words, Tap-to-Reveal, and Blank fill-ins) with mastery tracker.
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>
                  <strong>Thematic Navigator (Tadabbur):</strong> Emotional connection to verses
                  (Anxiety, Sabr, Grief, Gratitude) with contemplation prompts.
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>
                  <strong>Full Multi-Reciter Mushaf:</strong> Synchronized audio playback with
                  Alafasy, Husary, AbdulBaset, Minshawy & Shatri with repeat looper.
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>
                  <strong>Trilingual Academic Reach:</strong> Original Arabic Uthmani, English
                  Saheeh, French Hamidullah, and Arabic Tafsir Al-Muyassar.
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>
                  <strong>Interactive Quran Quiz:</strong> Engaging presentation feature to test
                  knowledge live during classroom TP defense.
                </span>
              </li>
            </ul>
          </div>

          {/* Teacher Submission Links */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-stone-500">Instructor:</span>
              <span className="font-mono text-stone-800 dark:text-stone-200">
                sahraoui.mohammed@outlook.com
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-stone-500">GitHub Repo:</span>
              <a
                href={repoUrl}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-emerald-600 hover:underline flex items-center space-x-1"
              >
                <span>{repoUrl}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-stone-500">Deployment:</span>
              <span className="font-mono text-emerald-600">{deployUrl}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={mailtoLink}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-md shadow-emerald-800/20 transition"
            >
              <Mail className="w-4 h-4" />
              <span>Send Submission to Prof. Sahraoui</span>
            </a>

            <button
              onClick={handleCopySubmission}
              className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-semibold text-xs transition"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Submission Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Submission Text</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
