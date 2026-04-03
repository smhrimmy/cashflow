export const injectAffiliateLinks = async (blogContent: any) => {
    console.log(`[Affiliate] Injecting links into: ${blogContent.title}`);
    
    let content = blogContent.content;
    
    // Example Dictionary of keywords to affiliate links
    const affiliateMap = {
        'AI tools': 'https://affiliate.example.com/ai-tools',
        'SaaS': 'https://affiliate.example.com/saas',
        'passive income': 'https://affiliate.example.com/passive'
    };

    // Replace keywords with affiliate links (simplistic regex)
    for (const [key, link] of Object.entries(affiliateMap)) {
        const regex = new RegExp(`\\b${key}\\b`, 'gi');
        content = content.replace(regex, `<a href="${link}" rel="nofollow">${key}</a>`);
    }

    return {
        ...blogContent,
        content
    };
};
