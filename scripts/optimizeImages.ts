import fs from 'fs/promises';
import path from 'path';
import { optimizeImage, generateThumbnail } from '../src/utils/imageUtils';

const BLOG_IMAGES_DIR = path.join(process.cwd(), 'src', 'blogs', 'images');
const PUBLIC_IMAGES_DIR = path.join(process.cwd(), 'public', 'images', 'blog');

async function ensureDirectoryExists(dir: string) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function optimizeImages() {
  try {
    // Create output directory if it doesn't exist
    await ensureDirectoryExists(PUBLIC_IMAGES_DIR);

    // Get all images from the blog images directory
    const files = await fs.readdir(BLOG_IMAGES_DIR);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif)$/i.test(file)
    );

    // Process each image
    for (const file of imageFiles) {
      const sourcePath = path.join(BLOG_IMAGES_DIR, file);
      const fileName = path.parse(file).name;
      
      // Generate optimized image
      const optimizedImage = await optimizeImage(sourcePath);
      await fs.writeFile(
        path.join(PUBLIC_IMAGES_DIR, `${fileName}.webp`),
        optimizedImage
      );

      // Generate thumbnail
      const thumbnail = await generateThumbnail(sourcePath);
      await fs.writeFile(
        path.join(PUBLIC_IMAGES_DIR, `${fileName}-thumb.webp`),
        thumbnail
      );

      console.log(`✓ Processed ${file}`);
    }

    console.log('\nImage optimization complete!');
  } catch (error) {
    console.error('Error during image optimization:', error);
    process.exit(1);
  }
}

optimizeImages();