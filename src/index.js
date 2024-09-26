// index.js
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const getGroqChatCompletion = require('./groq.js');
const cors = require('cors');

app.use(
  cors({
    // Allowing everything for now
    origin: '*',
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

// POST endpoint for chatbot to create a recipe
app.post('/create-recipe', async (req, res) => {
  const { inputMessage } = req.body;

  if (!inputMessage || typeof inputMessage !== 'string') {
    return res
      .status(400)
      .json({ message: 'Please provide an array of items.' });
  }

  try {
    // Send a request to the Groq API
    const chatCompletion = await getGroqChatCompletion(inputMessage);
    const chat = chatCompletion.choices[0]?.message?.content;

    if (!chat?.length) throw Error('No Response');

    res.status(200).json({ message: chat });
  } catch (error) {
    console.error('Error creating recipe:', error.message);
    res.status(500).json({ message: 'Error creating recipe' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
