/**
 * Media Optimization Script
 * 
 * This script optimizes images and videos in the public directory.
 * 
 * Requirements (install globally or locally):
 * - npm install -g sharp ffmpeg-static fluent-ffmpeg
 * 
 * Usage:
 * node optimize-media.js
 */

import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const CONFIG = {
  // Image settings
  image: {
    quality: 80,
    maxWidth: 1920,
    maxHeight: 1080,
    formats: ['webp'], // Output formats
    sourceFormats: ['.jpg', '.jpeg', '.png', '.gif'],
  },
  // Video settings
  video: {
    crf: 28, // Quality (18-28 recommended, lower = better quality)
    preset: 'medium', // Encoding speed preset
    maxWidth: 1920,
    fps: 30,
    audioBitrate: '128k',
    sourceFormats: ['.mp4', '.mov', '.avi', '.webm'],
  },
  // Directories
  publicDir: path.join(__dirname, 'media-sources'),
  optimizedDir: path.join(__dirname, 'public', 'optimized'),
};

// Create optimized directory if it doesn't exist
function ensureOptimizedDir() {
  if (!fs.existsSync(CONFIG.optimizedDir)) {
    fs.mkdirSync(CONFIG.optimizedDir, { recursive: true });
  }

  const imagesDir = path.join(CONFIG.optimizedDir, 'Images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }
}

// Get file size in MB
function getFileSizeMB(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / (1024 * 1024)).toFixed(2);
}

// Check if sharp is available
async function checkSharp() {
  try {
    await import('sharp');
    return true;
  } catch (e) {
    console.log('⚠️  Sharp not found. Install it with: npm install sharp');
    return false;
  }
}

// Check if ffmpeg is available
async function checkFFmpeg() {
  try {
    await execAsync('ffmpeg -version');
    return true;
  } catch (e) {
    console.log('⚠️  FFmpeg not found. Install it: https://ffmpeg.org/download.html');
    return false;
  }
}

// Optimize image using sharp
async function optimizeImage(inputPath, outputDir) {
  const { default: sharp } = await import('sharp');
  const fileName = path.basename(inputPath, path.extname(inputPath));
  const results = [];

  try {
    // Original optimized version (same format)
    const ext = path.extname(inputPath).toLowerCase();
    const originalOutput = path.join(outputDir, path.basename(inputPath));

    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Resize if needed
    let resized = image;
    if (metadata.width > CONFIG.image.maxWidth || metadata.height > CONFIG.image.maxHeight) {
      resized = image.resize(CONFIG.image.maxWidth, CONFIG.image.maxHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    // Save optimized original format
    if (ext === '.jpg' || ext === '.jpeg') {
      await resized.jpeg({ quality: CONFIG.image.quality }).toFile(originalOutput);
    } else if (ext === '.png') {
      await resized.png({ quality: CONFIG.image.quality }).toFile(originalOutput);
    }

    const originalSize = getFileSizeMB(inputPath);
    const optimizedSize = getFileSizeMB(originalOutput);
    results.push({
      input: inputPath,
      output: originalOutput,
      originalSize,
      optimizedSize,
      savings: ((1 - optimizedSize / originalSize) * 100).toFixed(1),
    });

    // Generate WebP version
    const webpOutput = path.join(outputDir, `${fileName}.webp`);
    await sharp(inputPath)
      .resize(CONFIG.image.maxWidth, CONFIG.image.maxHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: CONFIG.image.quality })
      .toFile(webpOutput);

    const webpSize = getFileSizeMB(webpOutput);
    results.push({
      input: inputPath,
      output: webpOutput,
      originalSize,
      optimizedSize: webpSize,
      savings: ((1 - webpSize / originalSize) * 100).toFixed(1),
    });

    return results;
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
    return [];
  }
}

// Optimize video using ffmpeg
async function optimizeVideo(inputPath, outputDir) {
  const fileName = path.basename(inputPath, path.extname(inputPath));
  const outputPath = path.join(outputDir, `${fileName}.mp4`);

  try {
    const originalSize = getFileSizeMB(inputPath);

    // Get video info
    const probeCmd = `ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate -of csv=p=0 "${inputPath}"`;
    const { stdout: probeOutput } = await execAsync(probeCmd);
    const [width, height, fps] = probeOutput.trim().split(',');

    console.log(`  📹 Original: ${width}x${height} @ ${fps} fps`);

    // Build ffmpeg command
    const scale = parseInt(width) > CONFIG.video.maxWidth
      ? `scale=${CONFIG.video.maxWidth}:-2`
      : 'scale=-2:-2';

    const ffmpegCmd = `ffmpeg -i "${inputPath}" ` +
      `-vf "${scale}" ` +
      `-c:v libx264 ` +
      `-crf ${CONFIG.video.crf} ` +
      `-preset ${CONFIG.video.preset} ` +
      `-c:a aac ` +
      `-b:a ${CONFIG.video.audioBitrate} ` +
      `-movflags +faststart ` +
      `-y "${outputPath}"`;

    console.log(`  ⚙️  Encoding...`);
    await execAsync(ffmpegCmd);

    const optimizedSize = getFileSizeMB(outputPath);
    const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);

    return {
      input: inputPath,
      output: outputPath,
      originalSize,
      optimizedSize,
      savings,
    };
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
    return null;
  }
}

