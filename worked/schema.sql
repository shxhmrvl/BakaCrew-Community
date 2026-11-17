CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS content (id TEXT PRIMARY KEY, type TEXT NOT NULL CHECK(type IN ('announcements','news','events')), title TEXT NOT NULL, category TEXT DEFAULT '', body TEXT NOT NULL, date TEXT DEFAULT '', status TEXT NOT NULL DEFAULT 'published' CHECK(status IN ('published','draft')), created_at TEXT NOT NULL);
CREATE INDEX IF NOT EXISTS idx_content_type_created ON content(type, created_at DESC);
INSERT OR IGNORE INTO settings(key,value) VALUES ('serverIp','"play.example.net"'),('serverPort','19132'),('serverName','"BakaCrew Bedrock"'),('maintenance','false'),('maintenanceText','"We are performing scheduled maintenance. Please check back soon."'),('bannerEnabled','false'),('bannerText','""');
