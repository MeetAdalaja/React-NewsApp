require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/news', async (req, res) => {
  try {
    const { country = 'us', category = 'general', page = 1, pageSize = 10 } = req.query;

    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country,
        category,
        page,
        pageSize,
        apiKey: process.env.REACT_APP_NEWS_API,
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching from NewsAPI:", error.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
