import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cron from 'node-cron';
import { runDailyAutomation } from './services/automationService';
import apiRoutes from './routes/api';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: '*', // Adjust this to your production Vercel frontend URL for security later
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// CRON JOB (daily at 00:00)
// Note: node-cron might not run persistently on Vercel Serverless Functions. 
// For Vercel, it is recommended to trigger the /api/trigger-automation endpoint via Vercel Cron Jobs or an external service.
cron.schedule('0 0 * * *', async () => {
    console.log('Running daily automation flow...');
    try {
        await runDailyAutomation();
        console.log('Daily automation flow completed successfully.');
    } catch (error) {
        console.error('Error running daily automation:', error);
    }
});

// Export app for Vercel Serverless Functions
export default app;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`AutoWealth OS Backend running on port ${PORT}`);
    });
}
