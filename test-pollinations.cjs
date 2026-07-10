const fetch = require('node-fetch'); // wait, node 18 has fetch built-in
(async () => {
  try {
    const pollResponse = await fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'hello' }],
        model: 'openai',
        seed: Math.floor(Math.random() * 100000)
      })
    });
    if (!pollResponse.ok) {
        console.error('Status:', pollResponse.status);
        console.error('Text:', await pollResponse.text());
    } else {
        console.log('Success:', await pollResponse.text());
    }
  } catch (err) {
    console.error('Error:', err);
  }
})();
