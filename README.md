# Bayan Quran (بيان) — Innovative Quranic Application

> **University Practical Work (TP) Submission & Competition**  
> **Course / Subject:** Web & Cloud Application Engineering  
> **Evaluator:** Dr. Mohammed Sahraoui ([sahraoui.mohammed@outlook.com](mailto:sahraoui.mohammed@outlook.com))  
> **Repository:** [https://github.com/FidaaYl/bayan-quran](https://github.com/FidaaYl/bayan-quran)  

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/FidaaYl/bayan-quran)

---

## 📖 Overview

**Bayan Quran (بيان)** is an innovative, high-fidelity Quranic web platform engineered to synthesize the best features of modern Islamic tech applications (such as *Muhaffidh.app*, *Tarteel.ai*, *Quran.com*, and *Tafsir.one*). 

Designed specifically for academic presentation and peer voting, it combines interactive **Hifz memorization**, **thematic emotional navigation (Tadabbur)**, **multi-reciter audio synchronization**, **bilingual translations (English & French) with Tafsir**, and a **live classroom presentation quiz**.

---

## 🌟 Key Innovations

### 1. Intelligent Hifz Studio (Memorization & Recall Lab)
- **4 Progressive Cognitive Recall Modes**:
  - **Full Text Mode**: Traditional reading and review.
  - **First-Word Prompt Mode**: Displays only the first word/words of each verse to prompt active retrieval from memory (cognitive science recall method).
  - **Tap-to-Reveal / Masked Mode**: Blurs the sacred text; users recite from memory and tap the card to verify their recall.
  - **Fill-in-the-Blanks Mode**: Masks every second word with `[ ? ]` to test mid-verse retention.
- **Mastery Tracker & Spaced Review**: Mark verses as *Learning* or *Mastered* with persistent `localStorage` progress tracking and celebratory confetti upon completing a Surah.
- **Ayah-by-Ayah Audio Looper**: Repeat each verse 1x, 3x, 5x, or 10x with adjustable speed (0.75x to 1.5x) for Muraja'ah.

### 2. Thematic Spiritual Navigator (Tadabbur & Emotional Solace)
Connects real-world human emotions and life crossroads with Quranic solace:
- ⚡ **Anxiety & Overthinking (القلق وضيق الصدر)**: Ar-Ra'd 28, Al-Baqarah 286.
- 💔 **Sadness & Heartache (الحزن والمواساة)**: Ad-Duhaa 3-5, Ash-Sharh 5-6.
- 🌿 **Patience & Trials (الصبر والابتلاء)**: Al-Baqarah 153, Az-Zumar 10.
- ✨ **Gratitude & Blessings (الشكر وحمد النعم)**: Ibrahim 7.
- 🤲 **Forgiveness & Mercy (التوبة ورجاء المغفرة)**: Az-Zumar 53.
- 🧭 **Seeking Guidance (طلب الهداية والبصيرة)**: Al-Kahf 10, Al-Fatihah.
- 💼 **Sustenance & Tawakkul (الرزق والتوكل)**: At-Talaaq 2-3.
*Each theme includes Arabic script, English & French translations, Tafsir summaries, and practical Tadabbur contemplation prompts.*

### 3. Full Multi-Reciter Mushaf Reader
- Full catalog of all **114 Surahs** with instant search by Arabic name, English name, or Surah number.
- **5 World-Class Reciters**:
  - Sheikh Mishary Rashid Alafasy (Murattal)
  - Sheikh Mahmoud Khalil Al-Husary (Mastery for Hifz)
  - Sheikh AbdulBaset AbdulSamad (Murattal)
  - Sheikh Mohamed Siddiq El-Minshawi (Soulful)
  - Sheikh Abu Bakr Al-Shatri (Melodic)
- **Synchronized Audio Player Bar**: Floating bottom bar with progress scrubber, repeat counter, and automatic verse highlighting.
- **Trilingual Academic Reach**: Original Arabic Uthmani text, English (*Saheeh International*), French (*Muhammad Hamidullah*), and Arabic Tafsir (*Al-Muyassar*).

### 4. Interactive Quran Quiz Challenge
- 8 engaging Quranic knowledge questions covering historical context, Surah lengths, unique Basmalah occurrences, and revelation wisdom.
- Instant answer verification with explanatory notes and Surah references.
- Built specifically for the **live university TP presentation** to engage Dr. Sahraoui and fellow classmates.

### 5. Academic TP Submission Suite
- Built-in **TP Project Info Modal** accessible directly in the app.
- Customizable student author names and university IDs.
- One-click **"Send Submission to Prof. Sahraoui"** button that automatically pre-fills the email with the GitHub repo and deployment links.

---

## 🛠️ Technology Stack & APIs

- **Frontend:** React 19, TypeScript, Vite
- **Styling & Design System:** Tailwind CSS v4, custom Islamic typography (`Amiri Quran`, `Amiri`, `Scheherazade New`, `Plus Jakarta Sans`)
- **Icons & Visual Effects:** Lucide React, Canvas Confetti
- **APIs & Data Providers:**
  - **Al-Quran Cloud REST API** (`https://api.alquran.cloud/v1/`): Uthmani script, English (en.sahih), French (fr.hamidullah), Tafsir (ar.muyassar).
  - **EveryAyah Audio CDN** (`https://everyayah.com/`): High-bitrate audio per Ayah across multiple renowned Qaris.
  - **Tarteel QUL / Quran.com API**: Structural alignment and referencing.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18+ (tested on Node v22)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/FidaaYl/bayan-quran.git
cd bayan-quran

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)
1. Push this repository to your GitHub account.
2. Go to [https://vercel.com/new](https://vercel.com/new).
3. Import the `bayan-quran` repository.
4. Framework preset will automatically detect **Vite**.
5. Click **Deploy**!

### Deploy to Render
1. Create a **New Static Site** on Render.
2. Connect your GitHub repository.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click **Create Static Site**.

---

## 📧 Submission Contact

- **Professor:** Dr. Mohammed Sahraoui
- **Email:** [sahraoui.mohammed@outlook.com](mailto:sahraoui.mohammed@outlook.com)
- **Project:** Bayan Quran (بيان)
