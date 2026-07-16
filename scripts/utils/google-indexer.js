import { google } from 'googleapis';

export async function pingGoogleIndexingApi(url) {
    console.log(`\n🌐 Pinging Google Indexing API for: ${url}`);
    
    const serviceAccountJsonStr = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    if (!serviceAccountJsonStr) {
        console.warn('⚠️ GOOGLE_SERVICE_ACCOUNT_JSON is not set. Skipping Google Indexing API ping.');
        return;
    }

    try {
        const credentials = JSON.parse(serviceAccountJsonStr);
        
        const jwtClient = new google.auth.JWT(
            credentials.client_email,
            null,
            credentials.private_key,
            ['https://www.googleapis.com/auth/indexing'],
            null
        );

        await jwtClient.authorize();

        const indexing = google.indexing({
            version: 'v3',
            auth: jwtClient,
        });

        const response = await indexing.urlNotifications.publish({
            requestBody: {
                url: url,
                type: 'URL_UPDATED',
            },
        });

        console.log(`✅ Google Indexing API Success: ${response.status} ${response.statusText}`);
        return response.data;
    } catch (err) {
        console.error('❌ Google Indexing API Error:', err.message);
    }
}
