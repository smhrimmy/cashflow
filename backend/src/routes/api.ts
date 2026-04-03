import { Router, Request, Response } from 'express';
import { runDailyAutomation } from '../services/automationService';

const router = Router();

// Test Route
router.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'OK', message: 'AutoWealth OS API is running.' });
});

// Trigger Automation Manually
router.post('/trigger-automation', async (req: Request, res: Response) => {
    try {
        await runDailyAutomation();
        res.json({ success: true, message: 'Automation triggered successfully.' });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// --- Mock Database for Settings (Will be replaced by PostgreSQL later) ---
let settingsStore: Record<string, string> = {
    openaiKey: '',
    wpUrl: '',
    wpUser: '',
    wpPass: '',
    telegramToken: '',
    twitterKey: '',
    pinterestToken: '',
    stripeSecret: '',
    autoPostEnabled: 'true',
    trafficAutomation: 'true'
};

// GET Settings
router.get('/settings', (req: Request, res: Response) => {
    res.json({ success: true, settings: settingsStore });
});

// POST (Update) Settings
router.post('/settings', (req: Request, res: Response) => {
    try {
        const newSettings = req.body;
        settingsStore = { ...settingsStore, ...newSettings };
        
        // Example: Update process.env dynamically if needed (Not recommended for prod, but good for local dev)
        if (newSettings.openaiKey) process.env.OPENAI_API_KEY = newSettings.openaiKey;
        if (newSettings.wpUrl) process.env.WP_API_URL = newSettings.wpUrl;
        if (newSettings.wpUser) process.env.WP_USERNAME = newSettings.wpUser;
        if (newSettings.wpPass) process.env.WP_APP_PASSWORD = newSettings.wpPass;

        res.json({ success: true, message: 'Settings saved successfully.', settings: settingsStore });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET Dashboard Stats
router.get('/stats/dashboard', (req: Request, res: Response) => {
    // These would normally be queried from PostgreSQL based on real activity
    res.json({
        success: true,
        stats: {
            totalEarnings: '$12,450',
            earningsTrend: '+14.5%',
            monthlyTraffic: '48.2K',
            trafficTrend: '+5.2%',
            conversionRate: '3.8%',
            conversionTrend: '-1.2%',
            activePosts: '1,204',
            postsTrend: '+12'
        },
        chartData: [
            { name: 'Mon', revenue: 4000, traffic: 2400 },
            { name: 'Tue', revenue: 3000, traffic: 1398 },
            { name: 'Wed', revenue: 2000, traffic: 9800 },
            { name: 'Thu', revenue: 2780, traffic: 3908 },
            { name: 'Fri', revenue: 1890, traffic: 4800 },
            { name: 'Sat', revenue: 2390, traffic: 3800 },
            { name: 'Sun', revenue: 3490, traffic: 4300 },
        ],
        topPosts: [
            { title: 'Best AI Tools for 2026', earnings: '$450', clicks: '1.2k' },
            { title: 'Automated SaaS Guide', earnings: '$320', clicks: '856' },
            { title: 'Passive Income Strategies', earnings: '$280', clicks: '645' },
            { title: 'ClickBank Review 2026', earnings: '$190', clicks: '420' },
        ]
    });
});

export default router;
