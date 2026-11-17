import {
  auth, db, signInWithEmailAndPassword, signOut, onAuthStateChanged,
  collection, doc, getDoc, getDocs, addDoc, setDoc, deleteDoc, serverTimestamp
} from "./firebase.js";

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const state = { settings: {}, user: null, profile: null, items: { announcements: [], news: [], events: [] }, status: null };
const DEFAULTS = { serverIp: "play.example.net", serverPort: 19132, serverName: "BakaCrew Bedrock", maintenance: false, maintenanceText: "We are performing scheduled maintenance. Please check back soon.", bannerEnabled: false, bannerText: "" };

function toast(message, error = false) {
  const el = $("#toast"); el.textContent = message; el.classList.toggle("error", error); el.classList.add("show");
  clearTimeout(toast.timer); toast.timer = setTimeout(() => el.classList.remove("show"), 2800);
}
function safe(value = "") {
  return String(value).replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
}
function dateLabel(value) {
  if (!value) return "Recently";
  const date = value?.toDate ? value.toDate() : new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString("en-MY", { day:"numeric", month:"short", year:"numeric" });
}
function toDate(value) { return value?.toDate ? value.toDate() : (value ? new Date(value) : new Date(0)); }

async function loadSettings() {
  try {
    const snap = await getDoc(doc(db, "siteSettings", "public"));
    state.settings = { ...DEFAULTS, ...(snap.exists() ? snap.data() : {}) };
  } catch (err) {
    console.warn("Settings read failed; using defaults", err);
    state.settings = { ...DEFAULTS };
  }
  renderSettings();
}
function renderSettings() {
  const s = state.settings;
  $("#serverIp").textContent = s.serverIp || DEFAULTS.serverIp;
  $("#serverPort").textContent = s.serverPort || DEFAULTS.serverPort;
  $("#maintenanceBanner").classList.toggle("hidden", !s.maintenance);
  $("#maintenanceText").textContent = s.maintenanceText || DEFAULTS.maintenanceText;
  let bar = $("#announcementBar");
  if (s.bannerEnabled && s.bannerText) {
    if (!bar) { bar = document.createElement("div"); bar.id = "announcementBar"; bar.className = "announcement-bar"; $(".site-header").after(bar); }
    bar.textContent = s.bannerText;
  } else if (bar) bar.remove();
  document.title = `${s.serverName || "BakaCrew"} — Minecraft Bedrock Network`;
}
async function fetchServerStatus() {
  const host = String(state.settings.serverIp || "").trim();
  const port = Number(state.settings.serverPort || 19132);
  if (!host || host === "play.example.net") {
    setOffline("Set your real server IP in the admin dashboard.");
    return;
  }
  const started = performance.now();
  try {
    const response = await fetch(`https://api.mcsrvstat.us/bedrock/3/${encodeURIComponent(host)}:${port}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`Status service returned ${response.status}`);
    const data = await response.json();
    const elapsed = Math.round(performance.now() - started);
    state.status = data;
    if (data.online) {
      setStatus(true, data, elapsed);
    } else {
      setOffline(data.debug?.error || "The server did not respond. It may be offline or restarting.");
    }
  } catch (error) {
    console.warn("Bedrock status lookup failed", error);
    setOffline("Status service unavailable. Try again shortly.");
  }
}
function setStatus(online, data, elapsed) {
  const pill = $("#serverStatus");
  pill.className = `status-pill ${online ? "status-online" : "status-offline"}`;
  pill.innerHTML = `<span></span><b>${online ? "SERVER ONLINE" : "SERVER OFFLINE"}</b>`;
  $("#playerCount").textContent = online ? `${data.players?.online ?? 0} / ${data.players?.max ?? "—"}` : "— / —";
  $("#serverVersion").textContent = online ? (data.version || "Bedrock") : "—";
  $("#serverLatency").textContent = online ? `${elapsed} ms` : "—";
  const motd = (data.motd?.clean || data.motd?.raw || []).join(" ").trim();
  $("#serverMotd").textContent = motd || (online ? "The world is ready. Come and play!" : "No server message available.");
  $("#lastChecked").textContent = `Checked ${new Date().toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" })}`;
  $("#monitorText").textContent = online ? "Status provider confirms the server is reachable" : "Unable to confirm server availability";
  $("#adminServerStatus").textContent = online ? "Online" : "Offline";
}
function setOffline(reason) {
  setStatus(false, {}, 0);
  $("#serverMotd").textContent = reason;
  $("#lastChecked").textContent = `Checked ${new Date().toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" })}`;
  $("#monitorText").textContent = reason;
  $("#adminServerStatus").textContent = "Offline / Unknown";
}

async function loadPublicContent() {
  const names = ["announcements", "news", "events"];
  const results = await Promise.all(names.map(async name => {
    try {
      const snap = await getDocs(collection(db, name));
      return [name, snap.docs.map(d => ({ id:d.id, ...d.data() })).filter(x => x.status !== "hidden" && x.status !== "draft" && x.status !== "deleted")];
    } catch (err) {
      console.warn(`Could not load ${name}`, err);
      return [name, []];
    }
  }));
  results.forEach(([name, rows]) => state.items[name] = rows.sort((a,b) => toDate(b.createdAt || b.eventDate || b.date) - toDate(a.createdAt || a.eventDate || a.date)));
  renderContent();
}
function renderContent() {
  const announcements = state.items.announcements;
  const news = state.items.news;
  const events = state.items.events;
  $("#announcementList").innerHTML = announcements.length ? announcements.slice(0,5).map(item => `
    <article class="announcement-row"><span class="announcement-mark">!</span><div class="announcement-copy"><div><span class="content-tag">${safe(item.category || "OFFICIAL NOTICE")}</span><time>${safe(dateLabel(item.createdAt || item.date))}</time></div><h3>${safe(item.title || "Community notice")}</h3><p>${safe(item.body || item.content || item.summary || "")}</p></div></article>`).join("") :
    `<div class="empty-card"><span>✧</span><h3>No announcements right now</h3><p>Official notices from the BakaCrew team will appear here.</p></div>`;
  $("#newsGrid").innerHTML = news.length ? news.slice(0,6).map((item,i) => `
    <article class="news-card"><div class="news-card-top"><span class="content-tag">${safe(item.category || "NETWORK UPDATE")}</span><span>${safe(dateLabel(item.createdAt || item.date))}</span></div>
    <div class="news-number">0${i+1}</div><h3>${safe(item.title || "Untitled update")}</h3><p>${safe(item.summary || item.body || item.content || "")}</p></article>`).join("") :
    `<div class="empty-card"><span>✧</span><h3>News is on the way</h3><p>Official updates and stories will appear here.</p></div>`;
  const allEvents = events.slice(0,6);
  $("#eventsList").innerHTML = allEvents.length ? allEvents.map(item => {
    const date = item.eventDate?.toDate ? item.eventDate.toDate() : new Date(item.eventDate || item.date || "");
    const day = item.day || (Number.isNaN(date.getTime()) ? "TBA" : date.toLocaleDateString("en",{day:"2-digit"}));
    const month = item.month || (Number.isNaN(date.getTime()) ? "DATE" : date.toLocaleDateString("en",{month:"short"}).toUpperCase());
    return `<article class="event-row"><div class="event-date"><b>${safe(day)}</b><span>${safe(month)}</span></div><div class="event-info"><span class="content-tag">${safe(item.category || "COMMUNITY EVENT")}</span><h3>${safe(item.title || "Community event")}</h3><p>${safe(item.description || item.body || item.content || "")}</p></div><div class="event-location">${safe(item.location || "BakaCrew Network")}</div></article>`;
  }).join("") : `<div class="empty-card"><span>◷</span><h3>No upcoming events yet</h3><p>Check back soon for the next community activity.</p></div>`;
  $("#adminNewsCount").textContent = news.length;
  $("#adminEventCount").textContent = events.length;
  $("#announcementCount").textContent = announcements.length;
}

async function copyText(text) {
  try { await navigator.clipboard.writeText(text); toast("Copied to clipboard."); }
  catch { const input = document.createElement("textarea"); input.value = text; document.body.append(input); input.select(); document.execCommand("copy"); input.remove(); toast("Copied to clipboard."); }
}
$$("[data-copy]").forEach(btn => btn.addEventListener("click", () => {
  const field = btn.dataset.copy === "ip" ? state.settings.serverIp : String(state.settings.serverPort);
  copyText(field || "");
}));
$("#copyJoin").addEventListener("click", () => copyText(`${state.settings.serverIp || DEFAULTS.serverIp}\n${state.settings.serverPort || 19132}`));
$("#refreshStatus").addEventListener("click", fetchServerStatus);
$("#year").textContent = new Date().getFullYear();

$("#menuToggle").addEventListener("click", () => {
  const nav = $("#mobileNav"); const open = nav.classList.toggle("open");
  $("#menuToggle").setAttribute("aria-expanded", String(open));
});
$("#mobileNav").addEventListener("click", e => { if (e.target.closest("a")) { $("#mobileNav").classList.remove("open"); $("#menuToggle").setAttribute("aria-expanded","false"); } });

function openAdmin() { $("#adminShell").classList.remove("hidden"); document.body.classList.add("admin-open"); }
function closeAdmin() { $("#adminShell").classList.add("hidden"); document.body.classList.remove("admin-open"); }
$("#adminClose").addEventListener("click", closeAdmin);
$("#adminBackdrop").addEventListener("click", closeAdmin);
document.querySelectorAll('a[href="#admin"]').forEach(a => a.addEventListener("click", e => { e.preventDefault(); openAdmin(); }));
function showDashboard(user, profile) {
  $("#adminLogin").classList.add("hidden"); $("#adminDashboard").classList.remove("hidden");
  $("#adminIdentity").textContent = `${profile.displayName || user.email} · ${profile.role}`;
  $("#settingIp").value = state.settings.serverIp || "";
  $("#settingPort").value = state.settings.serverPort || 19132;
  $("#settingName").value = state.settings.serverName || "";
  $("#settingMaintenance").checked = !!state.settings.maintenance;
  $("#settingMaintenanceText").value = state.settings.maintenanceText || "";
  $("#settingBannerEnabled").checked = !!state.settings.bannerEnabled;
  $("#settingBannerText").value = state.settings.bannerText || "";
  renderManager();
}
function showLogin() { $("#adminLogin").classList.remove("hidden"); $("#adminDashboard").classList.add("hidden"); }
async function verifyAdmin(user) {
  const snap = await getDoc(doc(db, "users", user.uid));
  if (!snap.exists()) return null;
  const profile = snap.data();
  const role = String(profile.role || "MEMBER").toUpperCase();
  return ["OWNER","SUPER_ADMIN","ADMIN"].includes(role) && String(profile.status || "ACTIVE").toUpperCase() === "ACTIVE" ? profile : null;
}
onAuthStateChanged(auth, async user => {
  state.user = user;
  if (!user) { state.profile = null; showLogin(); return; }
  try {
    const profile = await verifyAdmin(user);
    if (!profile) { await signOut(auth); $("#loginError").textContent = "This account does not have administrator access."; showLogin(); return; }
    state.profile = profile; showDashboard(user, profile);
  } catch (err) {
    console.error(err); $("#loginError").textContent = "Unable to verify administrator permissions. Check Firestore rules."; showLogin();
  }
});
$("#loginForm").addEventListener("submit", async e => {
  e.preventDefault(); $("#loginError").textContent = "";
  const btn = e.submitter; btn.disabled = true; btn.textContent = "Signing in…";
  try {
    await signInWithEmailAndPassword(auth, $("#adminEmail").value.trim(), $("#adminPassword").value);
  } catch (err) {
    $("#loginError").textContent = err.code === "auth/invalid-credential" ? "Email or password is incorrect." : (err.message || "Sign in failed.");
  } finally { btn.disabled = false; btn.textContent = "Sign in to dashboard"; }
});
$("#adminSignOut").addEventListener("click", async () => { await signOut(auth); showLogin(); toast("Signed out."); });

$$(".admin-tabs button").forEach(btn => btn.addEventListener("click", () => activateTab(btn.dataset.tab)));
$$("[data-tab-jump]").forEach(btn => btn.addEventListener("click", () => activateTab(btn.dataset.tabJump)));
function activateTab(tab) {
  $$(".admin-tabs button").forEach(b => b.classList.toggle("active", b.dataset.tab === tab));
  $$(".admin-tab-panel").forEach(p => p.classList.toggle("hidden", p.id !== `tab-${tab}`));
}
$("#contentType").addEventListener("change", () => {
  const isEvent = $("#contentType").value === "events";
  $("#contentDate").parentElement.querySelector("label").textContent = isEvent ? "Event date" : "Date (optional)";
});
$("#contentForm").addEventListener("submit", async e => {
  e.preventDefault(); $("#contentError").textContent = "";
  if (!state.profile) return;
  const type = $("#contentType").value;
  const title = $("#contentTitle").value.trim(), body = $("#contentBody").value.trim();
  const data = {
    title, category: $("#contentCategory").value.trim() || (type === "events" ? "COMMUNITY EVENT" : "NETWORK UPDATE"),
    body, summary: body.slice(0,180), status: $("#contentPublished").checked ? "published" : "draft",
    createdAt: serverTimestamp(), createdBy: state.user.uid, authorName: state.profile.displayName || state.user.email
  };
  const date = $("#contentDate").value;
  if (date) { data.date = date; if (type === "events") data.eventDate = new Date(`${date}T12:00:00`); }
  if (type === "events") data.description = body;
  const btn = e.submitter; btn.disabled = true; btn.textContent = "Publishing…";
  try {
    await addDoc(collection(db, type), data);
    e.target.reset(); $("#contentPublished").checked = true;
    await loadPublicContent(); await renderManager(); toast("Content saved successfully.");
  } catch (err) { console.error(err); $("#contentError").textContent = err.message || "Unable to save content."; }
  finally { btn.disabled = false; btn.textContent = "Publish content"; }
});
async function renderManager() {
  const rows = [...state.items.announcements.map(x=>({...x,_collection:"announcements"})), ...state.items.news.map(x=>({...x,_collection:"news"})), ...state.items.events.map(x=>({...x,_collection:"events"}))];
  $("#contentManager").innerHTML = rows.length ? rows.slice(0,30).map(item => `<div class="managed-row"><div><small>${safe(item._collection.toUpperCase())} · ${safe(dateLabel(item.createdAt || item.date))}</small><b>${safe(item.title || "Untitled")}</b><span>${safe(item.status || "published")}</span></div><button class="delete-content" data-delete="${safe(item.id)}" data-collection="${safe(item._collection)}" aria-label="Delete ${safe(item.title)}">Delete</button></div>`).join("") : `<p class="admin-help">No content has been published yet.</p>`;
  $$(".delete-content").forEach(btn => btn.addEventListener("click", async () => {
    if (!confirm("Delete this content? This cannot be undone.")) return;
    try { await deleteDoc(doc(db, btn.dataset.collection, btn.dataset.delete)); await loadPublicContent(); await renderManager(); toast("Content deleted."); }
    catch (err) { toast(err.message || "Delete failed.", true); }
  }));
}
$("#serverSettingsForm").addEventListener("submit", async e => {
  e.preventDefault();
  const payload = { serverIp: $("#settingIp").value.trim(), serverPort: Number($("#settingPort").value), serverName: $("#settingName").value.trim() || "BakaCrew Bedrock" };
  if (!payload.serverIp || payload.serverPort < 1 || payload.serverPort > 65535) return toast("Enter a valid server IP and port.", true);
  try { await setPublicSettings(payload); toast("Server details updated."); await fetchServerStatus(); }
  catch (err) { toast(err.message || "Unable to save settings.", true); }
});
async function setPublicSettings(payload) {
  await setDoc(doc(db, "siteSettings", "public"), { ...state.settings, ...payload, updatedAt: serverTimestamp(), updatedBy: state.user.uid }, { merge:true });
  state.settings = { ...state.settings, ...payload }; renderSettings();
}
$("#saveMaintenance").addEventListener("click", async () => {
  try { await setPublicSettings({ maintenance: $("#settingMaintenance").checked, maintenanceText: $("#settingMaintenanceText").value.trim() || DEFAULTS.maintenanceText }); toast("Maintenance settings saved."); }
  catch (err) { toast(err.message || "Unable to save.", true); }
});
$("#saveBanner").addEventListener("click", async () => {
  try { await setPublicSettings({ bannerEnabled: $("#settingBannerEnabled").checked, bannerText: $("#settingBannerText").value.trim() }); toast("Announcement bar settings saved."); }
  catch (err) { toast(err.message || "Unable to save.", true); }
});

await loadSettings();
await loadPublicContent();
await fetchServerStatus();
setInterval(fetchServerStatus, 60000);
setInterval(loadPublicContent, 120000);
