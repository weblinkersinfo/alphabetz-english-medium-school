const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\SAHIL ATIGRE\\OneDrive\\Desktop\\alpha school\\alpha school\\alpha school';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace case-sensitive "Alpha" with "Alphabet'z"
  content = content.replace(/\bAlpha\b/g, "Alphabet'z");
  
  // Replace case-sensitive "alpha school" with "alphabet'z school"
  content = content.replace(/\balpha school\b/g, "alphabet'z school");

  // Replace all-caps "ALPHA" with "ALPHABET'Z"
  content = content.replace(/\bALPHA\b/g, "ALPHABET'Z");

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated name in ${file}`);
  }
}
