const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\SAHIL ATIGRE\\OneDrive\\Desktop\\alpha school\\alpha school\\alpha school';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const oldAddress1 = 'Near Rankala Lake, Kolhapur';
const newAddress1 = '1794, A, Brahmeshwar bag, shivaji peth, kolhapur.';

const oldChatbot = 'We are located near Rankala Lake, Kolhapur. You can find a map on our Contact page.';
const newChatbot = 'We are located at 1794, A, Brahmeshwar bag, shivaji peth, kolhapur. You can find a map on our Contact page.';

const oldEnquiryAddress = 'Alpha School, Near Rankala Lake,<br />Kolhapur, Maharashtra – 416012';
const newEnquiryAddress = 'Alpha School, 1794, A, Brahmeshwar bag,<br />shivaji peth, kolhapur.';

const oldAboutText = 'What started as a small pre-primary center near Rankala Lake has grown into one of Kolhapur\'s most respected primary schools.';
const newAboutText = 'What started as a small pre-primary center has grown into one of Kolhapur\'s most respected primary schools.';

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  content = content.replace(oldEnquiryAddress, newEnquiryAddress);
  content = content.split(oldChatbot).join(newChatbot);
  content = content.split(oldAboutText).join(newAboutText);
  content = content.split(oldAddress1).join(newAddress1);

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated address in ${file}`);
  }
}
