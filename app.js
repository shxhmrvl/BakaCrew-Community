/* BakaCrew Portal — interactive client-side edition */
const PIN = "200200"; // Front-end demo gate only; use server-side auth for real security.
const KEY = "bakacrew_portal_v2";
const THEME_KEY = "bakacrew_theme";
const defaults = {
  ip:"play.example.net", port:"19132", name:"BakaCrew", maintenance:false,
  maintenanceText:"Server is under maintenance.",
  news:[{id:1,category:"WELCOME",title:"Welcome to BakaCrew",body:"A new adventure starts here. Invite your friends and build something unforgettable.",date:new Date().toISOString()}],
  events:[]
};
const $ = (id) => document.getElementById(id);
const clone = (value) => JSON.parse(JSON.stringify(value));
function load(){
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || "{}");
    return {...clone(defaults), ...saved,
      news:Array.isArray(saved.news) ? saved.news : clone(defaults.news),
      events:Array.isArray(saved.events) ? saved.events : []};
  } catch { return clone(defaults); }
}
let data = load();
let statusController = null;
let statusTimer = null;
let toastTimer = null;
const esc = (s="") => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const safeDate = (value) => {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
};
function persist(){
  try { localStorage.setItem(KEY, JSON.stringify(data)); return true; }
  catch { toast("Storage is full or unavailable"); return false; }
}
function save(){
  if (!persist()) return;
  render();
  const label = $("saveStatus");
  if(label) label.textContent = "Saved in this browser · " + new Date().toLocaleTimeString();
}
function toast(message){
  const el = $("toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}
async function copyText(value){
  try {
    if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(value);
    else {
      const field = document.createElement("textarea");
      field.value = value; field.style.position = "fixed"; field.style.opacity = "0";
      document.body.appendChild(field); field.select();
      if (!document.execCommand("copy")) throw new Error("copy failed");
      field.remove();
    }
    toast("Copied to clipboard");
  } catch { toast("Copy unavailable: " + value); }
}
function eventDateTime(event){
  if (!event.date) return null;
  return safeDate(`${event.date}T${event.time || "20:00"}:00`);
}
function formatEventDate(event){
  const d = safeDate(`${event.date}T12:00:00`);
  return d ? `${d.toLocaleDateString(undefined,{weekday:"short",month:"short",day:"numeric",year:"numeric"})}${event.time ? " · " + event.time : ""}` : event.date;
}
function countdown(event){
  const d = eventDateTime(event);
  if(!d) return "Date to be confirmed";
  const delta = d.getTime() - Date.now();
  if(delta <= 0) return "Event started";
  const days = Math.floor(delta / 86400000);
  const hours = Math.floor((delta % 86400000) / 3600000);
  const mins = Math.floor((delta % 3600000) / 60000);
  return days ? `${days}d ${hours}h to go` : `${hours}h ${mins}m to go`;
}
function filteredNews(){
  const q = $("newsSearch")?.value.trim().toLowerCase() || "";
  const category = $("newsFilter")?.value || "all";
  return data.news.slice().reverse().filter(n =>
    (category === "all" || (n.category || "UPDATE").toUpperCase() === category) &&
    [n.title,n.body,n.category].some(v => String(v || "").toLowerCase().includes(q))
  );
}
function renderNews(){
  const categories = [...new Set(data.news.map(n => (n.category || "UPDATE").toUpperCase()))].sort();
  const filter = $("newsFilter"), selected = filter.value || "all";
  filter.innerHTML = '<option value="all">All categories</option>' + categories.map(c => `<option value="${esc(c)}">${esc(c)}</option>`).join("");
  filter.value = categories.includes(selected) ? selected : "all";
  const items = filteredNews();
  $("newsCount").textContent = `${items.length} ${items.length === 1 ? "update" : "updates"}`;
  $("newsList").innerHTML = items.length ? items.map(n => {
    const date = safeDate(n.date);
    return `<article class="news-card"><span class="category">${esc(n.category || "UPDATE")}</span><h3>${esc(n.title)}</h3><p>${esc(n.body)}</p><time>${date ? date.toLocaleDateString() : "Recently"}</time></article>`;
  }).join("") : '<div class="empty">No matching updates. Try another search or category.</div>';
}
function renderEvents(){
  const q = $("eventSearch")?.value.trim().toLowerCase() || "";
  const items = data.events.slice().sort((a,b) => (a.date || "").localeCompare(b.date || "")).filter(e =>
    [e.title,e.details,e.date].some(v => String(v || "").toLowerCase().includes(q))
  );
  $("eventCount").textContent = `${items.length} ${items.length === 1 ? "event" : "events"}`;
  $("eventsList").innerHTML = items.length ? items.map(e => {
    const d = safeDate(`${e.date}T12:00:00}`);
    return `<article class="event-row"><div class="datebox"><b>${d ? d.getDate() : "—"}</b><small>${d ? d.toLocaleString("en",{month:"short"}).toUpperCase() : "DATE"}</small></div><div class="event-info"><h3>${esc(e.title)}</h3><p>${esc(e.details || "Community event")} · ${esc(formatEventDate(e))}</p><small class="countdown">◷ ${esc(countdown(e))}</small></div><button class="calendar-btn" type="button" data-calendar="${esc(e.id)}" aria-label="Add ${esc(e.title)} to calendar">＋ Calendar</button></article>`;
  }).join("") : '<div class="empty">No upcoming events. Stay tuned!</div>';
}
function renderAdminLists(){
  $("adminNews").innerHTML = data.news.map(n => `<div class="manage-item"><span>${esc(n.title)}</span><button type="button" data-delete-news="${esc(n.id)}">Delete</button></div>`).join("");
  $("adminEvents").innerHTML = data.events.map(e => `<div class="manage-item"><span>${esc(e.title)} · ${esc(e.date)}</span><button type="button" data-delete-event="${esc(e.id)}">Delete</button></div>`).join("");
}
function render(){
  $("serverIp").textContent = data.ip;
  $("serverPort").textContent = data.port;
  document.title = `${data.name || "BakaCrew"} — Bedrock Server`;
  renderNews(); renderEvents(); renderAdminLists();
  if($("maintenance")) $("maintenance").checked = !!data.maintenance;
  if($("maintenanceText")) $("maintenanceText").value = data.maintenanceText || "";
  if($("editIp")) $("editIp").value = data.ip;
  if($("editPort")) $("editPort").value = data.port;
  if($("editName")) $("editName").value = data.name;
  $("statusMessage").textContent = data.maintenance ? data.maintenanceText : $("statusMessage").textContent;
}
function setTheme(theme){
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
  $("themeToggle").textContent = theme === "dark" ? "☾" : "☼";
  $("themeToggle").setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
}
function initTheme(){
  let theme = "light";
  try { theme = localStorage.getItem(THEME_KEY) || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); } catch {}
  setTheme(theme);
}
function openAdmin(){
  $("adminModal").classList.remove("hidden");
  $("loginPanel").classList.remove("hidden");
  $("dashboardPanel").classList.add("hidden");
  $("pinInput").value = ""; $("loginError").textContent = "";
  setTimeout(() => $("pinInput").focus(), 50);
}
function closeAdmin(){ $("adminModal").classList.add("hidden"); }
function addToCalendar(id){
  const e = data.events.find(x => String(x.id) === String(id));
  if(!e) return;
  const start = eventDateTime(e);
  if(!start){ toast("This event has no valid date"); return; }
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  const stamp = d => d.toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,"");
  const ics = ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//BakaCrew//Community Events//EN","BEGIN:VEVENT",`UID:${e.id}@bakacrew`,`DTSTAMP:${stamp(new Date())}`,`DTSTART:${stamp(start)}`,`DTEND:${stamp(end)}`,`SUMMARY:${String(e.title).replace(/[,;]/g," ")}`,`DESCRIPTION:${String(e.details || "BakaCrew community event").replace(/[,;]/g," ")}`,"END:VEVENT","END:VCALENDAR"].join("\r\n");
  const blob = new Blob([ics],{type:"text/calendar;charset=utf-8"});
  const url = URL.createObjectURL(blob), a = document.createElement("a");
  a.href = url; a.download = `bakacrew-${String(e.title).toLowerCase().replace(/[^a-z0-9]+/g,"-")}.ics`;
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  toast("Calendar file created");
}
async function status(){
  if(statusController) statusController.abort();
  if(data.maintenance){
    $("statusPill").className = "status-pill offline";
    $("statusPill").querySelector("span").textContent = "Maintenance";
    $("statusMessage").textContent = data.maintenanceText;
    $("players").textContent = "—"; $("playerMax").textContent = "Server maintenance";
    $("lastChecked").textContent = "Status paused during maintenance";
    return;
  }
  statusController = new AbortController();
  $("refreshStatus").classList.add("is-loading");
  $("statusPill").className = "status-pill checking";
  $("statusPill").querySelector("span").textContent = "Checking…";
  try {
    const url = `https://api.mcsrvstat.us/bedrock/3/${encodeURIComponent(data.ip)}:${encodeURIComponent(data.port)}`;
    const response = await fetch(url,{signal:statusController.signal,cache:"no-store"});
    if(!response.ok) throw new Error("Status service unavailable");
    const result = await response.json();
    const online = !!result.online;
    $("statusPill").className = "status-pill" + (online ? "" : " offline");
    $("statusPill").querySelector("span").textContent = online ? "Online" : "Offline";
    $("players").textContent = online && result.players ? `${result.players.online} / ${result.players.max}` : "0 / —";
    const names = result.players?.list || [];
    $("playerMax").textContent = names.length ? names.slice(0,4).join(", ") : "Players online";
    $("statusMessage").textContent = online ? "Server is reachable. See you in-game!" : "Server is currently offline or not responding.";
  } catch(error) {
    if(error.name !== "AbortError"){
      $("statusPill").className = "status-pill offline";
      $("statusPill").querySelector("span").textContent = "Unknown";
      $("statusMessage").textContent = "Unable to retrieve live status right now.";
      $("players").textContent = "—"; $("playerMax").textContent = "Live data unavailable";
    }
  } finally {
    $("refreshStatus").classList.remove("is-loading");
    $("lastChecked").textContent = "Last checked · " + new Date().toLocaleTimeString();
  }
}
$("adminOpen").addEventListener("click",openAdmin);
document.querySelectorAll("[data-close]").forEach(b => b.addEventListener("click",closeAdmin));
$("adminModal").addEventListener("click",e => { if(e.target === $("adminModal")) closeAdmin(); });
document.addEventListener("keydown",e => { if(e.key === "Escape") closeAdmin(); });
$("loginForm").addEventListener("submit",e => {
  e.preventDefault();
  if($("pinInput").value === PIN){
    $("loginPanel").classList.add("hidden"); $("dashboardPanel").classList.remove("hidden"); render();
  } else { $("loginError").textContent = "Incorrect PIN. Please try again."; $("pinInput").select(); }
});
document.querySelectorAll(".tab").forEach(button => button.addEventListener("click",() => {
  document.querySelectorAll(".tab").forEach(tab => tab.classList.toggle("active",tab === button));
  document.querySelectorAll(".tab-pane").forEach(pane => pane.classList.toggle("hidden",pane.id !== button.dataset.tab));
}));
$("settingsForm").addEventListener("submit",e => {
  e.preventDefault();
  const ip = $("editIp").value.trim(), port = Number($("editPort").value);
  if(!ip || !Number.isInteger(port) || port < 1 || port > 65535){ toast("Enter a valid server address and port"); return; }
  data.ip = ip; data.port = String(port); data.name = $("editName").value.trim() || "BakaCrew";
  data.maintenance = $("maintenance").checked; data.maintenanceText = $("maintenanceText").value.trim() || defaults.maintenanceText;
  save(); status(); toast("Settings saved");
});
$("newsForm").addEventListener("submit",e => {
  e.preventDefault();
  data.news.push({id:Date.now(),category:$("newsCategory").value.trim().toUpperCase() || "UPDATE",title:$("newsTitle").value.trim(),body:$("newsBody").value.trim(),date:new Date().toISOString()});
  e.target.reset(); save(); toast("Update published");
});
$("eventForm").addEventListener("submit",e => {
  e.preventDefault();
  if($("eventDate").value < new Date().toISOString().slice(0,10)){ toast("Choose today or a future date"); return; }
  data.events.push({id:Date.now(),title:$("eventTitle").value.trim(),date:$("eventDate").value,time:$("eventTime").value,details:$("eventDetails").value.trim()});
  e.target.reset(); save(); toast("Event added");
});
document.addEventListener("click",e => {
  const newsId = e.target.dataset.deleteNews, eventId = e.target.dataset.deleteEvent, calendarId = e.target.dataset.calendar;
  if(newsId){ data.news = data.news.filter(x => String(x.id) !== newsId); save(); toast("Update deleted"); }
  if(eventId){ data.events = data.events.filter(x => String(x.id) !== eventId); save(); toast("Event deleted"); }
  if(calendarId) addToCalendar(calendarId);
});
$("logoutBtn").addEventListener("click",() => { closeAdmin(); toast("Logged out"); });
$("exportBtn").addEventListener("click",() => {
  const blob = new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  const url = URL.createObjectURL(blob), a = document.createElement("a");
  a.href = url; a.download = "bakacrew-backup.json"; a.click(); URL.revokeObjectURL(url); toast("Backup exported");
});
$("importFile").addEventListener("change",async e => {
  const file = e.target.files[0]; if(!file) return;
  try {
    const parsed = JSON.parse(await file.text());
    if(!parsed || typeof parsed !== "object" || !Array.isArray(parsed.news) || !Array.isArray(parsed.events)) throw new Error("Invalid structure");
    if(parsed.news.length > 500 || parsed.events.length > 500) throw new Error("Too many records");
    data = {...clone(defaults),...parsed,news:parsed.news,events:parsed.events};
    save(); status(); toast("Backup restored");
  } catch { toast("Invalid or incompatible backup file"); }
  e.target.value = "";
});
document.querySelectorAll("[data-copy]").forEach(button => button.addEventListener("click",() => copyText(button.dataset.copy === "ip" ? data.ip : data.port)));
$("copyJoin").addEventListener("click",() => copyText(`${data.ip}:${data.port}`));
$("refreshStatus").addEventListener("click",status);
$("newsSearch").addEventListener("input",renderNews);
$("newsFilter").addEventListener("change",renderNews);
$("eventSearch").addEventListener("input",renderEvents);
$("themeToggle").addEventListener("click",() => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));
$("menuToggle").addEventListener("click",() => {
  const open = $("mainNav").classList.toggle("nav-open");
  $("menuToggle").setAttribute("aria-expanded",String(open));
});
document.querySelectorAll("#mainNav a").forEach(a => a.addEventListener("click",() => {
  $("mainNav").classList.remove("nav-open"); $("menuToggle").setAttribute("aria-expanded","false");
}));
window.addEventListener("scroll",() => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  $("scrollProgress").style.width = `${max > 0 ? window.scrollY / max * 100 : 0}%`;
},{passive:true});
$("year").textContent = new Date().getFullYear();
initTheme(); render(); status();
statusTimer = setInterval(status,60000);
setInterval(renderEvents,60000);
