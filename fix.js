const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\SAHIL ATIGRE\\OneDrive\\Desktop\\alpha school\\alpha school\\alpha school';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const replacements = {
  'ðŸ «': '🏫',
  'â† ': '←',
  'ðŸ“ž': '📞',
  'âœ‰ï¸ ': '✉️',
  'ðŸ’¬': '💬',
  'ðŸ“ ': '📍',
  'ðŸ• ': '🕐',
  'Â©': '©',
  'â ¤ï¸ ': '❤️',
  'â„¢': '™',
  'â‚¹': '₹',
  'â€“': '–',
  'â€”': '—',
  'âœ…': '✅',
  'ðŸš€': '🚀',
  'ðŸŽ’': '🎒',
  'ðŸ‘¤': '👤',
  'ðŸ‘§': '👧',
  'ðŸŽ‚': '🎂',
  'ðŸ“š': '📚',
  'ðŸ§’': '🧒',
  'ðŸ  ': '🏠',
  'ðŸšŒ': '🚌',
  'ðŸ“…': '📅',
  'ðŸ—“ï¸ ': '🗓️',
  'ðŸ‘©â€ ðŸ «': '👩‍🏫',
  'ðŸ‘¨â€ ðŸ‘©â€ ðŸ‘§': '👨‍👩‍👧',
  'ðŸŽ“': '🎓',
  'ðŸ“‹': '📋',
  'ðŸ”’': '🔒',
  'âš¡': '⚡',
  'ðŸŽ¯': '🎯',
  'ðŸ“˜': '📘',
  'ðŸ“¸': '📸',
  'ðŸŽ¬': '🎬',
  'ðŸ‘‹': '👋',
  'ðŸ“©': '📩',
  'Î±': 'α',
  'â³': '⏳',
  'â†’': '→',
  '<div class="nav-logo-icon"></div>': '<div class="nav-logo-icon">α</div>'
};

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  for (const [bad, good] of Object.entries(replacements)) {
    content = content.split(bad).join(good);
  }

  content = content.replace(/â€™/g, "'");
  content = content.replace(/â€œ/g, '"');
  content = content.replace(/â€ /g, '"');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed ${file}`);
  }
}
