const PIN = "200200";
const KEY = "bakacrew_network_v2";
const MYT_TZ = "Asia/Kuala_Lumpur";

function getMYTParts(date = new Date()) {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: MYT_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
  const map = Object.fromEntries(fmt.formatToParts(date).map(p => [p.type, p.value]));
  const hour = Number(map.hour === "24" ? 0 : map.hour);
  return {
    dateStr: `${map.year}-${map.month}-${map.day}`,
    hour,
    minute: Number(map.minute),
    second: Number(map.second),
    timeStr: `${String(hour).padStart(2, "0")}:${map.minute}:${map.second}`
  };
}

function addDaysISO(isoDate, delta) {
  const d = new Date(isoDate + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() + delta);
  return d.toISOString().slice(0, 10);
}

const todayMYT = getMYTParts().dateStr;

const defaults = {
  address: "baka.skyes.me",
  port: "19205",
  name: "BakaCrew Network",
  announcement: "WELCOME TO BAKACREW BEDROCK · DAILY 9:00 PM MYT STATS LIVE",
  maintenance: false,
  maintenanceText: "The server is currently under scheduled maintenance.",
  games: [
    {
      id: 1,
      name: "Survival SMP",
      category: "ADVENTURE",
      description: "Build your base, team up with friends, trade, and shape our main Bedrock world.",
      badge: "FEATURED",
      symbol: "S",
      highlights: ["Land & chest protection", "Player-driven economy & shops", "9:00 PM MYT community rush hours", "Cross-play Mobile, PC & Console"]
    },
    {
      id: 2,
      name: "Creative Realm",
      category: "BUILD",
      description: "Test redstone contraptions, prototype mega-builds, and showcase your art.",
      badge: "COMMUNITY",
      symbol: "C",
      highlights: ["Dedicated creative plots", "Great for planning SMP mega-bases", "Screenshot showcase eligible"]
    },
    {
      id: 3,
      name: "Community Events",
      category: "EVENTS",
      description: "Special weekend minigames, boss fights, and crew-wide build challenges.",
      badge: "9PM MYT",
      symbol: "✦",
      highlights: ["Hosted around 9:00 PM Malaysia Time", "Exclusive seasonal rewards", "Open to all BakaCrew members"]
    },
    {
      id: 4,
      name: "Seasonal Worlds",
      category: "NETWORK",
      description: "Fresh explorations, limited-time expeditions, and upcoming network modes.",
      badge: "EVOLVING",
      symbol: "+",
      highlights: ["Community-voted world resets & themes", "New quests & custom challenges"]
    }
  ],
  players: [
    { id: 1, name: "BakaBuilder", role: "Community Builder", score: "FEATURED", description: "Known for bringing creative builds and town hubs to life." },
    { id: 2, name: "CrewMate", role: "9PM MYT Regular", score: "HIGHLIGHT" },
    { id: 3, name: "BlockArtist", role: "Creative Contributor", score: "HIGHLIGHT" }
  ],
  news: [
    {
      id: 1,
      category: "WELCOME",
      title: "Welcome to the Upgraded BakaCrew Portal",
      body: "Our Bedrock hub now features one-click Minecraft launch, an interactive player guide, and daily 9:00 PM MYT (GMT+8) server attendance tracking.",
      date: new Date().toISOString()
    },
    {
      id: 2,
      category: "UPDATE",
      title: "Daily 9:00 PM Malaysia Time Snapshot Active",
      body: "Every day at 9:00 PM MYT, we track active crew numbers to chart peak server activity and plan community events.",
      date: new Date(Date.now() - 86400000).toISOString()
    }
  ],
  events: [
    { id: 1, title: "Nightly Crew Hangout & Grind", date: todayMYT, details: "9:00 PM MYT · Main Survival World" }
  ],
  links: { discord: "", store: "", rules: "", support: "" },
  telemetry: [
    { date: addDaysISO(todayMYT, -6), players: 8, capturedAt: "21:00 MYT", type: "sample", note: "Baseline sample" },
    { date: addDaysISO(todayMYT, -5), players: 11, capturedAt: "21:00 MYT", type: "sample", note: "Baseline sample" },
    { date: addDaysISO(todayMYT, -4), players: 9, capturedAt: "21:00 MYT", type: "sample", note: "Baseline sample" },
    { date: addDaysISO(todayMYT, -3), players: 14, capturedAt: "21:00 MYT", type: "sample", note: "Baseline sample" },
    { date: addDaysISO(todayMYT, -2), players: 12, capturedAt: "21:00 MYT", type: "sample", note: "Baseline sample" },
    { date: addDaysISO(todayMYT, -1), players: 16, capturedAt: "21:00 MYT", type: "sample", note: "Baseline sample" }
  ]
};

