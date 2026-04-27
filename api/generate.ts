export const config = {
  runtime: 'edge',
  maxDuration: 30
};

export default async function handler(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(
      'https://continuing-thus-forums-sponsors.trycloudflare.com/api/generate',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    return new Response(response.body, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (e) {
    return new Response(JSON.stringify({
      error: 'proxy failed',
      detail: String(e)
    }), { status: 500 });
  }
}

