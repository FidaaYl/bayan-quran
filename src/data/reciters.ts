import { Reciter } from '../types/quran';

export const RECITERS_CATALOG: Reciter[] = [
  {
    id: 'alafasy',
    name: 'Mishary Rashid Alafasy (مشاري العفاسي)',
    subfolder: 'Alafasy_128kbps',
    bitrate: '128kbps',
    style: 'Murattal'
  },
  {
    id: 'husary',
    name: 'Mahmoud Khalil Al-Husary (محمود خليل الحصري)',
    subfolder: 'Husary_128kbps',
    bitrate: '128kbps',
    style: 'Tajweed Mastery (Ideal for Hifz)'
  },
  {
    id: 'abdulbasit',
    name: 'AbdulBaset AbdulSamad (عبد الباسط عبد الصمد)',
    subfolder: 'Abdul_Basit_Murattal_192kbps',
    bitrate: '192kbps',
    style: 'Murattal'
  },
  {
    id: 'minshawy',
    name: 'Mohamed Siddiq El-Minshawi (محمد صديق المنشاوي)',
    subfolder: 'Minshawy_Murattal_128kbps',
    bitrate: '128kbps',
    style: 'Soulful Murattal'
  },
  {
    id: 'shatri',
    name: 'Abu Bakr Al-Shatri (أبو بكر الشاطري)',
    subfolder: 'Abu_Bakr_Ash-Shaatree_128kbps',
    bitrate: '128kbps',
    style: 'Warm Melody'
  }
];

export function getAyahAudioUrl(surahNumber: number, ayahInSurah: number, reciterSubfolder: string = 'Alafasy_128kbps'): string {
  const surahPadded = String(surahNumber).padStart(3, '0');
  const ayahPadded = String(ayahInSurah).padStart(3, '0');
  return `https://everyayah.com/data/${reciterSubfolder}/${surahPadded}${ayahPadded}.mp3`;
}
