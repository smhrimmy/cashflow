# AutoWealth OS WordPress Setup

AutoWealth OS uses WordPress as a Headless CMS to store and serve the generated blog posts, handle SEO, and trigger further actions.

## 1. WordPress Installation
1. Install a fresh instance of WordPress on your hosting (e.g., Hostinger, SiteGround, Cloudways).
2. Configure your domain and enable SSL (HTTPS).
3. Set Permalinks to "Post name" (Settings > Permalinks).

## 2. Essential Plugins List
Install and activate the following plugins:

### Core & API
- **Application Passwords** (Built-in to WP 5.6+, needed for REST API auth).
- **JWT Authentication for WP REST API** (For more secure frontend/backend integrations).

### SEO & Schema
- **Yoast SEO** or **Rank Math** (For meta descriptions, SEO titles).
- **Schema & Structured Data for WP & AMP** (For FAQ Schema).

### Automation & Caching
- **WP Super Cache** or **LiteSpeed Cache** (To handle traffic spikes).
- **UpdraftPlus** (For automated Google Drive backups).

### Affiliate Management
- **ThirstyAffiliates** (For link cloaking, e.g., `/recommends/ai-tool`).

### Extra Monetization
- **Site Kit by Google** (For easy AdSense auto-script injection).
- **MemberPress** (If implementing the Premium Membership system).

## 3. Configuring the REST API
1. Go to Users > Profile.
2. Scroll down to "Application Passwords".
3. Add a new application name (e.g., "AutoWealthOS_Backend").
4. Copy the generated password.
5. In your backend `.env` file, set:
   \`\`\`
   WP_API_URL=https://yourdomain.com/wp-json
   WP_USERNAME=your_admin_username
   WP_APP_PASSWORD=the_generated_password
   \`\`\`

## 4. Setting up Custom Post Types (Optional)
If you want to separate AI generated tools/digital products from regular blog posts:
1. Install **Custom Post Type UI (CPT UI)**.
2. Create a new post type called `digital_product`.
3. Enable REST API support for this CPT within the plugin settings.
