-- AutoWealth OS PostgreSQL Schema

-- 1. Users & Admins
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Automation Logs (Tracking every CRON execution)
CREATE TABLE automation_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    action VARCHAR(255) NOT NULL, -- e.g., 'GENERATE_BLOG', 'POST_PINTEREST'
    status VARCHAR(50) NOT NULL, -- 'SUCCESS', 'FAILED'
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. AI Generated Content Tracking
CREATE TABLE generated_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    keyword VARCHAR(255) NOT NULL,
    wp_post_id INT, -- ID from WordPress
    url TEXT,
    word_count INT,
    status VARCHAR(50) DEFAULT 'published',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Earnings & Analytics Tracking
CREATE TABLE earnings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source VARCHAR(100) NOT NULL, -- 'ClickBank', 'Amazon', 'AdSense', 'Stripe'
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',
    recorded_at DATE DEFAULT CURRENT_DATE
);

CREATE TABLE traffic_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source VARCHAR(100) NOT NULL, -- 'SEO', 'Pinterest', 'Twitter', 'Telegram'
    clicks INT DEFAULT 0,
    conversions INT DEFAULT 0,
    recorded_at DATE DEFAULT CURRENT_DATE
);

-- 5. Settings & API Keys
CREATE TABLE system_settings (
    key VARCHAR(100) PRIMARY KEY,
    value TEXT NOT NULL,
    is_encrypted BOOLEAN DEFAULT false,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Default Settings
INSERT INTO system_settings (key, value) VALUES
('auto_post_enabled', 'true'),
('daily_post_limit', '3'),
('ai_mode', 'auto');
