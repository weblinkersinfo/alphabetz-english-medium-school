const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\SAHIL ATIGRE\\OneDrive\\Desktop\\alpha school\\alpha school\\alpha school';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const mapLink = 'https://maps.app.goo.gl/kP345NJ8spouKaYVA?g_st=aw';

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace links pointing to #map or enquiry.html#map with the actual google maps link
  content = content.replace(/href="#map"/g, `href="${mapLink}" target="_blank"`);
  content = content.replace(/href="enquiry\.html#map"/g, `href="${mapLink}" target="_blank"`);

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated map links in ${file}`);
  }
}
