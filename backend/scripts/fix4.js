const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\SAHIL ATIGRE\\OneDrive\\Desktop\\alpha school\\alpha school\\alpha school';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const win1252Rev = {
    '\u20AC': 0x80, '\u0081': 0x81, '\u201A': 0x82, '\u0192': 0x83, '\u201E': 0x84,
    '\u2026': 0x85, '\u2020': 0x86, '\u2021': 0x87, '\u02C6': 0x88, '\u2030': 0x89,
    '\u0160': 0x8A, '\u2039': 0x8B, '\u0152': 0x8C, '\u008D': 0x8D, '\u017D': 0x8E,
    '\u008F': 0x8F, '\u0090': 0x90, '\u2018': 0x91, '\u2019': 0x92, '\u201C': 0x93,
    '\u201D': 0x94, '\u2022': 0x95, '\u2013': 0x96, '\u2014': 0x97, '\u02DC': 0x98,
    '\u2122': 0x99, '\u0161': 0x9A, '\u203A': 0x9B, '\u0153': 0x9C, '\u009D': 0x9D,
    '\u017E': 0x9E, '\u0178': 0x9F
};

function decodeMojibake(moji) {
    const bytes = new Uint8Array(moji.length);
    for (let i = 0; i < moji.length; i++) {
        const char = moji[i];
        if (win1252Rev.hasOwnProperty(char)) {
            bytes[i] = win1252Rev[char];
        } else {
            bytes[i] = char.charCodeAt(0) & 0xFF;
        }
    }
    return Buffer.from(bytes).toString('utf8');
}

// Added \u0081\u008D\u008F\u0090\u009D to the char class
const mojibakeRegex = /(?:[\u00F0\u00E2\u00C2\u00CE][\x80-\xFF\u20AC\u201A\u0192\u201E\u2026\u2020\u2021\u02C6\u2030\u0160\u2039\u0152\u017D\u2018\u2019\u201C\u201D\u2022\u2013\u2014\u02DC\u2122\u0161\u203A\u0153\u017E\u0178\u0081\u008D\u008F\u0090\u009D]{1,3})+/g;

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  content = content.replace(mojibakeRegex, (match) => {
      const decoded = decodeMojibake(match);
      if (!decoded.includes('\uFFFD')) {
          return decoded;
      }
      return match;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed regex mojibake in ${file}`);
  }
}
