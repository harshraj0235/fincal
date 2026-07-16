const fs = require('fs');
const path = require('path');

const IMAGE_DIR = path.join(__dirname, '../../public/images/discover');

async function generateImage(slug, title, topic, breakPollinations = false, breakUnsplash = false) {
    const keyword = topic || title.split(' ').slice(0, 3).join(' ');
    console.log(`\n🎨 Generating image for ${slug} (Keyword: ${keyword})...`);
    
    const imagePrompt = `High-quality editorial photography focusing on "${keyword}". Photorealistic Indian context, expressive subjects showing real emotion related to ${title}. Clean, high-contrast, news publication style. No text overlay. Premium magazine quality.`;
    
    // Break pollinations by giving an invalid URL
    const imageUrl = breakPollinations ? 'https://this.is.a.broken.url.pollinations.ai' : `https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompt)}?width=1200&height=675&nologo=true`;

    let pollinationsSuccess = false;
    for (let i = 0; i < 1; i++) {
        try {
            console.log(`[Attempt ${i+1}] Fetching from Pollinations...`);
            const response = await fetch(imageUrl);
            if (!response.ok) throw new Error('Pollinations returned ' + response.status);
            const buffer = await response.arrayBuffer();
            const imagePath = path.join(IMAGE_DIR, `${slug}.png`);
            fs.writeFileSync(imagePath, Buffer.from(buffer));
            console.log(`✅ Image successfully generated via Pollinations.`);
            pollinationsSuccess = true;
            return `/images/discover/${slug}.png`;
        } catch (e) {
            console.error(`Image gen failed:`, e.message);
        }
    }
    
    if (!pollinationsSuccess) {
        // FALLBACK TO UNSPLASH
        console.log(`⚠️ Pollinations exhausted. Falling back to Unsplash for keyword: ${keyword}`);
        try {
            const unsplashUrl = breakUnsplash ? 'https://this.is.a.broken.url.unsplash.com' : `https://source.unsplash.com/1200x675/?${encodeURIComponent(keyword)},india`;
            console.log(`Fetching from Unsplash: ${unsplashUrl}`);
            const response = await fetch(unsplashUrl);
            if (!response.ok) throw new Error('Unsplash returned ' + response.status);
            const buffer = await response.arrayBuffer();
            const imagePath = path.join(IMAGE_DIR, `${slug}.png`);
            fs.writeFileSync(imagePath, Buffer.from(buffer));
            console.log(`✅ Image successfully fetched from Unsplash fallback.`);
            return `/images/discover/${slug}.png`;
        } catch (unsplashError) {
            console.error(`Unsplash fallback also failed:`, unsplashError.message);
            // Absolute fallback to default hero image to prevent build crashes
            const defaultImagePath = path.join(IMAGE_DIR, `${slug}.png`);
            fs.copyFileSync(path.join(process.cwd(), 'public/default-news-hero.jpg'), defaultImagePath);
            console.log(`✅ Copied default hero image as final fallback.`);
            return `/images/discover/${slug}.png`;
        }
    }
}

async function runTests() {
    console.log("=== SCENARIO 1: Pollinations Works ===");
    await generateImage('test-scenario-1', 'Test Title 1', 'Finance', false, false);

    console.log("\n=== SCENARIO 2: Pollinations Fails, Unsplash Works ===");
    await generateImage('test-scenario-2', 'Test Title 2', 'Money', true, false);

    console.log("\n=== SCENARIO 3: Both Fail, Default Works ===");
    await generateImage('test-scenario-3', 'Test Title 3', 'Economy', true, true);
}

runTests();
