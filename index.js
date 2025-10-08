import Redis from "ioredis";
import express from "express";

const redis = new Redis("redis://:mysecretpassword@localhost:6379");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/cache/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const value = await redis.get(key);
    if (value) {
      res.json({ key, value: JSON.parse(value) });
    } else {
      res.status(404).json({ error: 'Key not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/cache', async (req, res) => {
  try {
    const { key, value } = req.body;
    if (!key || value === undefined) {
      return res.status(400).json({ error: 'Key and value are required' });
    }
    await redis.set(key, JSON.stringify(value));
    res.json({ message: 'Cache set successfully', key, value });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/cache/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const result = await redis.del(key);
    if (result) {
      res.json({ message: 'Cache deleted successfully', key });
    } else {
      res.status(404).json({ error: 'Key not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});