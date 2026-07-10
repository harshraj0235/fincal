const API_KEY = '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';

async function testOpenRouter() {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "google/gemini-2.0-flash-lite-preview-02-05:free",
        "messages": [
          {"role": "user", "content": "What is the capital of France?"}
        ]
      })
    });

    if (!response.ok) {
      console.error('FAILED!', response.status, await response.text());
    } else {
      const data = await response.json();
      console.log('SUCCESS!', data.choices[0].message.content);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
testOpenRouter();