const wikiData = {
  rules: [
    { num: "01", title: "Respect Every Crew Member", body: "Zero tolerance for harassment, hate speech, or toxic drama. Keep chat welcoming for Malaysian & international players alike." },
    { num: "02", title: "No Griefing or Stealing", body: "Never break, loot, or alter another player's builds or chests without clear permission, even if left unclaimed." },
    { num: "03", title: "Play Fair (No Hacks/X-Ray)", body: "Hacked clients, X-ray packs, duping glitches, and unfair automation are strictly banned." },
    { num: "04", title: "Keep Lag Machines Off", body: "Avoid oversized entity farms or nonstop redstone clocks that degrade TPS for everyone else." },
    { num: "05", title: "Respect Land Space", body: "Leave reasonable breathing room around another player's base unless you are building together." },
    { num: "06", title: "Listen to Staff", body: "Staff decisions keep the world fun and stable. Reach out calmly via Discord or support if you need help." }
  ],
  commands: [
    { cmd: "/spawn", desc: "Return to the main BakaCrew hub or spawn area." },
    { cmd: "/sethome <name>", desc: "Save your current coordinates as a personal home." },
    { cmd: "/home <name>", desc: "Teleport back to your saved home location." },
    { cmd: "/tpa <player>", desc: "Request to teleport to a crew member." },
    { cmd: "/tpaccept", desc: "Accept an incoming teleport request." },
    { cmd: "/msg <player> <text>", desc: "Send a private whisper to an online player." }
  ],
  join: [
    { num: "01", title: "Open Minecraft Bedrock", body: "Launch Minecraft Bedrock Edition (v1.21+) on Windows, Android, iOS, Xbox, PlayStation, or Switch." },
    { num: "02", title: "One-Click or Add Server", body: "Tap 'Launch Minecraft' on this site, or go to Play → Servers → Add Server." },
    { num: "03", title: "Enter Address & Port", body: "Use Server Address: baka.skyes.me and Port: 19205, then save and join the crew!" }
  ],
  faq: [
    { q: "What devices can join BakaCrew?", a: "Any device running Minecraft Bedrock Edition (Android, iOS, Windows 10/11 Bedrock, and consoles using Bedrock Connect / Friends)." },
    { q: "Why 9:00 PM Malaysia Time (GMT+8)?", a: "9:00 PM MYT is our community's standard daily check-in hour when most players hop online after work or school." },
    { q: "How does the 9PM MYT player tracker work?", a: "Whenever the portal is open at or after 9:00 PM MYT, it queries the live Bedrock server and saves today's snapshot. Admins can also log or export historical records." },
    { q: "Can I invite my friends?", a: "Yes! Share baka.skyes.me and port 19205, or send them this website link." }
  ]
};

let data = load();
let activeChartRange = 7;
let activeWikiTab = "rules";
let activeNewsCategory = "ALL";
let latestLiveStatus = null;
let lastStatusRequest = 0;

function clone(x) { return JSON.parse(JSON.stringify(x)); }

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "null");
    if (!raw || typeof raw !== "object") return clone(defaults);
    return {
      ...clone(defaults),
      ...raw,
      links: { ...defaults.links, ...(raw.links || {}) },
      telemetry: Array.isArray(raw.telemetry) ? raw.telemetry : clone(defaults.telemetry)
    };
  } catch {
    return clone(defaults);
  }
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
    render();
    const s = document.getElementById("saveStatus");
    if (s) s.textContent = "Saved locally · " + new Date().toLocaleTimeString();
  } catch {
    toast("Storage full. Export JSON backup and remove old entries.");
  }
}

