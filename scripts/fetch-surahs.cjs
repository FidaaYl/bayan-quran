const fs = require('fs');
const path = require('path');

async function main() {
  const res = await fetch('https://api.alquran.cloud/v1/surah');
  const json = await res.json();
  const surahs = json.data;
  const targetDir = path.resolve(__dirname, '../src/data');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  const targetPath = path.join(targetDir, 'surahs.ts');
  const content = `import { SurahMeta } from '../types/quran';\n\nexport const SURAHS_CATALOG: SurahMeta[] = ${JSON.stringify(surahs, null, 2)};\n`;
  fs.writeFileSync(targetPath, content, 'utf8');
  console.log('Successfully wrote', surahs.length, 'surahs to', targetPath);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
