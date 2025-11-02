/**
 * 🖼️ IMAGE FETCHER
 * Downloads relevant images from Unsplash/Pexels for articles
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const config = require('./config');

/**
 * Search and download image from Unsplash
 * @param {string} query - Search query
 * @param {string} filename - Save filename
 * @returns {Promise<string>} Image path
 */
async function fetchFromUnsplash(query, filename) {
  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: query,
        per_page: 1,
        orientation: config.images.unsplash.orientation
      },
      headers: {
        'Authorization': `Client-ID ${config.images.unsplash.apiKey}`
      }
    });

    if (response.data.results.length === 0) {
      throw new Error('No images found on Unsplash');
    }

    const imageUrl = response.data.results[0].urls[config.images.unsplash.size];
    const imagePath = path.join(config.images.savePath, filename);

    // Download image
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    
    // Ensure directory exists
    const dir = path.dirname(imagePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(imagePath, imageResponse.data);

    console.log(`✅ Image saved from Unsplash: ${filename}`);
    return `/images/news/${filename}`;
  } catch (error) {
    console.warn(`⚠️  Unsplash failed:`, error.message);
    throw error;
  }
}

/**
 * Search and download image from Pexels
 * @param {string} query - Search query
 * @param {string} filename - Save filename
 * @returns {Promise<string>} Image path
 */
async function fetchFromPexels(query, filename) {
  try {
    const response = await axios.get('https://api.pexels.com/v1/search', {
      params: {
        query: query,
        per_page: 1,
        orientation: config.images.pexels.orientation
      },
      headers: {
        'Authorization': config.images.pexels.apiKey
      }
    });

    if (response.data.photos.length === 0) {
      throw new Error('No images found on Pexels');
    }

    const imageUrl = response.data.photos[0].src[config.images.pexels.size];
    const imagePath = path.join(config.images.savePath, filename);

    // Download image
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    
    // Ensure directory exists
    const dir = path.dirname(imagePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(imagePath, imageResponse.data);

    console.log(`✅ Image saved from Pexels: ${filename}`);
    return `/images/news/${filename}`;
  } catch (error) {
    console.warn(`⚠️  Pexels failed:`, error.message);
    throw error;
  }
}

/**
 * Fetch image with fallback
 * @param {string} query - Search query
 * @param {string} slug - Article slug (for filename)
 * @returns {Promise<string>} Image path
 */
async function fetchImage(query, slug) {
  const filename = `${slug}-${Date.now()}.jpg`;

  // Try Unsplash first
  try {
    return await fetchFromUnsplash(query, filename);
  } catch (error) {
    console.log('↪️  Trying Pexels as fallback...');
  }

  // Try Pexels as fallback
  try {
    return await fetchFromPexels(query, filename);
  } catch (error) {
    console.log('↪️  Both APIs failed, using placeholder...');
  }

  // Final fallback: Use placeholder
  if (config.images.fallback) {
    return '/images/news/placeholder.jpg';
  }

  throw new Error('Failed to fetch image from any source');
}

module.exports = {
  fetchImage,
  fetchFromUnsplash,
  fetchFromPexels
};