function esc(v = "") {
  return String(v).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function initials(v = "BC") {
  return String(v).trim().split(/\s+/).slice(0, 2).map(x => x[0] || "").join("").toUpperCase() || "BC";
}

function empty(t) { return `<div class="empty">${t}</div>`; }

function bedrockDeepLink() {
  const name = encodeURIComponent(data.name || "BakaCrew");
  return `minecraft://?addExternalServer=${name}|${data.address}:${data.port}`;
}

function render() {
  document.title = `${data.name || "BakaCrew Network"} | Bedrock Network`;

  // Connection details & deep links
  document.getElementById("serverDisplayName").textContent = data.name || "BakaCrew Network";
  document.getElementById("serverAddress").textContent = data.address;
  document.getElementById("heroCopyAddr").textContent = data.address;
  document.getElementById("serverPort").textContent = data.port;
  document.getElementById("heroLaunchBtn").href = bedrockDeepLink();
  document.getElementById("connectLaunchBtn").href = bedrockDeepLink();

  document.getElementById("announcementText").textContent = data.announcement || "BAKACREW NETWORK";
  document.getElementById("announcement").classList.toggle("hidden", !data.announcement);

  // Experiences
  const gamesGrid = document.getElementById("gamesGrid");
  gamesGrid.innerHTML = data.games.length
    ? data.games.map((g, i) => `
      <article class="game-card" data-game-id="${g.id}">
        <div class="game-art">
          <span class="game-number">EXPERIENCE / ${String(i + 1).padStart(2, "0")}</span>
          <span class="game-badge">${esc(g.badge || "NETWORK")}</span>
          <strong class="game-symbol">${esc(g.symbol || initials(g.name))}</strong>
        </div>
        <div class="game-info">
          <small>${esc(g.category || "NETWORK")}</small>
          <h3>${esc(g.name)}</h3>
          <p>${esc(g.description)}</p>
          <span class="game-link">VIEW DETAILS ↗</span>
        </div>
      </article>`).join("")
    : empty("Experiences will be announced soon.");

  // Leaderboard
  const p = data.players || [];
  const featured = p[0];
  document.getElementById("mvpAvatar").textContent = featured ? initials(featured.name) : "BC";
  document.getElementById("mvpName").textContent = featured?.name || "Community Player";
  document.getElementById("mvpDescription").textContent = featured?.description || "Community highlights will appear here.";
  document.getElementById("leaderRows").innerHTML = p.length
    ? p.map((x, i) => `
      <div class="leader-row">
        <b class="rank-number">#${String(i + 1).padStart(2, "0")}</b>
        <div class="player-info">
          <span class="player-mini">${esc(initials(x.name))}</span>
          <span>
            <strong>${esc(x.name)}</strong>
            <small>${esc(x.role || "Community player")}</small>
          </span>
        </div>
        <span class="player-score">${esc(x.score || "HIGHLIGHT")}</span>
      </div>`).join("")
    : empty("No player highlights yet.");

  // News with filter
  const filteredNews = (data.news || []).slice().reverse().filter(n => {
    if (activeNewsCategory === "ALL") return true;
    return (n.category || "UPDATE").toUpperCase().includes(activeNewsCategory);
  });
  document.getElementById("newsGrid").innerHTML = filteredNews.length
    ? filteredNews.slice(0, 6).map(n => `
      <article class="news-card" data-news-id="${n.id}">
        <span class="category">${esc(n.category || "UPDATE")}</span>
        <h3>${esc(n.title)}</h3>
        <p>${esc(n.body)}</p>
        <time>${new Date(n.date).toLocaleDateString()} · Click to read ↗</time>
      </article>`).join("")
    : empty("No news matching this filter.");

  // Events
  document.getElementById("eventList").innerHTML = data.events.length
    ? data.events.slice().sort((a, b) => a.date.localeCompare(b.date)).map(e => {
        const d = new Date(e.date + "T12:00:00");
        return `
          <article class="event-row">
            <div class="event-date">
              <b>${d.getDate()}</b>
              <small>${d.toLocaleString("en", { month: "short" }).toUpperCase()}</small>
            </div>
            <div>
              <h3>${esc(e.title)}</h3>
              <p>${esc(e.details || "Community event · MYT")}</p>
            </div>
          </article>`;
      }).join("")
    : empty("No upcoming events announced yet.");

  // Community Links
  const linkDefs = [["discord", "Discord Community"], ["store", "Network Store"], ["rules", "Full Rules"], ["support", "Player Support"]];
  document.getElementById("communityLinks").innerHTML = linkDefs
    .filter(([k]) => data.links[k])
    .map(([k, label]) => `<a href="${esc(data.links[k])}" target="_blank" rel="noopener">${label} ↗</a>`)
    .join("") || '<span class="admin-hint">Community links can be added in the Admin Dashboard.</span>';

  // Wiki Hub
  renderWiki();

  // Telemetry
  renderTelemetry();

  // Admin form fields
  document.getElementById("editAddress").value = data.address;
  document.getElementById("editPort").value = data.port;
  document.getElementById("editName").value = data.name;
  document.getElementById("editAnnouncement").value = data.announcement || "";
  document.getElementById("editMaintenance").checked = !!data.maintenance;
  document.getElementById("editMaintenanceText").value = data.maintenanceText || "";
  document.getElementById("linkDiscord").value = data.links.discord || "";
  document.getElementById("linkStore").value = data.links.store || "";
  document.getElementById("linkRules").value = data.links.rules || "";
  document.getElementById("linkSupport").value = data.links.support || "";

  document.getElementById("manageGames").innerHTML = data.games.map(g => manageItem(g.name, "game", g.id)).join("");
  document.getElementById("managePlayers").innerHTML = data.players.map(pl => manageItem(pl.name, "player", pl.id)).join("");
  document.getElementById("manageNews").innerHTML = data.news.map(n => manageItem(n.title, "news", n.id)).join("");
  document.getElementById("manageEvents").innerHTML = data.events.map(ev => manageItem(`${ev.title} · ${ev.date}`, "event", ev.id)).join("");
  document.getElementById("manageTelemetry").innerHTML = (data.telemetry || [])
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(t => manageItem(`${t.date} · ${t.players} players (${t.capturedAt || "21:00 MYT"})`, "telemetry", t.date))
    .join("");

  document.getElementById("maintenanceNote").textContent = data.maintenance ? data.maintenanceText : "";
  document.getElementById("maintenanceNote").classList.toggle("hidden", !data.maintenance);
}

function manageItem(title, type, id) {
  return `<div class="manage-item"><span>${esc(title)}</span><button data-remove="${type}" data-id="${esc(id)}">Remove</button></div>`;
}

function renderWiki() {
  const container = document.getElementById("wikiContent");
  if (activeWikiTab === "rules") {
    container.innerHTML = `<div class="wiki-grid">${wikiData.rules.map(r => `
      <article class="wiki-card">
        <b class="step-num">${r.num}</b>
        <h3>${esc(r.title)}</h3>
        <p>${esc(r.body)}</p>
      </article>`).join("")}</div>`;
  } else if (activeWikiTab === "commands") {
    container.innerHTML = `<div class="wiki-grid">${wikiData.commands.map(c => `
      <div class="command-row">
        <div>
          <code>${esc(c.cmd)}</code>
          <p>${esc(c.desc)}</p>
        </div>
        <button class="command-copy" data-copy-text="${esc(c.cmd)}">COPY</button>
      </div>`).join("")}</div>`;
  } else if (activeWikiTab === "join") {
    container.innerHTML = `<div class="wiki-grid">${wikiData.join.map(j => `
      <article class="wiki-card">
        <b class="step-num">${j.num}</b>
        <h3>${esc(j.title)}</h3>
        <p>${esc(j.body)}</p>
      </article>`).join("")}</div>`;
  } else {
    container.innerHTML = `<div class="faq-list">${wikiData.faq.map((f, idx) => `
      <div class="faq-item ${idx === 0 ? "open" : ""}">
        <button class="faq-q">${esc(f.q)} <span>${idx === 0 ? "−" : "+"}</span></button>
        <div class="faq-a">${esc(f.a)}</div>
      </div>`).join("")}</div>`;
  }
}

/* ===========================
   9PM MYT TELEMETRY ENGINE
   =========================== */
function getTelemetrySeries(days) {
  const nowMYT = getMYTParts();
  const byDate = new Map((data.telemetry || []).map(item => [item.date, item]));
  const series = [];

  for (let i = days - 1; i >= 0; i--) {
    const dStr = addDaysISO(nowMYT.dateStr, -i);
    const rec = byDate.get(dStr);
    if (rec) {
      series.push(rec);
    } else if (dStr === nowMYT.dateStr && latestLiveStatus?.online) {
      series.push({
        date: dStr,
        players: latestLiveStatus.players,
        capturedAt: nowMYT.hour >= 21 ? "21:00 MYT" : `Live (${nowMYT.timeStr.slice(0, 5)} MYT)`,
        type: nowMYT.hour >= 21 ? "captured" : "pending",
        note: nowMYT.hour >= 21 ? "Auto-captured" : "Pre-9PM live preview"
      });
    } else {
      series.push({
        date: dStr,
        players: 0,
        capturedAt: "No log",
        type: "empty",
        note: "No snapshot recorded"
      });
    }
  }
  return series;
}

function recordTodaySnapshot(manual = false) {
  if (!latestLiveStatus || !latestLiveStatus.online) {
    if (manual) toast("Server must be online to capture live count.");
    return false;
  }
  const nowMYT = getMYTParts();
  const idx = (data.telemetry || []).findIndex(t => t.date === nowMYT.dateStr);
  const entry = {
    date: nowMYT.dateStr,
    players: latestLiveStatus.players,
    capturedAt: `${String(nowMYT.hour).padStart(2, "0")}:${String(nowMYT.minute).padStart(2, "0")} MYT`,
    type: nowMYT.hour >= 21 ? "captured" : "live",
    note: manual ? "Manual snapshot" : "Daily 9PM MYT catch"
  };

  if (idx >= 0) {
    // Only overwrite automatically if previous wasn't already a true 21:00 MYT capture, or if manual
    if (manual || data.telemetry[idx].type !== "captured") {
      data.telemetry[idx] = entry;
      persist();
      return true;
    }
    return false;
  } else {
    data.telemetry.push(entry);
    persist();
    return true;
  }
}

function renderTelemetry() {
  const nowMYT = getMYTParts();
  const series = getTelemetrySeries(activeChartRange);
  const validRecords = series.filter(s => s.type !== "empty");

  // KPIs
  const todayRec = (data.telemetry || []).find(t => t.date === nowMYT.dateStr);
  const todayEl = document.getElementById("statTodayCatch");
  const todayMeta = document.getElementById("statTodayMeta");

  if (todayRec) {
    todayEl.textContent = `${todayRec.players} players`;
    todayMeta.textContent = `Logged @ ${todayRec.capturedAt}`;
  } else if (nowMYT.hour >= 21 && latestLiveStatus?.online) {
    todayEl.textContent = `${latestLiveStatus.players} players`;
    todayMeta.textContent = "Capturing 9:00 PM MYT…";
  } else {
    todayEl.textContent = latestLiveStatus?.online ? `${latestLiveStatus.players} live` : "Pending";
    todayMeta.textContent = nowMYT.hour < 21 ? "Scheduled for 9:00 PM MYT" : "Open portal at 9PM MYT to catch";
  }

  const avg = validRecords.length
    ? (validRecords.reduce((sum, x) => sum + Number(x.players || 0), 0) / validRecords.length).toFixed(1)
    : "—";
  document.getElementById("statAvgPlayers").textContent = avg === "—" ? "—" : `${avg} players`;
  document.getElementById("statAvgMeta").textContent = `${validRecords.length} tracked day(s) in ${activeChartRange}D`;

  const peak = validRecords.reduce((best, cur) => (cur.players > (best?.players ?? -1) ? cur : best), null);
  document.getElementById("statPeakPlayers").textContent = peak ? `${peak.players} players` : "—";
  document.getElementById("statPeakDate").textContent = peak ? `${peak.date} (${peak.capturedAt})` : "No data yet";

  // Recent Logs list
  const logs = (data.telemetry || []).slice().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 10);
  document.getElementById("snapshotLogList").innerHTML = logs.length
    ? logs.map(l => `
      <div class="snapshot-row">
        <div>
          <strong>${esc(l.date)}</strong>
          <small>${esc(l.capturedAt || "21:00 MYT")} · ${esc(l.note || "Daily catch")}</small>
        </div>
        <span class="snapshot-count">${l.players} online</span>
      </div>`).join("")
    : empty("No 9PM MYT logs yet.");

  drawTelemetrySVG(series);
}

