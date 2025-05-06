const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('DIU Student Portal Node.js Server is running!');
});

// Example API route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Node.js server!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});