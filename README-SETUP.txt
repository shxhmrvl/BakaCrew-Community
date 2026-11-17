BAKACREW BEDROCK PORTAL — CLOUDFLARE EDITION
================================================

WHAT'S INCLUDED
- Premium responsive GitHub Pages frontend (existing navy / white / turquoise visual system).
- Cloudflare Worker API + D1 shared database.
- Admin PIN is checked on the server, not stored in browser JavaScript.
- 8-hour signed admin session stored in sessionStorage.
- Shared announcements, news, events, server settings, maintenance notice and announcement bar.
- Public Bedrock status lookup via mcsrvstat.us (client-side, refreshes every 60 seconds).

FILES TO PUT IN YOUR GITHUB REPOSITORY ROOT
index.html, styles.css, app.js, config.js, bakacrew-logo.png
Keep the logo filename exactly bakacrew-logo.png. Do not upload worker files into the website root unless you want them in the repo; worker/ is the backend source.

PART A — CREATE CLOUDFLARE D1
1. Sign in at https://dash.cloudflare.com/ and open Workers & Pages → D1 SQL Database.
2. Create a database named bakacrew-db.
3. Open the database Console and execute all SQL from worker/schema.sql.
4. Copy the database ID shown by Cloudflare.

PART B — DEPLOY THE WORKER
Recommended easiest route: install Node.js on a computer, open a terminal in the worker folder, then run:
  npm create cloudflare@latest -- --existing-script ./src/index.js
If prompted, use the existing Worker and do not replace src/index.js. Alternatively install Wrangler with `npm install -g wrangler`, then `wrangler login`.
5. Edit worker/wrangler.toml and replace REPLACE_WITH_D1_DATABASE_ID with your D1 database ID.
6. From the worker folder run: wrangler deploy
7. Add secrets (use the exact admin PIN you selected):
  wrangler secret put ADMIN_PIN
  wrangler secret put SESSION_SECRET
For ADMIN_PIN enter: 200200
For SESSION_SECRET enter a long random string (at least 32 random characters). Do not put either secret in GitHub files.
8. Your Worker URL will look like https://bakacrew-api.YOUR-SUBDOMAIN.workers.dev
9. Test it by opening https://YOUR-WORKER-URL/api/health. It should return {"ok":true,...}.

PART C — CONNECT GITHUB PAGES
10. Edit config.js. Replace the URL with your actual Worker URL, without a trailing slash.
11. Upload index.html, styles.css, app.js and config.js to the ROOT of https://github.com/shxhmrvl/BakaCrew-Community. Keep bakacrew-logo.png in the same root.
12. Commit changes. GitHub Pages should publish the updated site.
13. Open the site, select Admin and sign in with PIN 200200. Add your real server IP and port in Settings.

IMPORTANT SECURITY NOTES
- Change the default PIN before sharing the admin URL if you want a different PIN. The current requested PIN is 200200.
- ADMIN_PIN and SESSION_SECRET are Worker secrets only; never paste them into app.js, config.js, or public repository files.
- The PIN is a short six-digit code, so use Cloudflare rate limiting/WAF rules if you expect repeated login attempts. Consider changing it periodically.
- Restrict ALLOWED_ORIGIN in wrangler.toml to your exact GitHub Pages origin. If you add a custom domain, add that exact origin separated by a comma.
- GitHub Pages remains public; only the Worker API stores and changes shared content.
- Server status is supplied by a third-party status provider and can be unavailable even when the Minecraft server is running.
- The included free-tier design uses Workers + D1 only. No Firebase, Google Sheets, or paid image storage. News images are not included in this first shared-data build.

FREE PLAN
Cloudflare Workers and D1 have free tiers with usage limits. Stay within the current Cloudflare free allowances to keep this setup at RM0. Check current terms/limits at https://developers.cloudflare.com/workers/platform/pricing/ and https://developers.cloudflare.com/d1/platform/pricing/.

TROUBLESHOOTING
- API URL error: make sure config.js contains your deployed Worker URL.
- CORS error: confirm ALLOWED_ORIGIN exactly matches https://shxhmrvl.github.io (no repo path or trailing slash).
- Database error: check the D1 binding name is DB and database_id is correct.
- Login error: confirm ADMIN_PIN secret is set; set SESSION_SECRET too, then redeploy if needed.
- Changes not showing: refresh the public page; content is stored centrally in D1.
