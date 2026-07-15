const fs = require('fs');
const files = ['testimonials.html', 'frontend/testimonials.html'];
for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Remove the CSS rule for .testi-role if present
    content = content.replace(/\.testi-role\{[^\}]+\}/g, '');
    
    // Remove all <div class="testi-role">...</div>
    content = content.replace(/<div class="testi-role">.*?<\/div>/g, '');
    
    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  }
}
