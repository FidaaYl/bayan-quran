# Qabas Quran (قَبَس) — Smart Memorization & Audio Tafsir Navigator

> **University Practical Work (TP) Submission & Competition**  
> **Course / Subject:** Web & Cloud Application Engineering  
> **Evaluator:** Dr. Mohammed Sahraoui ([sahraoui.mohammed@outlook.com](mailto:sahraoui.mohammed@outlook.com))  
> **Repository:** [https://github.com/FidaaYl/bayan-quran](https://github.com/FidaaYl/bayan-quran)  
> **Live Deployed App:** [https://fidaayl.github.io/bayan-quran/](https://fidaayl.github.io/bayan-quran/)  

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/FidaaYl/bayan-quran)

---

## 📖 Overview

**Qabas (قَبَس)** is an innovative, sleek Quranic web application engineered with a clean modern aesthetic, combining active recall memorization tools, comparative Audio Tafsir & Revelation Context (*Asbab an-Nuzul*), a floating dynamic audio dock, and an interactive presentation trivia challenge.

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

### 2. Audio Tafsir & Revelation Context Studio (Asbab an-Nuzul)
Inspired directly by `read.tafsir.one`:
- **Comparative Classical Exegesis**: Side-by-side study of **Tafsir As-Sa'di** (*Taysir al-Karim al-Rahman*) and **Tafsir Ibn Kathir** (*Tafsir al-Qur'an al-'Azim*).
- **Asbab an-Nuzul (أسباب النزول)**: The historical context, companion narrations, and circumstances surrounding the revelation of celebrated Quranic passages (e.g. Ayat al-Kursi, Surat Ad-Duha, Surat Al-Kawthar, Surat Al-Ikhlas, Cave of Thawr).
- **Moral Lessons & Takeaways**: Actionable moral and intellectual principles extracted from each passage.
- **Direct Audio Recitation**: High-bitrate recitation with one-click listening.

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
- Built specifically for the **live university TP presentation** to engage Dr. Sahraoui and fellow classmates.

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
