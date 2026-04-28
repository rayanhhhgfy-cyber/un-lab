import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const SYSTEM_PROMPT = `You are a friendly and knowledgeable Science tutor for UN Lab.
You help students across 2 main science labs: Chemistry and Physics.
Always provide step-by-step explanations, use diagrams/examples, and be encouraging.
KEEP ANSWERS SHORT TO MEDIUM LENGTH - aim for 2-3 paragraphs max, or 100-200 words.
Be concise but thorough.`;

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body || {};
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const prompt = `${SYSTEM_PROMPT}\n\nUser Question: ${message}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds

    const response = await fetch(
      `https://valentine-prominent-postposted-resumes.trycloudflare.com/api/generate`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mistral',
          prompt,
          stream: true,
        }),
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.text().catch(() => ({}));
      console.error('API Error:', errorData);
      return res.status(500).json({ error: 'AI service error' });
    }

    // Read the streaming response
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullResponse = '';
    let done = false;

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;
      if (value) {
        const chunk = decoder.decode(value, { stream: !done });
        const lines = chunk.split('\n').filter(line => line.trim());
        for (const line of lines) {
          try {
            const data = JSON.parse(line);
            if (data.response) {
              fullResponse += data.response;
            }
            if (data.done) {
              done = true;
              break;
            }
          } catch (e) {
            // Ignore invalid JSON lines
          }
        }
      }
    }

    if (!fullResponse.trim()) {
      return res.status(500).json({ error: 'Empty response from AI' });
    }

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ response: fullResponse.trim() });
  } catch (error) {
    console.error('AI Error Detail:', error.message || error);
    if (!res.headersSent) {
      return res.status(500).json({
        error: 'AI Error',
        details: error.message || 'Unknown error occurred'
      });
    }
    res.end();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});