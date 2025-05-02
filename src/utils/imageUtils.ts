import sharp from 'sharp';

export async function optimizeImage(inputPath: string): Promise<Buffer> {
  return sharp(inputPath)
    .webp({ quality: 80 })
    .resize(1200, null, {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .toBuffer();
}

export async function generateThumbnail(inputPath: string): Promise<Buffer> {
  return sharp(inputPath)
    .webp({ quality: 70 })
    .resize(400, 300, {
      fit: 'cover',
      position: 'attention' // Uses smart cropping to focus on the important parts
    })
    .toBuffer();
}

// Helper function to check if a file is an image
export function isImage(filename: string): boolean {
  return /\.(jpg|jpeg|png|gif)$/i.test(filename);
}

// Helper function to get the optimized image path
export function getOptimizedImagePath(originalPath: string, isThumb = false): string {
  if (originalPath.startsWith('/src/blogs/images/')) {
    const fileName = originalPath.split('/').pop();
    if (!fileName) return originalPath;
    
    const baseName = fileName.split('.')[0];
    return `/images/blog/${baseName}${isThumb ? '-thumb' : ''}.webp`;
  }
  return originalPath;
}