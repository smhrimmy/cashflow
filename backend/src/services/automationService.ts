import { generateBlogPost } from './aiService';
import { publishToWordPress } from './wordpressService';
import { generatePinterestPin, postToTelegram, shareToTwitter } from './trafficService';
import { sendEmailCampaign } from './emailService';
import { fetchTrendingKeyword } from './keywordService';
import { injectAffiliateLinks } from './affiliateService';

export const runDailyAutomation = async () => {
    console.log('--- STARTING AUTOMATION FLOW ---');

    try {
        // 1. Fetch Trending Keyword
        console.log('1. Fetching trending keyword...');
        const keyword = await fetchTrendingKeyword();
        console.log(`Trending Keyword: ${keyword}`);

        // 2. Generate AI Blog Post
        console.log('2. Generating AI Blog Post...');
        const blogContent = await generateBlogPost(keyword);

        // 3. Inject Affiliate Links
        console.log('3. Injecting Affiliate Links...');
        const monetizedContent = await injectAffiliateLinks(blogContent);

        // 4. Publish to WordPress
        console.log('4. Publishing to WordPress...');
        const postUrl = await publishToWordPress(monetizedContent);
        console.log(`Published at: ${postUrl}`);

        // 5. Traffic Automation
        console.log('5. Running Traffic Automation...');
        await postToTelegram(postUrl);
        await shareToTwitter(postUrl);
        await generatePinterestPin(postUrl, monetizedContent.title);

        // 6. Send Email Campaign
        console.log('6. Sending Email Campaign...');
        await sendEmailCampaign(postUrl);

        console.log('--- AUTOMATION FLOW COMPLETE ---');
    } catch (error) {
        console.error('Automation flow failed:', error);
        throw error;
    }
};
