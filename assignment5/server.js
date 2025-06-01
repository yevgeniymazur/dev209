const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const users = []; // 🧠 stored in memory

// REGISTER
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (users.find(user => user.username === username)) {
    return res.status(400).json({ error: 'User already exists' });
  }

  users.push({ username, password });
  console.log('Registered users:', users);
  res.status(200).json({ message: 'User registered' });
});

// LOGIN
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // 🪪 return dummy auth token
  res.status(200).json({ token: 'mock-token' });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
