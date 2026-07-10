const API_KEY = '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';

async function testModel(modelId) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": modelId,
        "messages": [
          {"role": "user", "content": "hello"}
        ]
      })
    });

    if (!response.ok) {
      console.error(`FAILED! ${modelId} HTTP Status: ${response.status}`);
      console.error(await response.text());
      return false;
    } else {
      console.log(`SUCCESS! ${modelId} works.`);
      return true;
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function run() {
  const models = [
    'google/gemini-2.0-flash-lite-preview-02-05:free',
    'google/gemini-2.0-flash-exp:free',
    'google/gemini-flash-1.5-8b',
    'google/gemma-2-9b-it:free',
    'meta-llama/llama-3-8b-instruct:free',
    'deepseek/deepseek-r1:free'
  ];
  
  for (const m of models) {
     await testModel(m);
  }
}

run();
