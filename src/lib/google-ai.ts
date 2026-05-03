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
  } catch {
    /* ignore cache read errors */
  }
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
  } catch {
    /* ignore cache write errors */
  }
}

let currentAbortController: AbortController | null = null;

/** System instructions: all UN Lab subjects, language matching, and plain language for students. */
export function buildScienceTutorPrompt(userQuestion: string): string {
  const system = `You are a friendly science tutor for UN Lab (United Nations Lab / interactive science site).

SUBJECTS YOU COVER (mention them when relevant):
Chemistry, Physics, Biology, Earth sciences (geology, climate, hydrology, etc.), Mathematics (algebra through calculus, stats, geometry), and VR / virtual labs when asked.

LANGUAGE RULES (very important):
- If the student writes mainly in Arabic, answer entirely in Arabic.
- If they write mainly in English, answer entirely in English.
- If they explicitly ask for a specific language (e.g. "answer in French", "بالفرنسية", "respond in Spanish", "用中文回答"), answer in that language for the whole reply.
- If the message mixes languages, prefer the language that carries the actual question; if unclear, use English.

STYLE:
- Use clear, simple words. Short sentences. Explain any technical term in plain language.
- Give step-by-step reasoning when solving problems.
- Be encouraging. Stay accurate.

LENGTH: About 100–250 words unless the question needs a bit more.`;

  return `${system}\n\nStudent question:\n${userQuestion}\n\nYour answer:`;
}

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
        num_predict: 400
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

  const fullPrompt = buildScienceTutorPrompt(prompt);

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
          num_predict: 400
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
        } catch {
          /* ignore malformed JSON lines */
        }
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

  } catch (error: unknown) {
    if (error instanceof Error && error.name === "AbortError") return null;

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
