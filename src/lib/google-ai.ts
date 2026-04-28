function getCacheKey(prompt: string): string {
  return `ai_cache_${prompt.toLowerCase().slice(0, 100)}`;
}

function getCachedResponse(prompt: string): string | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const key = getCacheKey(prompt);
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    const data = JSON.parse(cached);
    if (Date.now() - data.timestamp < 7 * 24 * 60 * 60 * 1000) {
      return data.response;
    }
    localStorage.removeItem(key);
  } catch {}
  return null;
}

function setCachedResponse(prompt: string, response: string): void {
  if (typeof localStorage === 'undefined') return;
  try {
    const key = getCacheKey(prompt);
    localStorage.setItem(
      key,
      JSON.stringify({
        response,
        timestamp: Date.now(),
      })
    );
  } catch {}
}

let currentAbortController: AbortController | null = null;

export function abortCurrentRequest(): void {
  if (currentAbortController) {
    currentAbortController.abort();
    currentAbortController = null;
  }
}

async function fallbackRequest(fullPrompt: string, abortSignal: AbortSignal) {
  const res = await fetch('https://continuing-thus-forums-sponsors.trycloudflare.com/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'mistral',
      prompt: fullPrompt,
      stream: false,
      options: {
        temperature: 0.3,
        top_p: 0.9,
        num_predict: 250
      }
    }),
    signal: abortSignal,
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data.response || null;
}

export async function generateChemPhysicsResponse(
  prompt: string,
  onProgress?: (chunk: string) => void
): Promise<string | null> {
  const cached = getCachedResponse(prompt);
  if (cached) {
    if (onProgress) onProgress(cached);
    return cached;
  }

  abortCurrentRequest();
  currentAbortController = new AbortController();
  const abortSignal = currentAbortController.signal;

  const SYSTEM_PROMPT = `You are a Chemistry and Physics tutor in UN Lab.

Answer format:
1. Key idea (1 sentence)
2. Steps (2–3 short points)
3. Final result

Keep it concise, clear, and complete. No extra explanation.`;

  const fullPrompt = `${SYSTEM_PROMPT}\n\nQ: ${prompt}\nA:`;

  try {
    const response = await fetch('https://continuing-thus-forums-sponsors.trycloudflare.com/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mistral',
        prompt: fullPrompt,
        stream: false,
        options: {
          temperature: 0.3,
          top_p: 0.9,
          num_predict: 250
        }
      }),
      signal: abortSignal,
    });

    if (!response.ok || !response.body) {
      return await fallbackRequest(fullPrompt, abortSignal);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let finalText = '';
    let partial = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      partial += decoder.decode(value, { stream: true });

      const lines = partial.split('\n');
      partial = lines.pop() || '';

      for (const line of lines) {
        if (!line.trim()) continue;

        try {
          const parsed = JSON.parse(line);

          if (parsed.response) {
            finalText += parsed.response;
            if (onProgress) onProgress(finalText);
          }
        } catch {}
      }
    }

    if (!finalText) {
      const fallback = await fallbackRequest(fullPrompt, abortSignal);
      if (fallback) {
        if (onProgress) onProgress(fallback);
        setCachedResponse(prompt, fallback);
        return fallback;
      }
      return null;
    }

    setCachedResponse(prompt, finalText);
    return finalText;

  } catch (error: any) {
    if (error.name === 'AbortError') return null;

    const fallback = await fallbackRequest(fullPrompt, abortSignal);
    if (fallback) {
      if (onProgress) onProgress(fallback);
      setCachedResponse(prompt, fallback);
      return fallback;
    }

    return null;
  } finally {
    currentAbortController = null;
  }
  }
