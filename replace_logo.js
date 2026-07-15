const fs = require('fs');
const path = require('path');

const dirs = [
    "c:\\Users\\Anuj's Laptop\\OneDrive\\Desktop\\alphabet'z",
    "c:\\Users\\Anuj's Laptop\\OneDrive\\Desktop\\alphabet'z\\frontend"
];

for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let original = content;

        content = content.split('<div class="nav-logo-icon">α</div>').join('<img src="images/logo.jpg" alt="Logo" class="nav-logo-img" />');
        content = content.split('<div class="chatbot-avatar">🏫</div>').join('<img src="images/logo.jpg" alt="Bot" class="chatbot-avatar-img" />');

        if (content !== original) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${filePath}`);
        }
    }
}