function drawTelemetrySVG(series) {
  const svg = document.getElementById("telemetryChart");
  const W = 760, H = 270;
  const pad = { top: 24, right: 20, bottom: 38, left: 38 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;

  const maxVal = Math.max(10, ...series.map(d => Number(d.players || 0))) * 1.15;
  const stepX = series.length > 1 ? plotW / (series.length - 1) : plotW;

  const points = series.map((d, i) => {
    const x = pad.left + (series.length > 1 ? i * stepX : plotW / 2);
    const y = pad.top + plotH - ((Number(d.players || 0) / maxVal) * plotH);
    return { ...d, x, y, i };
  });

  // Grid lines
  const gridSteps = 4;
  let gridHtml = "";
  for (let g = 0; g <= gridSteps; g++) {
    const val = Math.round((maxVal / gridSteps) * g);
    const gy = pad.top + plotH - (g / gridSteps) * plotH;
    gridHtml += `<line x1="${pad.left}" y1="${gy}" x2="${W - pad.right}" y2="${gy}" stroke="currentColor" stroke-opacity="0.12" stroke-dasharray="3 4"/>`;
    gridHtml += `<text x="${pad.left - 8}" y="${gy + 4}" text-anchor="end" font-size="10" fill="currentColor" opacity="0.55">${val}</text>`;
  }

  // Area & Line path
  const linePath = points.map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const areaPath = points.length
    ? `${linePath} L ${points[points.length - 1].x.toFixed(1)} ${pad.top + plotH} L ${points[0].x.toFixed(1)} ${pad.top + plotH} Z`
    : "";

  // X Labels (skip some when 30D)
  const labelStride = series.length > 16 ? 4 : series.length > 9 ? 2 : 1;
  const xLabels = points
    .filter((_, idx) => idx % labelStride === 0 || idx === points.length - 1)
    .map(p => `<text x="${p.x}" y="${H - 12}" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.6">${p.date.slice(5)}</text>`)
    .join("");

  const dots = points.map(p => {
    const color = p.type === "pending" ? "#e3ad52" : p.type === "empty" ? "#6d8492" : "#35d6c4";
    return `
      <g class="chart-point" data-idx="${p.i}" style="cursor:pointer">
        <circle cx="${p.x}" cy="${p.y}" r="14" fill="transparent"/>
        <circle cx="${p.x}" cy="${p.y}" r="${p.type === "empty" ? 3 : 5}" fill="${color}" stroke="#082032" stroke-width="2"/>
      </g>`;
  }).join("");

  svg.innerHTML = `
    <defs>
      <linearGradient id="teleGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#35d6c4" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="#35d6c4" stop-opacity="0.01"/>
      </linearGradient>
    </defs>
    ${gridHtml}
    <path d="${areaPath}" fill="url(#teleGrad)"/>
    <path d="${linePath}" fill="none" stroke="#35d6c4" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
    ${xLabels}
    ${dots}
  `;

  // Interactive Hover Tooltip
  const tooltip = document.getElementById("chartTooltip");
  svg.querySelectorAll(".chart-point").forEach(el => {
    el.addEventListener("mouseenter", () => {
      const p = points[Number(el.dataset.idx)];
      tooltip.innerHTML = `
        <div>${esc(p.date)}</div>
        <strong>${p.players} players</strong>
        <div>${esc(p.capturedAt)} · ${esc(p.note || "")}</div>
      `;
      tooltip.style.left = `${(p.x / W) * 100}%`;
      tooltip.style.top = `${(p.y / H) * 100}%`;
      tooltip.classList.remove("hidden");
    });
    el.addEventListener("mouseleave", () => tooltip.classList.add("hidden"));
  });
}

function updateMYTClock() {
  const p = getMYTParts();
  document.getElementById("mytClock").textContent = p.timeStr;
  document.getElementById("mytDateLabel").textContent = `${p.dateStr} · 9PM Catch`;

  // Seconds until next 21:00:00 MYT
  const secNow = p.hour * 3600 + p.minute * 60 + p.second;
  const targetSec = 21 * 3600;
  let diff = targetSec - secNow;
  if (diff < 0) diff += 86400;

  const hh = String(Math.floor(diff / 3600)).padStart(2, "0");
  const mm = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
  const ss = String(diff % 60).padStart(2, "0");

  document.getElementById("heroCountdown").textContent = `${hh}:${mm}:${ss}`;
  document.getElementById("statNextCountdown").textContent = `${hh}h ${mm}m ${ss}s`;

  // Auto-capture if it's >= 21:00 MYT and we haven't captured a 21:00+ snapshot today
  if (p.hour >= 21 && latestLiveStatus?.online) {
    const todayRec = (data.telemetry || []).find(t => t.date === p.dateStr);
    if (!todayRec || todayRec.type !== "captured") {
      recordTodaySnapshot(false);
    }
  }
}

/* ===========================
   LIVE BEDROCK STATUS QUERY
   =========================== */
async function refreshStatus(force = false) {
  const pill = document.getElementById("statusIndicator");
  const label = document.getElementById("statusLabel");
  const headerDot = document.getElementById("headerDot");
  const headerCount = document.getElementById("headerOnlineCount");
  const chipDot = document.getElementById("heroChipDot");
  const chipText = document.getElementById("heroChipText");

  if (data.maintenance) {
    pill.className = "status-indicator offline";
    headerDot.className = "live-dot offline";
    chipDot.className = "live-dot offline";
    label.textContent = "Maintenance";
    headerCount.textContent = "MAINT";
    chipText.textContent = "MAINTENANCE MODE";
    document.getElementById("serverMessage").textContent = data.maintenanceText;
    document.getElementById("serverPlayers").textContent = "—";
    document.getElementById("heroStatus").textContent = "MAINTENANCE";
    document.getElementById("heroPlayers").textContent = "—";
    return;
  }

  const now = Date.now();
  if (!force && now - lastStatusRequest < 8000) return;
  lastStatusRequest = now;

  const endpoints = [
    `https://api.mcstatus.io/v2/status/bedrock/${encodeURIComponent(data.address)}:${encodeURIComponent(data.port)}`,
    `https://api.mcsrvstat.us/bedrock/3/${encodeURIComponent(data.address)}:${encodeURIComponent(data.port)}`
  ];

  let result = null;
  let provider = "";

  for (let i = 0; i < endpoints.length; i++) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 7000);
      const r = await fetch(endpoints[i], { signal: controller.signal, cache: "no-store" });
      clearTimeout(timer);
      if (!r.ok) continue;
      const j = await r.json();
      const online = j.online === true;
      result = {
        online,
        players: j.players?.online ?? 0,
        max: j.players?.max ?? null,
        version: i === 0 ? (j.version?.name_clean || j.version?.name || "Bedrock") : (j.version || "Bedrock")
      };
      provider = i === 0 ? "MCStatus.io" : "MCSrvStat";
      break;
    } catch {}
  }

  latestLiveStatus = result;

  if (!result) {
    pill.className = "status-indicator offline";
    headerDot.className = "live-dot offline";
    chipDot.className = "live-dot offline";
    label.textContent = "Status unavailable";
    headerCount.textContent = "—";
    chipText.textContent = "STATUS UNAVAILABLE";
    document.getElementById("serverMessage").textContent = "Query APIs did not respond. Server may still be online.";
    document.getElementById("serverPlayers").textContent = "—";
    document.getElementById("heroStatus").textContent = "UNKNOWN";
    document.getElementById("heroPlayers").textContent = "—";
  } else {
    const cls = result.online ? "online" : "offline";
    pill.className = `status-indicator ${cls}`;
    headerDot.className = `live-dot ${cls}`;
    chipDot.className = `live-dot ${cls}`;
    label.textContent = result.online ? "Online" : "Offline";
    headerCount.textContent = result.online ? `${result.players} Online` : "Offline";
    chipText.textContent = result.online ? `${result.players} PLAYERS ONLINE` : "SERVER OFFLINE";
    document.getElementById("connectVersion").textContent = String(result.version || "BEDROCK").toUpperCase();
    document.getElementById("serverMessage").textContent = result.online
      ? `Reachable via ${provider} · ${result.version}`
      : `Server reported offline by ${provider}.`;
    document.getElementById("serverPlayers").textContent = result.online ? `${result.players} / ${result.max ?? "—"}` : "0 / —";
    document.getElementById("heroStatus").textContent = result.online ? "ONLINE" : "OFFLINE";
    document.getElementById("heroPlayers").textContent = result.online ? `${result.players}` : "0";
  }

  document.getElementById("statusUpdated").textContent = "Checked · " + new Date().toLocaleTimeString();
  document.getElementById("heroStatusSub").textContent = provider ? `Live via ${provider}` : "Public Bedrock API";

  // Check if >= 9PM MYT to auto-capture
  const nowMYT = getMYTParts();
  if (nowMYT.hour >= 21 && result?.online) {
    recordTodaySnapshot(false);
  } else {
    renderTelemetry();
  }
}

