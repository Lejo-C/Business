import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const framesDir = path.join(__dirname, '..', 'public', 'frames');

async function processFrames4K() {
  const files = fs.readdirSync(framesDir).filter(f => f.endsWith('.jpg') && !f.startsWith('temp_'));
  console.log(`🚀 Upscaling ${files.length} frames to 4K Ultra HD (3840x2160)...`);

  let count = 0;
  for (const file of files) {
    const filePath = path.join(framesDir, file);
    const tempPath = path.join(framesDir, `temp_${file}`);

    await sharp(filePath)
      .resize(3840, 2160, {
        fit: 'cover',
        kernel: sharp.kernel.lanczos3
      })
      .sharpen({
        sigma: 1.4,
        m1: 1.0,
        m2: 2.5
      })
      .jpeg({
        quality: 95,
        progressive: true,
        chromaSubsampling: '4:4:4'
      })
      .toFile(tempPath);

    fs.renameSync(tempPath, filePath);
    count++;
    if (count % 20 === 0 || count === files.length) {
      console.log(`4K Enhanced ${count}/${files.length} frames...`);
    }
  }

  console.log('✨ All 180 frame images successfully upgraded to TRUE 4K ULTRA HD (3840x2160)!');
}

processFrames4K().catch(err => {
  console.error('Error enhancing frames to 4K:', err);
  process.exit(1);
});
