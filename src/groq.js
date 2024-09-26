const Groq = require('groq-sdk');
require('dotenv').config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getGroqChatCompletion(inputMessage) {
  return groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          'You are an helper chef that gives ideas for multiple recipies given some ingredients to cook',
      },
      {
        role: 'user',
        content: inputMessage,
      },
    ],
    model: 'llama3-8b-8192',
  });
}

module.exports = getGroqChatCompletion;
