const fs = require('fs');

const files = fs.readdirSync('.', {withFileTypes: true})
  .filter(d => d.isFile() && d.name.endsWith('.html'))
  .map(d => d.name);

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // 1. Remove chatbot button
  content = content.replace(/<button class="chatbot-option-btn" data-query="fee">Fees & Cost<\/button>\r?\n\s*/g, '');

  // 2. Update chatbot response
  content = content.replace(/Our fees range from ₹20,000 to ₹29,000 per year depending on the class\. You can check the Admissions page for detailed fee structures\./g, 'Please contact the school office for detailed information regarding our fee structure.');

  fs.writeFileSync(file, content);
}

// Now handle admission.html specifically
let adminContent = fs.readFileSync('admission.html', 'utf8');

// Update CSS
adminContent = adminContent.replace(
  '    .documents .container {\r\n      display: grid;\r\n      grid-template-columns: 1fr 1fr;\r\n      gap: var(--space-xl);\r\n      align-items: start;\r\n    }',
  '    .documents .container {\r\n      display: block;\r\n      max-width: 800px;\r\n      margin: 0 auto;\r\n    }'
);
adminContent = adminContent.replace(
  '    .documents .container {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: var(--space-xl);\n      align-items: start;\n    }',
  '    .documents .container {\n      display: block;\n      max-width: 800px;\n      margin: 0 auto;\n    }'
);

// Update section header
adminContent = adminContent.replace(
  '<!-- ===== DOCUMENTS & FEE STRUCTURE ===== -->',
  '<!-- ===== DOCUMENTS ===== -->'
);

// Remove fee structure block. Using a precise regex to remove from <!-- Fee Structure --> to the closing </div> of .fee-structure.
const feeStartStr = '      <!-- Fee Structure -->';
const startIdx = adminContent.indexOf(feeStartStr);
if (startIdx !== -1) {
  // Find the end of the fee structure div.
  const endMarker = '    </div>\r\n  </section>\r\n\r\n  <!-- ===== IMPORTANT DATES ===== -->';
  const endMarker2 = '    </div>\n  </section>\n\n  <!-- ===== IMPORTANT DATES ===== -->';
  
  let endIdx = adminContent.indexOf(endMarker, startIdx);
  if(endIdx === -1) endIdx = adminContent.indexOf(endMarker2, startIdx);

  if (endIdx !== -1) {
    const toRemove = adminContent.substring(startIdx, endIdx);
    adminContent = adminContent.replace(toRemove, '');
  }
}

fs.writeFileSync('admission.html', adminContent);
console.log('Fee structure removed successfully from all files.');
