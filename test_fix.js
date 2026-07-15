const fs = require('fs');

function testFix() {
    let str = fs.readFileSync('index.html', 'utf8');
    try {
        let bytes = Buffer.from(str, 'latin1');
        let fixed = bytes.toString('utf8');
        
        // Let's print out lines containing "Alpha School" or emojis to see if it worked
        const lines = fixed.split('\n');
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes('weblinkers')) {
                console.log(lines[i].trim());
            }
            if (lines[i].includes('Alpha School Kolhapur')) {
                console.log(lines[i].trim());
            }
        }
    } catch (e) {
        console.error(e);
    }
}
testFix();
