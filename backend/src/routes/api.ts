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

export default router;
