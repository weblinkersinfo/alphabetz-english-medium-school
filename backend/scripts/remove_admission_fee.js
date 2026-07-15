const fs = require('fs');
const path = require('path');

const filePath = 'c:\\Users\\SAHIL ATIGRE\\OneDrive\\Desktop\\alpha school\\alpha school\\alpha school\\admission.html';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove <th>Admission Fee</th>
content = content.replace('<th>Admission Fee</th>\n', '');
content = content.replace('<th>Admission Fee</th>\r\n', '');
content = content.replace('<th>Admission Fee</th>', '');

// 2. Remove all <td> elements with ₹ 5,000 in the table
content = content.replace(/<td class="fee-amount">₹ 5,000<\/td>\r?\n?/g, '');
content = content.replace(/<td class="fee-amount">₹ 5,000<\/td>/g, '');

// 3. Update fee note
content = content.replace(
  'Admission fee is a one-time, non-refundable payment. Tuition fee can be paid in 2 installments.',
  'Tuition fee can be paid in 2 installments.'
);

// 4. Update FAQ
const oldFAQ = 'Yes! The annual tuition fee can be paid in 2 convenient installments – one at the beginning of each term. The admission fee, however, is a one-time payment required at the time of enrollment confirmation.';
const newFAQ = 'Yes! The annual tuition fee can be paid in 2 convenient installments – one at the beginning of each term.';
content = content.replace(oldFAQ, newFAQ);

// If the string was slightly different (e.g. with spaces)
content = content.replace(
  /The admission fee, however, is a one-time payment required at the time of enrollment confirmation\./g,
  ''
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Admission fee removed from admission.html');
