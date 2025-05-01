// download-images.js
const fs = require('fs');
const https = require('https');
const path = require('path');

const imageUrls = [
  'https://cdn.mvncorp.dev/media/products/images/Aloe%20Vera.jpg',
  'https://cdn.mvncorp.dev/media/products/images/ZZ%20Plant.jpg'
  // Add more direct image URLs here
];

const outputDir = path.join(__dirname, 'public', 'images');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

imageUrls.forEach((url) => {
  const fileName = path.basename(url).split('?')[0];
  const filePath = path.join(outputDir, fileName);

  https.get(url, (res) => {
    const fileStream = fs.createWriteStream(filePath);
    res.pipe(fileStream);
    fileStream.on('finish', () => {
      fileStream.close();
      console.log(`✅ Downloaded: ${fileName}`);
    });
  }).on('error', (err) => {
    console.error(`❌ Error downloading ${url}:`, err.message);
  });
});
