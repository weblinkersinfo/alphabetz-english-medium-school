const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5002;

// Enable CORS and body-parser middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Path configurations
const DATA_DIR = path.join(__dirname, 'data');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');
const FEEDBACKS_FILE = path.join(DATA_DIR, 'feedbacks.json');

// Ensure data folder and database files exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(ENQUIRIES_FILE)) {
  fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify([], null, 2), 'utf8');
}
if (!fs.existsSync(FEEDBACKS_FILE)) {
  fs.writeFileSync(FEEDBACKS_FILE, JSON.stringify([], null, 2), 'utf8');
}

// Serve frontend static assets
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Helper to read and write database helper
const getDatabase = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
};

const saveDatabase = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error);
    return false;
  }
};

// API Endpoint for Enquiry Form
app.post('/api/enquiry', (req, res) => {
  console.log('Received enquiry submission:', req.body);
  const {
    enquiryType,
    parentName,
    motherName,
    phone,
    email,
    childName,
    childDob,
    classSelect,
    gender,
    address,
    prevSchool,
    transport,
    message,
    referralSource
  } = req.body;

  if (!parentName || !phone || !childName || !childDob || !classSelect) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const enquiries = getDatabase(ENQUIRIES_FILE);
  const newEnquiry = {
    id: Date.now().toString(),
    enquiryType: enquiryType || 'admission',
    parentName,
    motherName: motherName || '',
    phone,
    email: email || '',
    childName,
    childDob,
    classSelect,
    gender: gender || '',
    address: address || '',
    prevSchool: prevSchool || '',
    transport: transport || '',
    message: message || '',
    referralSource: referralSource || '',
    submittedAt: new Date().toISOString()
  };

  enquiries.push(newEnquiry);
  const saved = saveDatabase(ENQUIRIES_FILE, enquiries);

  if (saved) {
    return res.status(200).json({ success: true, message: 'Enquiry submitted successfully' });
  } else {
    return res.status(500).json({ success: false, message: 'Failed to save enquiry data' });
  }
});

// API Endpoint for Testimonials/Feedback Form
app.post('/api/feedback', (req, res) => {
  console.log('Received feedback submission:', req.body);
  const { name, childClass, rating, message } = req.body;

  if (!name || !childClass || !rating || !message) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const feedbacks = getDatabase(FEEDBACKS_FILE);
  const newFeedback = {
    id: Date.now().toString(),
    name,
    childClass,
    rating: parseInt(rating, 10),
    message,
    submittedAt: new Date().toISOString()
  };

  feedbacks.push(newFeedback);
  const saved = saveDatabase(FEEDBACKS_FILE, feedbacks);

  if (saved) {
    return res.status(200).json({ success: true, message: 'Feedback submitted successfully' });
  } else {
    return res.status(500).json({ success: false, message: 'Failed to save feedback data' });
  }
});

// Fallback to index.html for single-page style navigation (if required)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
