# AutoWealth OS Deployment Guide

## Architecture Overview
- **Frontend Dashboard:** Next.js deployed on Vercel
- **Backend Automation Engine:** Node.js (Express) deployed on Render/Railway/DigitalOcean
- **Database:** PostgreSQL on Supabase or Neon
- **CMS:** WordPress on separate hosting (e.g., Hostinger)

## Step 1: Database (PostgreSQL)
1. Create a free PostgreSQL database on [Supabase](https://supabase.com/) or [Neon](https://neon.tech/).
2. Run the SQL script found in `database/schema.sql` in the SQL editor to create the necessary tables.
3. Copy the Connection URL.

## Step 2: Backend Automation Engine
1. Create an account on [Render](https://render.com/) or [Railway](https://railway.app/).
2. Connect your GitHub repository and select the `backend` folder.
3. Configure the Start Command: `npm run build && npm start`.
4. Set Environment Variables:
   - `PORT=4000`
   - `OPENAI_API_KEY=your_key`
   - `DATABASE_URL=your_postgres_url`
   - `WP_API_URL=https://yoursite.com/wp-json`
   - `WP_USERNAME=your_wp_username`
   - `WP_APP_PASSWORD=your_wp_app_password`
   - *Add all affiliate, social media, and email API keys here.*
5. Deploy.

## Step 3: Frontend Dashboard
1. Go to [Vercel](https://vercel.com/).
2. Import your GitHub repository.
3. Set the Root Directory to `frontend`.
4. Vercel will automatically detect Next.js.
5. Set Environment Variables:
   - `NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api`
6. Click Deploy.

## Step 4: CRON Jobs
The backend Node.js application uses `node-cron` to schedule tasks. However, if deployed on a serverless platform that spins down (like free tiers), you should configure an external CRON job using [cron-job.org](https://cron-job.org/).
- URL to hit: `POST https://your-backend-url.onrender.com/api/trigger-automation`
- Schedule: Daily at 00:00.

## Step 5: Connecting the Dots
1. Open the Vercel Frontend URL.
2. Log into the Dashboard.
3. Navigate to **Settings** and ensure all Automation Toggles are turned ON.
4. Verify the connection by clicking the "Automation Active" indicator.
