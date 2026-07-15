const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\SAHIL ATIGRE\\OneDrive\\Desktop\\alpha school\\alpha school\\alpha school';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const originalSymbols = [
    '🏫', '←', '📞', '✉️', '💬', '📍', '🕐', '©', '❤️', '™', '₹', '–', '—', '✅', '🚀',
    '🎒', '👤', '👧', '🎂', '📚', '🧒', '🏠', '🚌', '📅', '🗓️', '👩‍🏫', '👨‍👩‍👧', '🎓', '📋',
    '🔒', '⚡', '🎯', '📘', '📸', '🎬', '👋', '📩', '🖥️', '🏃', '🎭', '🔬', '🛡️', '🌱', '💻',
    '🙏', '🍎', '🍱', '🎨', '📖', '🌟', '😊', '⭐', '★', 'α', '⏳', '→', '©️'
];

function toMojibake(str) {
    const win1252 = {
        0x80: '\u20AC', 0x81: '\u0081', 0x82: '\u201A', 0x83: '\u0192', 0x84: '\u201E',
        0x85: '\u2026', 0x86: '\u2020', 0x87: '\u2021', 0x88: '\u02C6', 0x89: '\u2030',
        0x8A: '\u0160', 0x8B: '\u2039', 0x8C: '\u0152', 0x8D: '\u008D', 0x8E: '\u017D',
        0x8F: '\u008F', 0x90: '\u0090', 0x91: '\u2018', 0x92: '\u2019', 0x93: '\u201C',
        0x94: '\u201D', 0x95: '\u2022', 0x96: '\u2013', 0x97: '\u2014', 0x98: '\u02DC',
        0x99: '\u2122', 0x9A: '\u0161', 0x9B: '\u203A', 0x9C: '\u0153', 0x9D: '\u009D',
        0x9E: '\u017E', 0x9F: '\u0178'
    };
    
    let utf8Bytes = Buffer.from(str, 'utf8');
    let moji = '';
    for (let i = 0; i < utf8Bytes.length; i++) {
        let b = utf8Bytes[i];
        if (b >= 0x80 && b <= 0x9F) {
            moji += win1252[b];
        } else {
            moji += String.fromCharCode(b);
        }
    }
    return moji;
}

const replacements = {};
// Add the calculated mojibake for each symbol
for (const sym of originalSymbols) {
    const moji = toMojibake(sym);
    if (moji !== sym) {
        replacements[moji] = sym;
    }
}

// Ensure the longer strings are replaced before substrings (if any)
const sortedKeys = Object.keys(replacements).sort((a, b) => b.length - a.length);

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  for (const bad of sortedKeys) {
    const good = replacements[bad];
    content = content.split(bad).join(good);
  }

  // Handle some specific cases like missing alpha
  content = content.split('<div class="nav-logo-icon"></div>').join('<div class="nav-logo-icon">α</div>');
  content = content.split('<div class="nav-logo-icon">I</div>').join('<div class="nav-logo-icon">α</div>');
  content = content.split('<div class="nav-logo-icon">Î±</div>').join('<div class="nav-logo-icon">α</div>');
  // Sometimes alpha became replacement character or something similar
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed ${file}`);
  }
}
