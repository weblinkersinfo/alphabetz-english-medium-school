const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\SAHIL ATIGRE\\OneDrive\\Desktop\\alpha school\\alpha school\\alpha school';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const oldStr = 'Our fees range from ₹30,000 to ₹40,000 per year depending on the class.';
const newStr = 'Our fees range from ₹20,000 to ₹29,000 per year depending on the class.';

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes(oldStr)) {
    content = content.replace(oldStr, newStr);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated chatbot in ${file}`);
  }
}
