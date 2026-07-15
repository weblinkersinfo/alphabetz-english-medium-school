const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\SAHIL ATIGRE\\OneDrive\\Desktop\\alpha school\\alpha school\\alpha school';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const pages = {
    'about.html': '>About<',
    'programs.html': '>Programs<',
    'whyus.html': '>Why Us<',
    'testimonials.html': '>Testimonials<',
    'enquiry.html': '>Contact<'
};

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  if (pages[file]) {
      const matchText = pages[file];
      const searchStr = `<a href="${file}"${matchText}`;
      const replaceStr = `<a href="${file}" class="active"${matchText}`;
      content = content.replace(searchStr, replaceStr);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
