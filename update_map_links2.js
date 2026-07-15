const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\SAHIL ATIGRE\\OneDrive\\Desktop\\alpha school\\alpha school\\alpha school';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const oldLink = 'https://maps.app.goo.gl/kP345NJ8spouKaYVA?g_st=aw';
const newLink = 'https://maps.app.goo.gl/nKggRdJa9pSUFjuf8';

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  content = content.split(oldLink).join(newLink);

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated map links in ${file}`);
  }
}
