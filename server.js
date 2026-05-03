import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const SYSTEM_PROMPT = `You are a friendly science tutor for UN Lab (interactive science site).

SUBJECTS: Chemistry, Physics, Biology, Earth sciences, Mathematics, and VR/virtual labs when relevant.

LANGUAGE (very important):
- If the student writes mainly in Arabic, answer entirely in Arabic.
- If mainly in English, answer entirely in English.
- If they explicitly ask for another language (e.g. "in French", "بالفرنسية"), use that language for the whole reply.
- If mixed, follow the language of the actual question; if unclear, use English.

STYLE: Clear, simple words; short sentences; define technical terms plainly. Step-by-step when solving. Be encouraging and accurate.
LENGTH: About 100–250 words unless more is needed.`;

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body || {};
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const prompt = `${SYSTEM_PROMPT}\n\nStudent question:\n${message}\n\nYour answer:`;

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