// Find all media files
function findMediaFiles(dir, extensions) {
  const files = [];

  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);

    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory() && item !== 'optimized') {
        traverse(fullPath);
      } else if (stat.isFile()) {
        const ext = path.extname(item).toLowerCase();
        if (extensions.includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  }

  traverse(dir);
  return files;
}

// Main function
async function main() {
  console.log('🚀 Media Optimization Script\n');
  console.log('='.repeat(60));

  // Check dependencies
  const hasSharp = await checkSharp();
  const hasFFmpeg = await checkFFmpeg();

  if (!hasSharp && !hasFFmpeg) {
    console.log('\n❌ No optimization tools available. Please install sharp or ffmpeg.');
    process.exit(1);
  }

  console.log('='.repeat(60));
  console.log('\n📁 Setting up directories...');
  ensureOptimizedDir();

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  // Optimize images
  if (hasSharp) {
    console.log('\n📸 Finding images...');
    const images = findMediaFiles(CONFIG.publicDir, CONFIG.image.sourceFormats);
    console.log(`Found ${images.length} image(s)\n`);

    for (const image of images) {
      console.log(`\n📷 Processing: ${path.basename(image)}`);
      const relativePath = path.relative(CONFIG.publicDir, path.dirname(image));
      const outputDir = path.join(CONFIG.optimizedDir, relativePath);

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      const results = await optimizeImage(image, outputDir);

      for (const result of results) {
        totalOriginalSize += parseFloat(result.originalSize);
        totalOptimizedSize += parseFloat(result.optimizedSize);

        console.log(`  ✅ ${path.basename(result.output)}`);
        console.log(`     ${result.originalSize} MB → ${result.optimizedSize} MB (${result.savings}% savings)`);
      }
    }
  }

  // Optimize videos
  if (hasFFmpeg) {
    console.log('\n🎬 Finding videos...');
    const videos = findMediaFiles(CONFIG.publicDir, CONFIG.video.sourceFormats);
    console.log(`Found ${videos.length} video(s)\n`);

    for (const video of videos) {
      console.log(`\n🎥 Processing: ${path.basename(video)}`);
      const relativePath = path.relative(CONFIG.publicDir, path.dirname(video));
      const outputDir = path.join(CONFIG.optimizedDir, relativePath);

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      const result = await optimizeVideo(video, outputDir);

      if (result) {
        totalOriginalSize += parseFloat(result.originalSize);
        totalOptimizedSize += parseFloat(result.optimizedSize);

        console.log(`  ✅ Complete`);
        console.log(`     ${result.originalSize} MB → ${result.optimizedSize} MB (${result.savings}% savings)`);
      }
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('✨ Optimization Complete!\n');
  console.log(`📊 Total original size: ${totalOriginalSize.toFixed(2)} MB`);
  console.log(`📊 Total optimized size: ${totalOptimizedSize.toFixed(2)} MB`);
  console.log(`📊 Total savings: ${((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1)}%`);
  console.log(`\n📁 Optimized files are in: ${CONFIG.optimizedDir}`);
  console.log('='.repeat(60));
  console.log('\n💡 Next steps:');
  console.log('   1. Review the optimized files');
  console.log('   2. Replace original files with optimized ones if satisfied');
  console.log('   3. Update your code to use WebP images where supported\n');
}

// Run the script
main().catch(console.error);
