import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cron from 'node-cron';
import { runDailyAutomation } from './services/automationService';
import apiRoutes from './routes/api';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// CRON JOB (daily at 00:00)
cron.schedule('0 0 * * *', async () => {
    console.log('Running daily automation flow...');
    try {
        await runDailyAutomation();
        console.log('Daily automation flow completed successfully.');
    } catch (error) {
        console.error('Error running daily automation:', error);
    }
});

app.listen(PORT, () => {
    console.log(`AutoWealth OS Backend running on port ${PORT}`);
});
