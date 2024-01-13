const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();

app.use(cors()); // Enable CORS for all routes

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
  }
});

const upload = multer({ storage: storage });

// Endpoint to handle sketch submissions
app.post('/submit-sketch', upload.single('image'), (req, res) => {
  // Extracting data from the request
  const sketchName = req.body.sketchName;
  const croquis = req.body.croquis;
  const image = req.file.path; // Path to the saved image

  // Here, you'd typically save this data to a database
  console.log(`Received: ${sketchName}, ${croquis}, ${image}`);

  // Sending a response back to the front-end
  res.json({ message: 'Sketch received successfully!' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
