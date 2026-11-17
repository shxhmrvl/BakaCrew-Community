const PIN="200200",KEY="bakacrew_network_hybrid_v1";
const defaults={
 address:"baka.skyes.me",port:"19205",name:"BakaCrew Network",
 announcement:"WELCOME TO BAKACREW NETWORK",maintenance:false,maintenanceText:"The server is currently under maintenance.",
 games:[
 {id:1,name:"Survival",category:"ADVENTURE",description:"Build your base, gather resources and make the world yours.",badge:"FEATURED",symbol:"S"},
 {id:2,name:"Creative",category:"BUILD",description:"Bring your ideas to life and share your creations.",badge:"COMMUNITY",symbol:"C"},
 {id:3,name:"Community Events",category:"EVENTS",description:"Join special sessions, challenges and crew activities.",badge:"EVENTS",symbol:"✦"},
 {id:4,name:"More coming soon",category:"NETWORK",description:"New experiences and activities are on the way.",badge:"COMING SOON",symbol:"+"}
 ],
 players:[
 {id:1,name:"BakaBuilder",role:"Community Builder",score:"FEATURED",description:"Known for bringing creative builds to life."},
 {id:2,name:"CrewMate",role:"Community Regular",score:"HIGHLIGHT"},
 {id:3,name:"BlockArtist",role:"Creative Contributor",score:"HIGHLIGHT"}
 ],
 news:[{id:1,category:"WELCOME",title:"Welcome to BakaCrew Network",body:"The network portal is getting a new home. Keep an eye here for server news, community events and updates.",date:new Date().toISOString()}],
 events:[],
 links:{discord:"",store:"",rules:"",support:""}
};
let data=load();
function clone(x){return JSON.parse(JSON.stringify(x))}
function load(){try{const x=JSON.parse(localStorage.getItem(KEY)||"null");return x&&typeof x==="object"?{...clone(defaults),...x,links:{...defaults.links,...x.links}}:clone(defaults)}catch{return clone(defaults)}}
function persist(){try{localStorage.setItem(KEY,JSON.stringify(data));render();const s=document.getElementById("saveStatus");if(s)s.textContent="Saved on this browser · "+new Date().toLocaleTimeString()}catch{toast("Storage is full. Export a backup and remove old content.")}}
function esc(v=""){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function initials(v="BC"){return String(v).trim().split(/\s+/).slice(0,2).map(x=>x[0]||"").join("").toUpperCase()||"BC"}
function empty(t){return `<div class="empty">${t}</div>`}
function render(){
 document.title=(data.name||"BakaCrew Network")+" | Bedrock Network";
 document.getElementById("serverAddress").textContent=data.address;document.getElementById("serverPort").textContent=data.port;
 document.getElementById("announcementText").textContent=data.announcement||"BAKACREW NETWORK";
 document.getElementById("announcement").classList.toggle("hidden",!data.announcement);
 const games=document.getElementById("gamesGrid");
 games.innerHTML=data.games.length?data.games.map((g,i)=>`<article class="game-card"><div class="game-art"><span class="game-number">EXPERIENCE / ${String(i+1).padStart(2,"0")}</span><span class="game-badge">${esc(g.badge||"NETWORK")}</span><strong class="game-symbol">${esc(g.symbol||initials(g.name))}</strong></div><div class="game-info"><small>${esc(g.category||"NETWORK")}</small><h3>${esc(g.name)}</h3><p>${esc(g.description)}</p><a class="game-link" href="#status">EXPLORE EXPERIENCE ↗</a></div></article>`).join(""):empty("Experiences will be announced soon.");
 const p=data.players||[], featured=p[0];
 document.getElementById("mvpAvatar").textContent=featured?initials(featured.name):"BC";
 document.getElementById("mvpName").textContent=featured?.name||"Community Player";
 document.getElementById("mvpDescription").textContent=featured?.description||"Community highlights will appear here.";
 document.getElementById("leaderRows").innerHTML=p.length?p.map((x,i)=>`<div class="leader-row"><b class="rank-number">#${String(i+1).padStart(2,"0")}</b><div class="player-info"><span class="player-mini">${esc(initials(x.name))}</span><span><strong>${esc(x.name)}</strong><small>${esc(x.role||"Community player")}</small></span></div><span class="player-score">${esc(x.score||"HIGHLIGHT")}</span></div>`).join(""):empty("No player highlights yet.");
 document.getElementById("newsGrid").innerHTML=data.news.length?data.news.slice().reverse().slice(0,6).map(n=>`<article class="news-card"><span class="category">${esc(n.category||"UPDATE")}</span><h3>${esc(n.title)}</h3><p>${esc(n.body)}</p><time>${new Date(n.date).toLocaleDateString()}</time></article>`).join(""):empty("No news yet. Check back soon.");
 document.getElementById("eventList").innerHTML=data.events.length?data.events.slice().sort((a,b)=>a.date.localeCompare(b.date)).map(e=>{const d=new Date(e.date+"T12:00:00");return `<article class="event-row"><div class="event-date"><b>${d.getDate()}</b><small>${d.toLocaleString("en",{month:"short"}).toUpperCase()}</small></div><div><h3>${esc(e.title)}</h3><p>${esc(e.details||"Community event")}</p></div></article>`}).join(""):empty("No upcoming events announced yet.");
 const linkDefs=[["discord","Discord community"],["store","Visit store"],["rules","Server rules"],["support","Get support"]];
 document.getElementById("communityLinks").innerHTML=linkDefs.filter(([k])=>data.links[k]).map(([k,label])=>`<a href="${esc(data.links[k])}" target="_blank" rel="noopener">${label} ↗</a>`).join("")||'<span class="admin-hint">Community links will appear here soon.</span>';
 document.getElementById("editAddress").value=data.address;document.getElementById("editPort").value=data.port;document.getElementById("editName").value=data.name;document.getElementById("editAnnouncement").value=data.announcement||"";
 document.getElementById("editMaintenance").checked=!!data.maintenance;document.getElementById("editMaintenanceText").value=data.maintenanceText||"";
 document.getElementById("linkDiscord").value=data.links.discord||"";document.getElementById("linkStore").value=data.links.store||"";document.getElementById("linkRules").value=data.links.rules||"";document.getElementById("linkSupport").value=data.links.support||"";
 document.getElementById("manageGames").innerHTML=data.games.map(g=>manageItem(g.name,"game",g.id)).join("");
 document.getElementById("managePlayers").innerHTML=data.players.map(p=>manageItem(p.name,"player",p.id)).join("");
 document.getElementById("manageNews").innerHTML=data.news.map(n=>manageItem(n.title,"news",n.id)).join("");
 document.getElementById("manageEvents").innerHTML=data.events.map(e=>manageItem(e.title+" · "+e.date,"event",e.id)).join("");
 document.getElementById("maintenanceNote").textContent=data.maintenance?data.maintenanceText:"";
 document.getElementById("maintenanceNote").classList.toggle("hidden",!data.maintenance);
}
function manageItem(title,type,id){return `<div class="manage-item"><span>${esc(title)}</span><button data-remove="${type}" data-id="${id}">Remove</button></div>`}
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.__toastTimer);window.__toastTimer=setTimeout(()=>t.classList.remove("show"),2100)}
function showAdmin(){document.getElementById("adminModal").classList.remove("hidden");document.getElementById("loginPanel").classList.remove("hidden");document.getElementById("dashboardPanel").classList.add("hidden");document.getElementById("pinInput").value="";document.getElementById("loginError").textContent=""}
document.getElementById("adminOpen").onclick=showAdmin;document.getElementById("mobileAdmin").onclick=()=>{document.getElementById("mobileMenu").classList.add("hidden");showAdmin()};
document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>document.getElementById("adminModal").classList.add("hidden"));
document.getElementById("adminModal").addEventListener("click",e=>{if(e.target.id==="adminModal")e.currentTarget.classList.add("hidden")});
document.getElementById("loginForm").onsubmit=e=>{e.preventDefault();if(document.getElementById("pinInput").value===PIN){document.getElementById("loginPanel").classList.add("hidden");document.getElementById("dashboardPanel").classList.remove("hidden");render()}else document.getElementById("loginError").textContent="Incorrect PIN. Try again."};
document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tab").forEach(x=>x.classList.toggle("active",x===b));document.querySelectorAll(".tab-pane").forEach(x=>x.classList.toggle("hidden",x.id!==b.dataset.tab))});
document.getElementById("settingsForm").onsubmit=e=>{e.preventDefault();data.address=document.getElementById("editAddress").value.trim();data.port=document.getElementById("editPort").value;data.name=document.getElementById("editName").value.trim()||"BakaCrew Network";data.announcement=document.getElementById("editAnnouncement").value.trim();data.maintenance=document.getElementById("editMaintenance").checked;data.maintenanceText=document.getElementById("editMaintenanceText").value.trim();persist();refreshStatus();toast("Network settings saved")};
document.getElementById("gameForm").onsubmit=e=>{e.preventDefault();data.games.push({id:Date.now(),name:val("gameName"),description:val("gameDescription"),category:val("gameCategory")||"NETWORK",badge:val("gameBadge")||"NEW",symbol:initials(val("gameName"))});e.target.reset();persist();toast("Experience added")};
document.getElementById("playerForm").onsubmit=e=>{e.preventDefault();data.players.push({id:Date.now(),name:val("playerName"),role:val("playerRole"),score:val("playerScore")||"HIGHLIGHT"});e.target.reset();persist();toast("Player highlight added")};
document.getElementById("newsForm").onsubmit=e=>{e.preventDefault();data.news.push({id:Date.now(),title:val("newsTitle"),category:val("newsCategory")||"UPDATE",body:val("newsBody"),date:new Date().toISOString()});e.target.reset();persist();toast("News published")};
document.getElementById("eventForm").onsubmit=e=>{e.preventDefault();data.events.push({id:Date.now(),title:val("eventTitle"),date:val("eventDate"),details:val("eventDetails")});e.target.reset();persist();toast("Event added")};
document.getElementById("linksForm").onsubmit=e=>{e.preventDefault();for(const k of ["discord","store","rules","support"])data.links[k]=document.getElementById("link"+k[0].toUpperCase()+k.slice(1)).value.trim();persist();toast("Community links saved")};
function val(id){return document.getElementById(id).value.trim()}
document.addEventListener("click",e=>{const b=e.target.closest("[data-remove]");if(!b)return;const type=b.dataset.remove,id=Number(b.dataset.id);const key={game:"games",player:"players",news:"news",event:"events"}[type];if(key){data[key]=data[key].filter(x=>Number(x.id)!==id);persist();toast("Item removed")}});
document.getElementById("logoutBtn").onclick=()=>{document.getElementById("adminModal").classList.add("hidden");toast("Logged out")};
document.getElementById("exportBtn").onclick=()=>{const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="bakacrew-network-backup.json";a.click();URL.revokeObjectURL(a.href);toast("Backup exported")};
document.getElementById("importFile").onchange=async e=>{const f=e.target.files[0];if(!f)return;try{const x=JSON.parse(await f.text());if(!x||!Array.isArray(x.games)||!Array.isArray(x.players)||!Array.isArray(x.news)||!Array.isArray(x.events))throw Error("invalid");data={...clone(defaults),...x,links:{...defaults.links,...x.links}};persist();toast("Backup restored")}catch{toast("Invalid backup file")}e.target.value=""};
document.querySelectorAll("[data-copy]").forEach(b=>b.onclick=async()=>{const text=b.dataset.copy==="address"?data.address:data.port;try{await navigator.clipboard.writeText(text);toast("Copied "+text)}catch{toast("Copy unavailable: "+text)}});
document.getElementById("themeToggle").onclick=()=>{const next=document.documentElement.dataset.theme==="dark"?"light":"dark";document.documentElement.dataset.theme=next;localStorage.setItem("bakacrew_theme",next);document.getElementById("themeToggle").textContent=next==="dark"?"☾":"☼"};
const savedTheme=localStorage.getItem("bakacrew_theme")||"dark";document.documentElement.dataset.theme=savedTheme;document.getElementById("themeToggle").textContent=savedTheme==="dark"?"☾":"☼";
document.getElementById("dismissAnnouncement").onclick=()=>document.getElementById("announcement").classList.add("hidden");
document.getElementById("menuToggle").onclick=()=>document.getElementById("mobileMenu").classList.toggle("hidden");
document.querySelectorAll("#mobileMenu a").forEach(a=>a.onclick=()=>document.getElementById("mobileMenu").classList.add("hidden"));
document.getElementById("year").textContent=new Date().getFullYear();
let lastStatusRequest=0;
async function refreshStatus(){
 const pill=document.getElementById("statusIndicator"),label=document.getElementById("statusLabel");
 if(data.maintenance){pill.className="status-indicator offline";label.textContent="Maintenance";document.getElementById("serverMessage").textContent=data.maintenanceText;document.getElementById("serverPlayers").textContent="—";document.getElementById("heroStatus").textContent="MAINTENANCE";document.getElementById("heroPlayers").textContent="—";return}
 const now=Date.now();if(now-lastStatusRequest<8000)return;lastStatusRequest=now;
 const endpoints=[
 `https://api.mcstatus.io/v2/status/bedrock/${encodeURIComponent(data.address)}:${encodeURIComponent(data.port)}`,
 `https://api.mcsrvstat.us/bedrock/3/${encodeURIComponent(data.address)}:${encodeURIComponent(data.port)}`
 ];
 let result=null,provider="";
 for(let i=0;i<endpoints.length;i++){try{const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),7000);const r=await fetch(endpoints[i],{signal:controller.signal,cache:"no-store"});clearTimeout(timer);if(!r.ok)continue;const j=await r.json();const online=i===0?j.online===true:j.online===true;if(typeof online==="boolean"){result={online,players:i===0?(j.players?.online??0): (j.players?.online??0),max:i===0?(j.players?.max??null):(j.players?.max??null),version:i===0?(j.version?.name_clean||j.version?.name||"Bedrock"):(j.version||"Bedrock")};provider=i===0?"MCStatus.io":"MCSrvStat";break}}catch{}}
 if(!result){pill.className="status-indicator offline";label.textContent="Status unavailable";document.getElementById("serverMessage").textContent="Status providers did not respond. This does not prove the game server is offline.";document.getElementById("serverPlayers").textContent="—";document.getElementById("heroStatus").textContent="UNKNOWN";document.getElementById("heroPlayers").textContent="—"}
 else{pill.className="status-indicator "+(result.online?"online":"offline");label.textContent=result.online?"Online":"Offline";document.getElementById("serverMessage").textContent=result.online?`Reachable via ${provider} · ${result.version}`:`Server reported offline by ${provider}.`;document.getElementById("serverPlayers").textContent=result.online?`${result.players} / ${result.max??"—"}`:"0 / —";document.getElementById("heroStatus").textContent=result.online?"ONLINE":"OFFLINE";document.getElementById("heroPlayers").textContent=result.online?String(result.players):"0"}
 document.getElementById("statusUpdated").textContent="Checked · "+new Date().toLocaleTimeString();document.getElementById("heroStatusSub").textContent="Status via public query API";
}
render();refreshStatus();setInterval(refreshStatus,60000);
