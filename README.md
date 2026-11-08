# Qabas Quran (قَبَس) — Smart Memorization & Audio Navigator

> **University Practical Work (TP) Submission & Competition**  
> **Course / Subject:** Web & Cloud Application Engineering  
> **Evaluator:** Dr. Mohammed Sahraoui ([sahraoui.mohammed@outlook.com](mailto:sahraoui.mohammed@outlook.com))  
> **Repository:** [https://github.com/FidaaYl/bayan-quran](https://github.com/FidaaYl/bayan-quran)  
> **Live Deployed App:** [https://fidaayl.github.io/bayan-quran/](https://fidaayl.github.io/bayan-quran/)  

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/FidaaYl/bayan-quran)

---

## 📖 Overview

**Qabas (قَبَس)** is an innovative, sleek Quranic web application engineered with a clean modern aesthetic, combining active recall memorization tools, thematic emotional reflection, a floating dynamic audio dock, and an interactive presentation trivia challenge.

Inspired by modern learning psychology and cognitive science, Qabas provides students and reciters with an active, focused environment to study, memorize, and contemplate the Holy Quran.

---

## 🌟 Key Innovations

### 1. Cognitive Recall Hifz Lab
- **4 Distinct Recall Modes**:
  - **Full Text Mode**: Traditional reading and review.
  - **First-Word Prompt Mode**: Displays only the first word/words of each verse to prompt active cognitive retrieval.
  - **Tap-to-Unmask Mode**: Completely masks the text; users recite from memory and tap the card to verify their recall.
  - **Cloze Blanks Mode**: Conceals key words with `[...]` to test retention within verses.
- **Mastery Tracker**: Mark verses as *Learning* or *Mastered* with persistent `localStorage` progress tracking and celebratory confetti upon completing a chapter.
- **Ayah-by-Ayah Looper**: Repeat each verse 1x, 3x, 5x, or 10x with adjustable speed (0.75x to 1.5x).

### 2. Life & Tadabbur Navigator
Connects real-world human emotions and life crossroads with Quranic solace:
- ⚡ **Anxiety & Overthinking (القلق وضيق الصدر)**: Ar-Ra'd 28, Al-Baqarah 286.
- 💔 **Sadness & Heartache (الحزن والمواساة)**: Ad-Duhaa 3-5, Ash-Sharh 5-6.
- 🌿 **Patience & Trials (الصبر والابتلاء)**: Al-Baqarah 153, Az-Zumar 10.
- ✨ **Gratitude & Blessings (الشكر وحمد النعم)**: Ibrahim 7.
- 🤲 **Forgiveness & Mercy (التوبة ورجاء المغفرة)**: Az-Zumar 53.
- 🧭 **Seeking Guidance (طلب الهداية والبصيرة)**: Al-Kahf 10, Al-Fatihah.
- 💼 **Sustenance & Tawakkul (الرزق والتوكل)**: At-Talaaq 2-3.
*Each theme includes Arabic script, English & French translations, Tafsir summaries, and practical Tadabbur contemplation prompts.*

### 3. Synchronized Multi-Reciter Mushaf
- Full catalog of all **114 Surahs** with instant search by Arabic name, English name, or Surah number.
- **5 World-Class Reciters**:
  - Sheikh Mishary Rashid Alafasy (Murattal)
  - Sheikh Mahmoud Khalil Al-Husary (Mastery for Hifz)
  - Sheikh AbdulBaset AbdulSamad (Murattal)
  - Sheikh Mohamed Siddiq El-Minshawi (Soulful)
  - Sheikh Abu Bakr Al-Shatri (Melodic)
- **Floating Dynamic Island Audio Player**: Sleek floating capsule with soundwave animations, scrubber, and repeat controls.
- **Trilingual Academic Reach**: Original Arabic Uthmani text, English (*Saheeh International*), French (*Muhammad Hamidullah*), and Arabic Tafsir (*Al-Muyassar*).

### 4. Interactive Quiz Battle
- 8 engaging Quranic knowledge questions covering historical context, Surah lengths, unique Basmalah occurrences, and revelation wisdom.
- Instant answer verification with explanatory notes and Surah references.
- Tailored for the **live university TP presentation** to engage Dr. Sahraoui and fellow classmates.

### 5. Academic TP Submission Suite
- Built-in **TP Info Modal** accessible directly in the app.
- Customizable student author names and university IDs.
- One-click **"Send Submission to Prof. Sahraoui"** button that automatically pre-fills the email with the GitHub repo and deployment links.

---

## 🛠️ Technology Stack & APIs

- **Frontend:** React 19, TypeScript, Vite
- **Styling & Design System:** Tailwind CSS v4, modern geometric typography (`Cairo`, `Outfit`, `Noto Sans Arabic`)
- **Icons & Visual Effects:** Lucide React, Canvas Confetti
- **APIs & Data Providers:**
  - **Al-Quran Cloud REST API** (`https://api.alquran.cloud/v1/`): Multi-edition text and Tafsir.
  - **EveryAyah Audio CDN** (`https://everyayah.com/`): High-bitrate audio per Ayah.
  - **Tarteel QUL / Quran.com API**: Structural alignment and referencing.

---

## 🚀 Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/FidaaYl/bayan-quran.git
cd bayan-quran

# Install dependencies
npm install

# Start local development server
npm run dev
```

---

## 🌐 Deployment

### Deploy to GitHub Pages (Automatic)
This repository includes a GitHub Actions workflow that automatically builds and deploys to GitHub Pages on every push to `main`.

### Deploy to Vercel
1. Go to [https://vercel.com/new](https://vercel.com/new).
2. Import the `bayan-quran` repository.
3. Click **Deploy**.

---

## 📧 Submission Contact

- **Professor:** Dr. Mohammed Sahraoui
- **Email:** [sahraoui.mohammed@outlook.com](mailto:sahraoui.mohammed@outlook.com)
- **Project:** Qabas (قَبَس)
