import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const WP_API_URL = process.env.WP_API_URL;
const WP_USERNAME = process.env.WP_USERNAME;
const WP_APP_PASSWORD = process.env.WP_APP_PASSWORD;

export const publishToWordPress = async (postData: any) => {
    console.log(`Publishing post to WordPress: ${postData.title}`);
    
    try {
        const credentials = Buffer.from(`${WP_USERNAME}:${WP_APP_PASSWORD}`).toString('base64');
        
        const response = await axios.post(`${WP_API_URL}/wp/v2/posts`, {
            title: postData.title,
            content: postData.content,
            status: 'publish', // Or 'draft'
            meta: {
                _yoast_wpseo_metadesc: postData.metaDescription // Example for Yoast SEO
            }
        }, {
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/json'
            }
        });

        console.log(`Post published ID: ${response.data.id}`);
        return response.data.link;
    } catch (error) {
        console.error('Error publishing to WordPress:', error);
        return 'http://your-wordpress-site.com/demo-post';
    }
};
