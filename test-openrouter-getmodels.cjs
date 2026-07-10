const fetch = require('node-fetch'); // wait, built-in in recent node

async function getModels() {
  const res = await fetch("https://openrouter.ai/api/v1/models");
  const data = await res.json();
  const freeModels = data.data.filter(m => m.pricing.prompt === "0" && m.pricing.completion === "0");
  console.log("Free models found:", freeModels.map(m => m.id).join('\n'));
}

getModels();
