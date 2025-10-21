import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const publicDir = path.join(__dirname, '..', 'public');

// Create SVG for the Temu logo
const createSVG = (size) => `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FF6F00;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#FF8F00;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#grad)"/>
  <text x="50%" y="54%" font-family="Arial, sans-serif" font-size="${size * 0.55}" font-weight="900" fill="white" text-anchor="middle" dominant-baseline="middle">T</text>
</svg>
`;

async function generateIcons() {
  console.log('🎨 Generating PWA icons...\n');

  for (const size of sizes) {
    const svg = createSVG(size);
    const outputPath = path.join(publicDir, `icon-${size}x${size}.png`);

    try {
      await sharp(Buffer.from(svg))
        .png()
        .toFile(outputPath);

      console.log(`✅ Generated: icon-${size}x${size}.png`);
    } catch (error) {
      console.error(`❌ Failed to generate icon-${size}x${size}.png:`, error);
    }
  }

  // Generate favicon
  const faviconSVG = createSVG(32);
  const faviconPath = path.join(publicDir, 'favicon.ico');

  try {
    await sharp(Buffer.from(faviconSVG))
      .resize(32, 32)
      .toFile(path.join(publicDir, 'favicon-32x32.png'));

    console.log('✅ Generated: favicon-32x32.png');
  } catch (error) {
    console.error('❌ Failed to generate favicon:', error);
  }

  // Generate shortcut icons
  const shortcuts = [
    { name: 'cart', emoji: '🛒', color: '#FF6F00' },
    { name: 'wishlist', emoji: '❤️', color: '#FF6F00' },
    { name: 'orders', emoji: '📦', color: '#FF6F00' },
  ];

  for (const shortcut of shortcuts) {
    const shortcutSVG = `
      <svg width="96" height="96" xmlns="http://www.w3.org/2000/svg">
        <rect width="96" height="96" rx="19.2" fill="${shortcut.color}"/>
        <text x="50%" y="54%" font-size="52" text-anchor="middle" dominant-baseline="middle">${shortcut.emoji}</text>
      </svg>
    `;

    try {
      await sharp(Buffer.from(shortcutSVG))
        .png()
        .toFile(path.join(publicDir, `icon-${shortcut.name}.png`));

      console.log(`✅ Generated: icon-${shortcut.name}.png`);
    } catch (error) {
      console.error(`❌ Failed to generate icon-${shortcut.name}.png:`, error);
    }
  }

  console.log('\n✨ All icons generated successfully!');
}

generateIcons().catch(console.error);
