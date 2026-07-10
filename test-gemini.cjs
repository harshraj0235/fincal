const API_KEY = 'AQ.Ab8RN6JBvXHpKNKP5l-jBGR_YvZt-3-ewMkmmTqTbm7zC05NUg';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

async function testGemini() {
  try {
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: 'Hello, are you working?' }] }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('FAILED! HTTP Status:', response.status);
      console.error('Error Details:', errorText);
    } else {
      const data = await response.json();
      console.log('SUCCESS!');
      console.log('Response text:', data?.candidates?.[0]?.content?.parts?.[0]?.text);
    }
  } catch (error) {
    console.error('Network Error:', error);
  }
}

testGemini();
