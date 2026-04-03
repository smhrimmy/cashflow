import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const generateBlogPost = async (keyword: string) => {
    console.log(`Generating content for keyword: ${keyword}`);
    
    // In a real scenario, we would use Claude or OpenAI here to generate a 1500-2500 word post
    // With Structured headings, FAQ schema, CTA sections, Tone options, Auto internal linking.
    
    const prompt = `Write a 1500-2500 word SEO-optimized blog post about "${keyword}". 
    Include structured headings, an FAQ section with schema markup, and a clear Call To Action. 
    Use a professional and engaging tone.`;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 3000,
        });

        const content = completion.choices[0].message.content || 'Generated content fallback';
        
        return {
            title: `Ultimate Guide to ${keyword} in 2026`,
            metaDescription: `Discover the best strategies for ${keyword}. Learn how to maximize your results with our comprehensive guide.`,
            content: content,
            keyword: keyword
        };
    } catch (error) {
        console.error('Error generating AI content:', error);
        // Fallback for demonstration
        return {
            title: `Demo Post: ${keyword}`,
            metaDescription: `Demo meta description for ${keyword}`,
            content: `<h1>Welcome to ${keyword}</h1><p>This is a simulated AI blog post.</p>`,
            keyword: keyword
        };
    }
};