/* ===========================
   UI INTERACTIONS & MODALS
   =========================== */
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => t.classList.remove("show"), 2300);
}

// 3D Parallax tilt on Hero Emblem
const heroVisual = document.getElementById("heroVisual");
const emblem = document.getElementById("pixelEmblem");
if (heroVisual && emblem) {
  heroVisual.addEventListener("mousemove", e => {
    const r = heroVisual.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -14;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 14;
    emblem.style.transform = `rotate(-8deg) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  heroVisual.addEventListener("mouseleave", () => {
    emblem.style.transform = "rotate(-8deg)";
  });
}

// Click Experience or News Card -> Detail Modal
document.addEventListener("click", e => {
  const gameCard = e.target.closest("[data-game-id]");
  if (gameCard) {
    const g = data.games.find(x => Number(x.id) === Number(gameCard.dataset.gameId));
    if (!g) return;
    document.getElementById("detailKicker").textContent = g.category || "EXPERIENCE";
    document.getElementById("detailTitle").textContent = g.name;
    document.getElementById("detailMeta").textContent = `${g.badge || "NETWORK"} · BEDROCK EDITION`;
    document.getElementById("detailBody").textContent = g.description;
    const list = document.getElementById("detailHighlights");
    const items = Array.isArray(g.highlights) ? g.highlights : [];
    list.innerHTML = items.map(i => `<li>${esc(i)}</li>`).join("");
    list.classList.toggle("hidden", items.length === 0);
    document.getElementById("detailActionBtn").classList.remove("hidden");
    document.getElementById("detailModal").classList.remove("hidden");
    return;
  }

  const newsCard = e.target.closest("[data-news-id]");
  if (newsCard) {
    const n = data.news.find(x => Number(x.id) === Number(newsCard.dataset.newsId));
    if (!n) return;
    document.getElementById("detailKicker").textContent = n.category || "INTEL";
    document.getElementById("detailTitle").textContent = n.title;
    document.getElementById("detailMeta").textContent = new Date(n.date).toLocaleDateString();
    document.getElementById("detailBody").textContent = n.body;
    document.getElementById("detailHighlights").classList.add("hidden");
    document.getElementById("detailActionBtn").classList.add("hidden");
    document.getElementById("detailModal").classList.remove("hidden");
    return;
  }

  const copyCmd = e.target.closest("[data-copy-text]");
  if (copyCmd) {
    navigator.clipboard?.writeText(copyCmd.dataset.copyText)
      .then(() => toast(`Copied ${copyCmd.dataset.copyText}`))
      .catch(() => toast(copyCmd.dataset.copyText));
    return;
  }

  const faqBtn = e.target.closest(".faq-q");
  if (faqBtn) {
    const item = faqBtn.closest(".faq-item");
    const isOpen = item.classList.toggle("open");
    faqBtn.querySelector("span").textContent = isOpen ? "−" : "+";
    return;
  }

  const rem = e.target.closest("[data-remove]");
  if (rem) {
    const type = rem.dataset.remove;
    const id = rem.dataset.id;
    if (type === "telemetry") {
      data.telemetry = (data.telemetry || []).filter(t => t.date !== id);
    } else {
      const key = { game: "games", player: "players", news: "news", event: "events" }[type];
      if (key) data[key] = data[key].filter(x => Number(x.id) !== Number(id));
    }
    persist();
    toast("Item removed");
  }
});

document.querySelectorAll("[data-close-detail]").forEach(b => {
  b.onclick = () => document.getElementById("detailModal").classList.add("hidden");
});
document.getElementById("detailModal").addEventListener("click", e => {
  if (e.target.id === "detailModal") e.currentTarget.classList.add("hidden");
});

// Range Pills (7D, 14D, 30D)
document.querySelectorAll(".range-pill").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".range-pill").forEach(x => x.classList.toggle("active", x === btn));
    activeChartRange = Number(btn.dataset.range);
    renderTelemetry();
  };
});

// Wiki Tabs
document.querySelectorAll(".wiki-tab").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".wiki-tab").forEach(x => x.classList.toggle("active", x === btn));
    activeWikiTab = btn.dataset.wiki;
    renderWiki();
  };
});

// News Filters
document.querySelectorAll(".filter-chip").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".filter-chip").forEach(x => x.classList.toggle("active", x === btn));
    activeNewsCategory = btn.dataset.cat;
    render();
  };
});

// Sync Snapshot & Refresh Buttons
document.getElementById("captureNowBtn").onclick = async () => {
  await refreshStatus(true);
  if (recordTodaySnapshot(true)) toast("Recorded today's live player snapshot!");
};
document.getElementById("manualRefreshBtn").onclick = () => {
  refreshStatus(true);
  toast("Refreshing Bedrock server status…");
};

// Copy Server Details
document.querySelectorAll("[data-copy]").forEach(b => {
  b.onclick = async () => {
    const type = b.dataset.copy;
    const text = type === "address" ? data.address : type === "port" ? data.port : (data.name || "BakaCrew Network");
    try {
      await navigator.clipboard.writeText(text);
      toast(`Copied ${text}`);
    } catch {
      toast(`Copy: ${text}`);
    }
  };
});

/* ===========================
   ADMIN DASHBOARD
   =========================== */
function showAdmin() {
  document.getElementById("adminModal").classList.remove("hidden");
  document.getElementById("loginPanel").classList.remove("hidden");
  document.getElementById("dashboardPanel").classList.add("hidden");
  document.getElementById("pinInput").value = "";
  document.getElementById("loginError").textContent = "";
}

document.getElementById("adminOpen").onclick = showAdmin;
document.getElementById("mobileAdmin").onclick = () => {
  document.getElementById("mobileMenu").classList.add("hidden");
  showAdmin();
};
document.querySelectorAll("[data-close]").forEach(b => {
  b.onclick = () => document.getElementById("adminModal").classList.add("hidden");
});
document.getElementById("adminModal").addEventListener("click", e => {
  if (e.target.id === "adminModal") e.currentTarget.classList.add("hidden");
});

document.getElementById("loginForm").onsubmit = e => {
  e.preventDefault();
  if (document.getElementById("pinInput").value === PIN) {
    document.getElementById("loginPanel").classList.add("hidden");
    document.getElementById("dashboardPanel").classList.remove("hidden");
    document.getElementById("teleDate").value = getMYTParts().dateStr;
    render();
  } else {
    document.getElementById("loginError").textContent = "Incorrect PIN. Try again.";
  }
};

document.querySelectorAll(".tab").forEach(b => {
  b.onclick = () => {
    document.querySelectorAll(".tab").forEach(x => x.classList.toggle("active", x === b));
    document.querySelectorAll(".tab-pane").forEach(x => x.classList.toggle("hidden", x.id !== b.dataset.tab));
  };
});

function val(id) { return document.getElementById(id).value.trim(); }

document.getElementById("settingsForm").onsubmit = e => {
  e.preventDefault();
  data.address = val("editAddress");
  data.port = val("editPort");
  data.name = val("editName") || "BakaCrew Network";
  data.announcement = val("editAnnouncement");
  data.maintenance = document.getElementById("editMaintenance").checked;
  data.maintenanceText = val("editMaintenanceText");
  persist();
  refreshStatus(true);
  toast("Network settings saved");
};

document.getElementById("telemetryForm").onsubmit = e => {
  e.preventDefault();
  const date = val("teleDate");
  const players = Math.max(0, Number(val("telePlayers")));
  const note = val("teleNote") || "Admin 9PM MYT entry";
  const idx = (data.telemetry || []).findIndex(t => t.date === date);
  const entry = { date, players, capturedAt: "21:00 MYT", type: "captured", note };
  if (idx >= 0) data.telemetry[idx] = entry;
  else data.telemetry.push(entry);
  e.target.reset();
  document.getElementById("tel
