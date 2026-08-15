const fs = require('fs');
const path = require('path');

// NOTE: To run this script, you must have the @google/genai package installed
// npm install @google/genai
// And export your API key:
// $env:GEMINI_API_KEY="your_api_key_here"

const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const CALCULATOR_DATA_PATH = path.join(__dirname, '../src/data/calculatorData.ts');

async function generateSEOContent(calculatorName, calculatorDescription) {
  const prompt = `
You are a highly acclaimed Indian financial expert and SEO specialist. 
Your task is to generate rich, E-E-A-T compliant SEO metadata for a financial calculator.
All content should be tailored for an Indian audience, mixing English with professional Hindi terms where appropriate (Hinglish).

Calculator Name: ${calculatorName}
Current Description: ${calculatorDescription}

Generate a JSON object with the exact following schema and NO markdown formatting (just the raw JSON string):
{
  "primaryKeyword": "The main search term for this calculator in India",
  "hinglishTitle": "A catchy, SEO optimized title for the page in Hinglish (e.g., 'Loan EMI Calculator - EMI Kaise Calculate Kare')",
  "searchIntent": "tool",
  "introduction": "A 2-3 sentence introduction paragraph (in professional English) explaining what the calculator does and why it's useful.",
  "howToSteps": [
    { "step": "Step 1 Title", "description": "Step 1 Description" },
    { "step": "Step 2 Title", "description": "Step 2 Description" },
    { "step": "Step 3 Title", "description": "Step 3 Description" }
  ],
  "methodology": "1 sentence explaining the standard financial formula or logic used (e.g., 'Calculated using the standard compound interest formula A = P(1+r/n)^nt')."
}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const jsonText = response.text;
    return JSON.parse(jsonText);
  } catch (error) {
    console.error(`Error generating content for ${calculatorName}:`, error);
    return null;
  }
}

async function main() {
  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ GEMINI_API_KEY environment variable is missing.");
    console.log("Please run: $env:GEMINI_API_KEY='your_api_key' before executing this script.");
    process.exit(1);
  }

  console.log("🚀 Starting Calculator SEO Content Generation...");
  
  // This is a simplified approach to parsing and rewriting a complex TS file.
  // In a production scenario, you would use a TypeScript AST parser (like ts-morph) 
  // to safely modify the exact object literals in calculatorData.ts without breaking syntax.
  
  console.log("For a production run of 200+ calculators, it is highly recommended to use 'ts-morph' to parse calculatorData.ts.");
  console.log("This script serves as the foundational AI pipeline.");
  
  // Example usage on a single tool
  const sampleData = await generateSEOContent("SIP Calculator", "Calculate mutual fund SIP returns and wealth growth");
  console.log("\n✅ Generated SEO Payload Example:");
  console.log(JSON.stringify(sampleData, null, 2));
}

main();
