const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const youtubeHtml = `
  <!-- ===== FLOATING YOUTUBE BUTTON ===== -->
  <a href="https://youtu.be/swY7hZOi3kE?si=-kGKWER5Xumy2jf7" target="_blank" class="youtube-float" aria-label="Watch on YouTube">
    ▶
  </a>
`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    if (content.includes(youtubeHtml)) {
        content = content.replace(youtubeHtml, '');
        fs.writeFileSync(file, content, 'utf-8');
        console.log(`Reverted ${file}`);
    }
});
