(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  const ICONS = {
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
    comment: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    bookmark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
    arrowUpRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M7 7h10v10"/></svg>',
    megaphone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 18-5v12L3 14v-3Z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>'
  };

  const DEMO_DATA = {
    stats: { members: 148, posts: 36, events: 4 },
    announcements: [
      { id: "a1", date: "Nov 2026", title: "BakaCrew Network Portal 2.0 Launch", body: "Welcome to our upgraded corporate community interface featuring global quick search, calendar exports, and enhanced member discussions." },
      { id: "a2", date: "Nov 2026", title: "Q4 Strategic Townhall Registration Open", body: "All active members are invited to submit project updates and agenda proposals before Friday." }
    ],
    posts: [
      { id: "p1", author: "Aiman Hakim", createdAt: "2h ago", category: "Project", title: "BakaCrew Financial Dashboard Integration Notes", body: "Sharing our latest architecture checklist for synchronizing community order enquiries with the quarterly analytics sheet.", likes: 18 },
      { id: "p2", author: "Nadia Sofea", createdAt: "6h ago", category: "Community", title: "Welcome New Members Joining This Week", body: "Introduce yourself below! Share your background, current projects, and how you would like to collaborate with the crew.", likes: 24 },
      { id: "p3", author: "Daniel Tan", createdAt: "1d ago", category: "Question", title: "Best practices for community event check-ins?", body: "Looking for lightweight workflows we can pair with Apps Script for our upcoming Kuala Lumpur meetup.", likes: 11 }
    ],
    news: [
      { id: "n1", category: "Editorial", date: "12 Nov 2026", title: "Building Resilient Member Ecosystems", summary: "How structured communication channels and transparent governance turn casual groups into lasting networks.", body: "Strong communities thrive on clarity, shared ownership, and reliable tooling. Over the past quarter, BakaCrew expanded cross-functional collaboration across engineering, design, and operations." },
      { id: "n2", category: "Spotlight", date: "08 Nov 2026", title: "Q3 Member Showcase Recap", summary: "Highlights from 12 community-led tools, open templates, and business initiatives.", body: "From automated reporting scripts to bespoke brand assets, our members delivered remarkable work during Q3." },
      { id: "n3", category: "Update", date: "01 Nov 2026", title: "Store & Resource Hub Expansion", summary: "New official merchandise and digital starter kits are now available for enquiry.", body: "Explore our refreshed collection curated exclusively for BakaCrew members and partner teams." }
    ],
    events: [
      { id: "e1", day: "22", month: "NOV", location: "Kuala Lumpur / Hybrid", title: "BakaCrew Executive Meetup", description: "Networking session, member lightning talks, and Q4 roadmap alignment." },
      { id: "e2", day: "05", month: "DEC", location: "Online Livestream", title: "Systems & Automation Workshop", description: "Hands-on clinic on Apps Script workflows and lightweight community tools." },
      { id: "e3", day: "18", month: "DEC", location: "BakaCrew HQ", title: "Year-End Community Appreciation", description: "Celebrating key contributors, milestones, and unveiling 2027 initiatives." }
    ],
    products: [
      { id: "pr1", category: "Apparel", name: "BakaCrew Executive Polo", description: "Tailored heavyweight cotton polo with subtle embroidered emblem.", price: "RM 89" },
      { id: "pr2", category: "Digital", name: "Operations & Analytics Kit", description: "Executive dashboard templates and SOP documentation pack.", price: "RM 45" },
      { id: "pr3", category: "Accessories", name: "Obsidian Desk Mat", description: "Minimalist stitched desk mat designed for clean executive setups.", price: "RM 65" }
    ],
    members: [
      { name: "Aiman Hakim", role: "SUPER_ADMIN" },
      { name: "Nadia Sofea", role: "ADMIN" },
      { name: "Daniel Tan", role: "MODERATOR" },
      { name: "Farah Liyana", role: "MEMBER" },
      { name: "Haziq Zulkifli", role: "MEMBER" },
      { name: "Mei Lin", role: "MEMBER" }
    ]
  };

  const S = {
    token: localStorage.getItem("bc_token") || "",
    user: JSON.parse(localStorage.getItem("bc_user") || "null"),
    data: null,
    mode: "all",
    feedSearch: "",
    feedCategory: "ALL",
    storeCategory: "ALL",
    memberSearch: "",
    demoMode: false,
    bookmarks: JSON.parse(localStorage.getItem("bc_bookmarks") || "[]"),
    enquiryHistory: JSON.parse(localStorage.getItem("bc_enquiries") || "[]")
  };

  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));

  const initials = name => String(name || "BC")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() || "")
    .join("") || "BC";

  const getConfig = () => (typeof BAKACREW_CONFIG !== "undefined" ? BAKACREW_CONFIG : { API_URL: "", ANALYTICS_URL: "#" });

  let toastTimer = null;
  function toast(msg, type = "ok") {
    const t = $("#toast");
    const icon = type === "err" ? ICONS.alert : ICONS.check;
    t.innerHTML = `${icon}<span>${esc(msg)}</span>`;
    t.style.borderColor = type === "err" ? "rgba(240,101,117,0.55)" : "rgba(25,219,197,0.45)";
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2800);
  }

  function api(action, p = {}) {
    const cfg = getConfig();
    const u = cfg.API_URL;
    if (!u || u.includes("PASTE_")) {
      return Promise.reject(new Error("Configure Apps Script URL in config.js first."));
    }
    return new Promise((ok, no) => {
      const cb = "bc" + Date.now() + Math.floor(Math.random() * 9999);
      const sc = document.createElement("script");
      const tm = setTimeout(() => {
        clean();
        no(new Error("API timeout. Check Apps Script deployment."));
      }, 15000);
      function clean() {
        clearTimeout(tm);
        delete window[cb];
        sc.remove();
      }
      window[cb] = r => {
        clean();
        r && r.ok ? ok(r.data) : no(new Error((r && r.error) || "API error"));
      };
      sc.onerror = () => {
        clean();
        no(new Error("Cannot connect to Apps Script."));
      };
      const q = new URLSearchParams({
        action,
        callback: cb,
        payload: JSON.stringify({ ...p, token: S.token })
      });
      sc.src = u + (u.includes("?") ? "&" : "?") + q;
      document.body.append(sc);
    });
  }

  function show(html) {
    $("#modalBody").innerHTML = html;
    $("#modal").classList.add("open");
  }

  function closeModal(id = "#modal") {
    $(id).classList.remove("open");
  }

  $("#close").onclick = () => closeModal("#modal");
  $("#adminClose").onclick = () => closeModal("#adminModal");
  ["#modal", "#adminModal"].forEach(id => {
    $(id).addEventListener("click", e => {
      if (e.target.id === id.slice(1)) closeModal(id);
    });
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeModal("#modal");
      closeModal("#adminModal");
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      openGlobalSearch();
    }
  });

  // Scroll Progress & Active Section Highlight
  window.addEventListener("scroll", () => {
    const doc = document.documentElement;
    const pct = (doc.scrollTop / Math.max(1, doc.scrollHeight - doc.clientHeight)) * 100;
    $("#scrollProgress").style.width = `${Math.min(100, Math.max(0, pct))}%`;

    const sections = ["feed", "news", "announcements", "events", "store", "membersSection"];
    let current = "";
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 160) current = id;
    });
    $$(".top nav a").forEach(a => {
      a.classList.toggle("active", a.dataset.nav === current);
    });
  }, { passive: true });

  // Mobile Menu Drawer
  $("#mobileMenuBtn").onclick = () => {
    const open = $("#mobileNav").classList.toggle("open");
    $("#mobileMenuBtn").setAttribute("aria-expanded", String(open));
  };
  $$("#mobileNav a").forEach(a => a.onclick = () => $("#mobileNav").classList.remove("open"));

  // Animated Counters
  function animateCounter(el, target) {
    const num = parseInt(target, 10);
    if (isNaN(num)) {
      el.textContent = target ?? "—";
      return;
    }
    const start = 0;
    const duration = 650;
    const t0 = performance.now();
    const step = now => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(start + (num - start) * eased);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // Authentication & Profile
  function auth(reg = false) {
    show(`
      <label class="badge" style="margin-bottom:10px">${ICONS.shield} COMMUNITY ACCESS</label>
      <h2>${reg ? "Join BakaCrew" : "Welcome back"}</h2>
      <p class="muted">${reg ? "Create your official member account." : "Sign in with your community credentials."}</p>
      <form id="authForm">
        ${reg ? '<div class="field"><label>Display name</label><input name="displayName" required placeholder="e.g. Aiman Hakim"></div>' : ""}
        <div class="field"><label>Username</label><input name="username" required minlength="3" placeholder="username"></div>
        <div class="field"><label>Password</label><input name="password" type="password" required minlength="8" placeholder="Minimum 8 characters"></div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:16px">
          <button class="primary">${reg ? "Create account" : "Sign in"}</button>
          <button type="button" class="outline" id="switchAuth">${reg ? "Already have an account? Sign in" : "New here? Register"}</button>
        </div>
      </form>
    `);
    $("#switchAuth").onclick = () => auth(!reg);
    $("#authForm").onsubmit = async e => {
      e.preventDefault();
      try {
        const r = await api(reg ? "register" : "login", Object.fromEntries(new FormData(e.target)));
        S.token = r.token;
        S.user = r.user;
        localStorage.setItem("bc_token", S.token);
        localStorage.setItem("bc_user", JSON.stringify(S.user));
        closeModal("#modal");
        updateAuth();
        toast(`Welcome to BakaCrew, ${S.user.displayName}.`);
      } catch (x) {
        toast(x.message, "err");
      }
    };
  }

  function editMemberProfile() {
    const savedPosts = (S.data?.posts || []).filter(p => S.bookmarks.includes(p.id));
    show(`
      <div class="author-wrap" style="margin-bottom:16px">
        <div class="avatar" style="width:46px;height:46px;font-size:16px">${esc(initials(S.user.displayName))}</div>
        <div>
          <h2 style="margin:0">${esc(S.user.displayName)}</h2>
          <span class="meta-sub">@${esc(S.user.username)} · <span class="badge neutral">${esc(S.user.role || "MEMBER")}</span></span>
        </div>
      </div>
      <form id="memberProfileForm">
        <div class="field"><label>Display name</label><input name="displayName" required value="${esc(S.user.displayName)}"></div>
        <div class="field"><label>Bio</label><textarea name="bio" maxlength="300" placeholder="Share your role, focus areas, or skills...">${esc(S.user.bio || "")}</textarea></div>
        <button class="primary">Save profile</button>
      </form>
      <div style="margin-top:22px;padding-top:16px;border-top:1px solid var(--border)">
        <small class="muted" style="display:block;margin-bottom:8px">BOOKMARKED POSTS (${savedPosts.length}) · ENQUIRIES (${S.enquiryHistory.length})</small>
        ${S.enquiryHistory.slice(0, 3).map(eq => `<div class="comment-item"><b>${esc(eq.productName)}</b> Qty ${esc(eq.quantity)} · <span class="muted">${esc(eq.date)}</span></div>`).join("") || '<p class="muted">No recent store enquiries recorded on this device.</p>'}
      </div>
    `);
    $("#memberProfileForm").onsubmit = async e => {
      e.preventDefault();
      try {
        const r = await api("updateProfile", Object.fromEntries(new FormData(e.target)));
        S.user = { ...S.user, ...r.user };
        localStorage.setItem("bc_user", JSON.stringify(S.user));
        closeModal("#modal");
        toast("Profile updated.");
        updateAuth();
      } catch (x) {
        toast(x.message, "err");
      }
    };
  }

  function syncAdminButton() {
    const b = $("#adminOpen");
    if (!b) return;
    const isAdmin = Boolean(S.user && ["SUPER_ADMIN", "ADMIN", "MODERATOR"].includes(S.user.role));
    b.classList.toggle("hidden", !isAdmin);
    b.innerHTML = `${ICONS.shield} <span>Admin</span>`;
    b.classList.add("btn-icon");
    b.onclick = openAdmin;
  }

  function updateAuth() {
    $("#login").textContent = S.user ? S.user.displayName : "Sign in";
    $("#join").textContent = S.user ? "Sign out" : "Join community";
    $("#login").onclick = () => (S.user ? editMemberProfile() : auth(false));
    $("#join").onclick = () => {
      if (S.user) {
        S.token = "";
        S.user = null;
        localStorage.removeItem("bc_token");
        localStorage.removeItem("bc_user");
        updateAuth();
        toast("Signed out securely.");
      } else {
        auth(true);
      }
    };
    syncAdminButton();
  }

  // Rendering Sections
  function renderSkeletons() {
    $("#announcementList").innerHTML = '<div class="skeleton"></div>';
    $("#feedList").innerHTML = '<div class="skeleton"></div><div class="skeleton"></div>';
    $("#newsGrid").innerHTML = '<div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div>';
    $("#eventsGrid").innerHTML = '<div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div>';
    $("#storeGrid").innerHTML = '<div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div>';
  }

  function render(d) {
    S.data = d;
    animateCounter($("#members"), d.stats?.members ?? 0);
    animateCounter($("#postsCount"), d.stats?.posts ?? 0);
    animateCounter($("#eventsCount"), d.stats?.events ?? 0);

    // Live ticker in Hero Card
    if (d.announcements && d.announcements[0]) {
      $("#heroLiveTicker").textContent = `Latest Bulletin: ${d.announcements[0].title}`;
    }
    $("#noticeCountBadge").textContent = `${(d.announcements || []).length} Active`;

    // Announcements
    $("#announcementList").innerHTML = (d.announcements || []).map(a => `
      <article class="notice-card">
        <div class="card-meta">
          <span class="badge gold">${ICONS.megaphone} OFFICIAL NOTICE</span>
          <span class="meta-sub">${esc(a.date)}</span>
        </div>
        <h3>${esc(a.title)}</h3>
        <p>${esc(a.body)}</p>
      </article>
    `).join("") || '<article class="notice-card"><p class="muted">No official announcements at the moment.</p></article>';

    renderFeed();

    // News
    $("#newsGrid").innerHTML = (d.news || []).map((n, idx) => `
      <article class="content-card">
        <div>
          <div class="card-kicker">
            <span class="badge">${esc(n.category || "Journal")}</span>
            <span class="meta-sub">${esc(n.date)}</span>
          </div>
          <h3>${esc(n.title)}</h3>
          <p>${esc(n.summary || n.body)}</p>
        </div>
        <div class="price-row">
          <span class="meta-sub">${Math.max(1, Math.ceil(String(n.body || n.summary || "").split(/\s+/).length / 180))} min read</span>
          <button type="button" class="action-chip" data-read-news="${idx}">Read more ${ICONS.arrowUpRight}</button>
        </div>
      </article>
    `).join("") || '<p class="muted">Journal articles coming soon.</p>';

    // Events
    $("#eventsGrid").innerHTML = (d.events || []).map((e, idx) => `
      <article class="content-card">
        <div>
          <div class="event-date-box">
            <div class="date-tile">
              <b>${esc(e.day)}</b>
              <span>${esc(e.month)}</span>
            </div>
            <div>
              <span class="meta-sub" style="display:flex;align-items:center;gap:5px">${ICONS.pin} ${esc(e.location)}</span>
            </div>
          </div>
          <h3>${esc(e.title)}</h3>
          <p>${esc(e.description)}</p>
        </div>
        <div class="price-row">
          <button type="button" class="action-chip" data-ics="${idx}">${ICONS.calendar} Add to Calendar</button>
          <button type="button" class="action-chip" data-share-event="${idx}">${ICONS.share} Share</button>
        </div>
      </article>
    `).join("") || '<p class="muted">No upcoming events scheduled.</p>';

    // Store categories & grid
    const cats = ["ALL", ...new Set((d.products || []).map(p => p.category).filter(Boolean))];
    $("#storeCategoryFilters").innerHTML = cats.map(c =>
      `<button type="button" class="chip-btn ${S.storeCategory === c ? "active" : ""}" data-store-cat="${esc(c)}">${c === "ALL" ? "All Items" : esc(c)}</button>`
    ).join("");
    renderStore();

    // Members
    renderMembers();
    updateSavedCounter();
  }

  function updateSavedCounter() {
    const validIds = new Set((S.data?.posts || []).map(p => p.id));
    const count = S.bookmarks.filter(id => validIds.has(id)).length;
    $("#savedCount").textContent = count;
  }

  function renderFeed() {
    if (!S.data) return;
    let list = [...(S.data.posts || [])];
    if (S.mode === "popular") list.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    if (S.mode === "latest") list.reverse();
    if (S.mode === "saved") list = list.filter(p => S.bookmarks.includes(p.id));

    if (S.feedCategory !== "ALL") {
      list = list.filter(p => String(p.category || "").toLowerCase() === S.feedCategory.toLowerCase());
    }
    if (S.feedSearch.trim()) {
      const q = S.feedSearch.trim().toLowerCase();
      list = list.filter(p =>
        [p.title, p.body, p.author, p.category].some(v => String(v || "").toLowerCase().includes(q))
      );
    }

    $("#feedList").innerHTML = list.map(x => {
      const saved = S.bookmarks.includes(x.id);
      return `
        <article class="post-card" data-post-id="${esc(x.id)}">
          <div class="card-meta">
            <div class="author-wrap">
              <div class="avatar">${esc(initials(x.author))}</div>
              <div>
                <span class="author-name">${esc(x.author)}</span>
                <span class="meta-sub">${esc(x.createdAt)}</span>
              </div>
            </div>
            <span class="badge">${esc(x.category || "Community")}</span>
          </div>
          <h3>${esc(x.title)}</h3>
          <p>${esc(x.body)}</p>
          <div class="post-actions">
            <button type="button" class="action-chip" data-like="${esc(x.id)}">${ICONS.heart} <span>${x.likes || 0} Likes</span></button>
            <button type="button" class="action-chip" data-comments="${esc(x.id)}">${ICONS.comment} <span>Comments</span></button>
            <button type="button" class="action-chip ${saved ? "active" : ""}" data-bookmark="${esc(x.id)}">${ICONS.bookmark} <span>${saved ? "Saved" : "Save"}</span></button>
            <button type="button" class="action-chip" data-share-post="${esc(x.id)}">${ICONS.share} <span>Share</span></button>
          </div>
          <div class="comment-box hidden"></div>
        </article>
      `;
    }).join("") || `<article class="post-card"><p class="muted">${S.mode === "saved" ? "You haven't saved any posts yet." : "No matching discussions found."}</p></article>`;
  }

  function renderStore() {
    if (!S.data) return;
    let prods = [...(S.data.products || [])];
    if (S.storeCategory !== "ALL") {
      prods = prods.filter(p => p.category === S.storeCategory);
    }
    $("#storeGrid").innerHTML = prods.map(p => `
      <article class="content-card">
        <div>
          <div class="card-kicker">
            <span class="badge">${esc(p.category)}</span>
          </div>
          <h3>${esc(p.name)}</h3>
          <p>${esc(p.description)}</p>
        </div>
        <div class="price-row">
          <span class="price-tag">${esc(p.price)}</span>
          <button type="button" class="outline btn-icon" data-order="${esc(p.id)}">${ICONS.bag} <span>Enquire</span></button>
        </div>
      </article>
    `).join("") || '<p class="muted">No products in this category.</p>';
  }

  function renderMembers() {
    if (!S.data) return;
    let mems = [...(S.data.members || [])];
    if (S.memberSearch.trim()) {
      const q = S.memberSearch.trim().toLowerCase();
      mems = mems.filter(m => [m.name, m.role].some(v => String(v || "").toLowerCase().includes(q)));
    }
    $("#memberGrid").innerHTML = mems.map((m, idx) => {
      const isLeader = ["SUPER_ADMIN", "ADMIN", "MODERATOR"].includes(String(m.role || "").toUpperCase());
      return `
        <article class="member-card" data-member-idx="${idx}">
          <div class="avatar">${esc(initials(m.name))}</div>
          <b>${esc(m.name)}</b>
          <span class="badge ${isLeader ? "gold" : "neutral"}">${esc(m.role || "Member")}</span>
        </article>
      `;
    }).join("") || '<p class="muted">No members match your search.</p>';
  }

  // Feed Interactions (Tabs, Filters, Like, Comments, Bookmarks, Share)
  $$("[data-feed]").forEach(b => {
    b.onclick = () => {
      $$("[data-feed]").forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      S.mode = b.dataset.feed;
      renderFeed();
    };
  });

  $("#feedSearch").addEventListener("input", e => {
    S.feedSearch = e.target.value;
    renderFeed();
  });

  $("#feedCategory").addEventListener("change", e => {
    S.feedCategory = e.target.value;
    renderFeed();
  });

  $("#memberSearch").addEventListener("input", e => {
    S.memberSearch = e.target.value;
    renderMembers();
  });

  $("#storeCategoryFilters").addEventListener("click", e => {
    const b = e.target.closest("[data-store-cat]");
    if (!b) return;
    S.storeCategory = b.dataset.storeCat;
    $$("[data-store-cat]").forEach(x => x.classList.toggle("active", x === b));
    renderStore();
  });

  async function loadCommentsForBox(postId, box) {
    box.innerHTML = '<p class="muted" style="margin:0">Loading comments...</p>';
    try {
      const r = await api("getComments", { postId });
      const items = (r.comments || []).map(c => `<div class="comment-item"><b>${esc(c.author)}</b>${esc(c.body)}</div>`).join("") || '<p class="muted" style="margin:0 0 8px">No comments yet. Start the conversation.</p>';
      box.innerHTML = `
        <div class="comment-list">${items}</div>
        <form class="comment-form" data-comment="${esc(postId)}">
          <input name="body" required maxlength="500" placeholder="Write a professional reply...">
          <button class="outline">Send</button>
        </form>
      `;
      box.dataset.loaded = "1";
    } catch (x) {
      box.innerHTML = `<p class="muted">${esc(x.message)}</p>`;
    }
  }

  $("#feedList").addEventListener("click", async e => {
    const likeBtn = e.target.closest("[data-like]");
    if (likeBtn) {
      if (S.demoMode) {
        const p = S.data.posts.find(x => x.id === likeBtn.dataset.like);
        if (p) p.likes = (p.likes || 0) + 1;
        renderFeed();
        return toast("Liked (Demo mode).");
      }
      try {
        await api("likePost", { postId: likeBtn.dataset.like });
        await refresh();
      } catch (x) {
        toast(x.message, "err");
      }
      return;
    }

    const bmBtn = e.target.closest("[data-bookmark]");
    if (bmBtn) {
      const id = bmBtn.dataset.bookmark;
      if (S.bookmarks.includes(id)) {
        S.bookmarks = S.bookmarks.filter(x => x !== id);
        toast("Removed from saved posts.");
      } else {
        S.bookmarks.push(id);
        toast("Post saved to your bookmarks.");
      }
      localStorage.setItem("bc_bookmarks", JSON.stringify(S.bookmarks));
      updateSavedCounter();
      renderFeed();
      return;
    }

    const shareBtn = e.target.closest("[data-share-post]");
    if (shareBtn) {
      const post = (S.data?.posts || []).find(x => x.id === shareBtn.dataset.sharePost);
      if (post) shareContent(post.title, post.body);
      return;
    }

    const commentBtn = e.target.closest("[data-comments]");
    if (commentBtn) {
      if (!S.token && !S.demoMode) return auth(false);
      const id = commentBtn.dataset.comments;
      const article = commentBtn.closest("article");
      const box = article.querySelector(".comment-box");
      box.classList.toggle("hidden");
      if (!box.classList.contains("hidden") && !box.dataset.loaded) {
        if (S.demoMode) {
          box.innerHTML = `
            <div class="comment-list"><div class="comment-item"><b>System</b>Demo preview active. Connect Apps Script in config.js for live comments.</div></div>
            <form class="comment-form" data-comment="${esc(id)}"><input name="body" required placeholder="Write a comment..."><button class="outline">Send</button></form>
          `;
          box.dataset.loaded = "1";
        } else {
          await loadCommentsForBox(id, box);
        }
      }
    }
  });

  $("#feedList").addEventListener("submit", async e => {
    const f = e.target.closest("[data-comment]");
    if (!f) return;
    e.preventDefault();
    const postId = f.dataset.comment;
    const body = new FormData(f).get("body");
    if (S.demoMode) {
      const list = f.previousElementSibling;
      list.insertAdjacentHTML("beforeend", `<div class="comment-item"><b>You</b>${esc(body)}</div>`);
      f.reset();
      return toast("Comment preview added.");
    }
    try {
      await api("createComment", { postId, body });
      toast("Comment published.");
      await loadCommentsForBox(postId, f.closest(".comment-box"));
    } catch (x) {
      toast(x.message, "err");
    }
  });

  // Create Post
  function openCreatePost() {
    if (!S.token && !S.demoMode) return auth(false);
    show(`
      <label class="badge" style="margin-bottom:10px">COMMUNITY FEED</label>
      <h2>Create a post</h2>
      <p class="muted">Share an announcement, project milestone, or question with the network.</p>
      <form id="postForm">
        <div class="field"><label>Title</label><input name="title" required maxlength="100" placeholder="Clear, concise headline"></div>
        <div class="field">
          <label>Message <span id="charCount" style="float:right">0 / 2000</span></label>
          <textarea name="body" id="postBodyInput" required maxlength="2000" placeholder="Write your message..."></textarea>
        </div>
        <div class="field">
          <label>Category</label>
          <select name="category">
            <option>Community</option>
            <option>Question</option>
            <option>Project</option>
            <option>Achievement</option>
          </select>
        </div>
        <button class="primary">Publish post</button>
      </form>
    `);
    $("#postBodyInput").addEventListener("input", ev => {
      $("#charCount").textContent = `${ev.target.value.length} / 2000`;
    });
    $("#postForm").onsubmit = async e => {
      e.preventDefault();
      const payload = Object.fromEntries(new FormData(e.target));
      if (S.demoMode) {
        S.data.posts.unshift({
          id: "demo-" + Date.now(),
          author: S.user?.displayName || "Guest Member",
          createdAt: "Just now",
          likes: 0,
          ...payload
        });
        closeModal("#modal");
        renderFeed();
        return toast("Post published (Demo mode).");
      }
      try {
        await api("createPost", payload);
        closeModal("#modal");
        await refresh();
        toast("Post published.");
      } catch (x) {
        toast(x.message, "err");
      }
    };
  }

  $("#createPost").onclick = openCreatePost;
  $("#heroQuickPost").onclick = openCreatePost;

  // News Reader, Event ICS Export & Share
  $("#newsGrid").addEventListener("click", e => {
    const b = e.target.closest("[data-read-news]");
    if (!b) return;
    const n = S.data.news[Number(b.dataset.readNews)];
    if (!n) return;
    show(`
      <span class="badge" style="margin-bottom:10px">${esc(n.category)} · ${esc(n.date)}</span>
      <h2>${esc(n.title)}</h2>
      <p class="muted" style="font-size:15px;line-height:1.8;margin-top:14px">${esc(n.body || n.summary)}</p>
      <div style="margin-top:20px;display:flex;gap:10px">
        <button type="button" class="outline btn-icon" id="shareArticleBtn">${ICONS.share} <span>Share article</span></button>
      </div>
    `);
    $("#shareArticleBtn").onclick = () => shareContent(n.title, n.summary || n.body);
  });

  $("#eventsGrid").addEventListener("click", e => {
    const icsBtn = e.target.closest("[data-ics]");
    if (icsBtn) {
      const ev = S.data.events[Number(icsBtn.dataset.ics)];
      if (ev) downloadEventIcs(ev);
      return;
    }
    const shareBtn = e.target.closest("[data-share-event]");
    if (shareBtn) {
      const ev = S.data.events[Number(shareBtn.dataset.shareEvent)];
      if (ev) shareContent(`${ev.title} (${ev.day} ${ev.month})`, `${ev.location} — ${ev.description}`);
    }
  });

  function downloadEventIcs(ev) {
    const months = { JAN:"01", FEB:"02", MAR:"03", APR:"04", MAY:"05", JUN:"06", JUL:"07", AUG:"08", SEP:"09", OCT:"10", NOV:"11", DEC:"12" };
    const yr = new Date().getFullYear();
    const mm = months[String(ev.month || "").toUpperCase().slice(0, 3)] || "01";
    const dd = String(ev.day || "01").padStart(2, "0");
    const dt = `${yr}${mm}${dd}T100000`;
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//BakaCrew//Community Network//EN",
      "BEGIN:VEVENT",
      `SUMMARY:${ev.title}`,
      `DTSTART:${dt}`,
      `LOCATION:${ev.location || "BakaCrew"}`,
      `DESCRIPTION:${ev.description || ""}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${ev.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.ics`;
    a.click();
    toast("Calendar invite (.ics) downloaded.");
  }

  async function shareContent(title, text) {
    const url = location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (_) {}
    }
    try {
      await navigator.clipboard.writeText(`${title} — ${url}`);
      toast("Link copied to clipboard.");
    } catch {
      toast("Ready to share.", "ok");
    }
  }

  // Store Order Enquiry
  $("#storeGrid").addEventListener("click", e => {
    const b = e.target.closest("[data-order]");
    if (!b) return;
    if (!S.token && !S.demoMode) return auth(false);
    const p = S.data.products.find(x => x.id === b.dataset.order);
    if (!p) return;
    show(`
      <span class="badge gold" style="margin-bottom:10px">${esc(p.category)}</span>
      <h2>Order enquiry</h2>
      <p class="muted"><strong>${esc(p.name)}</strong> · ${esc(p.price)}</p>
      <form id="orderForm">
        <div class="field"><label>Quantity</label><input name="quantity" type="number" min="1" max="99" value="1" required></div>
        <div class="field"><label>Specification / Delivery Note</label><textarea name="note" placeholder="Size, variation, or contact details..."></textarea></div>
        <button class="primary">Submit enquiry</button>
      </form>
    `);
    $("#orderForm").onsubmit = async ev => {
      ev.preventDefault();
      const formObj = Object.fromEntries(new FormData(ev.target));
      if (!S.demoMode) {
        try {
          await api("createOrder", { productId: p.id, ...formObj });
        } catch (x) {
          return toast(x.message, "err");
        }
      }
      S.enquiryHistory.unshift({
        productName: p.name,
        quantity: formObj.quantity,
        date: new Date().toLocaleDateString()
      });
      localStorage.setItem("bc_enquiries", JSON.stringify(S.enquiryHistory.slice(0, 20)));
      closeModal("#modal");
      toast("Order enquiry submitted successfully.");
    };
  });

  // Member Spotlight Modal
  $("#memberGrid").addEventListener("click", e => {
    const card = e.target.closest("[data-member-idx]");
    if (!card || !S.data) return;
    const m = S.data.members[Number(card.dataset.memberIdx)];
    if (!m) return;
    show(`
      <div class="author-wrap" style="margin-bottom:14px">
        <div class="avatar" style="width:54px;height:54px;font-size:18px">${esc(initials(m.name))}</div>
        <div>
          <h2 style="margin:0">${esc(m.name)}</h2>
          <span class="badge gold" style="margin-top:6px">${esc(m.role || "Community Member")}</span>
        </div>
      </div>
      <p class="muted">Verified member of the BakaCrew Community Network.</p>
    `);
  });

  // Archive Timeline Modal
  $("#openArchiveBtn").onclick = () => {
    show(`
      <label class="badge" style="margin-bottom:8px">COMMUNITY HERITAGE</label>
      <h2>BakaCrew Milestones</h2>
      <p class="muted">Key chapters in the evolution of our network and ecosystem.</p>
      <div class="timeline">
        <div class="timeline-item">
          <span class="badge gold">Chapter I · Foundation</span>
          <h3 style="margin:8px 0 4px">Inception of BakaCrew</h3>
          <p class="muted" style="margin:0">Started as a focused group of creators, builders, and strategists collaborating on shared initiatives.</p>
        </div>
        <div class="timeline-item">
          <span class="badge">Chapter II · Expansion</span>
          <h3 style="margin:8px 0 4px">Launch of Community Hub &amp; Store</h3>
          <p class="muted" style="margin:0">Centralized announcements, member directory, events, and official merchandise enquiries.</p>
        </div>
        <div class="timeline-item">
          <span class="badge">Chapter III · Present</span>
          <h3 style="margin:8px 0 4px">Executive Corporate Platform</h3>
          <p class="muted" style="margin:0">Integrated digital community operations linked directly with the BakaCrew Financial Analytics workspace.</p>
        </div>
      </div>
    `);
  };

  // Global Quick Search (Ctrl+K)
  function openGlobalSearch() {
    show(`
      <label class="badge" style="margin-bottom:8px">GLOBAL COMMAND SEARCH</label>
      <h2>Search BakaCrew</h2>
      <div class="field" style="margin-top:12px">
        <input id="globalSearchInput" type="search" placeholder="Type to search posts, news, events, products, members..." autofocus>
      </div>
      <div id="globalSearchResults" class="search-results">
        <p class="muted">Start typing to explore across all community modules.</p>
      </div>
    `);
    const inp = $("#globalSearchInput");
    setTimeout(() => inp.focus(), 50);
    inp.addEventListener("input", () => {
      const q = inp.value.trim().toLowerCase();
      const box = $("#globalSearchResults");
      if (!q || !S.data) {
        box.innerHTML = '<p class="muted">Start typing to explore across all community modules.</p>';
        return;
      }
      const hits = [];
      (S.data.posts || []).forEach(p => {
        if ((p.title + p.body + p.author).toLowerCase().includes(q)) hits.push({ type: "Feed", title: p.title, href: "#feed" });
      });
      (S.data.news || []).forEach(n => {
        if ((n.title + n.summary).toLowerCase().includes(q)) hits.push({ type: "Journal", title: n.title, href: "#news" });
      });
      (S.data.events || []).forEach(ev => {
        if ((ev.title + ev.location).toLowerCase().includes(q)) hits.push({ type: "Event", title: ev.title, href: "#events" });
      });
      (S.data.products || []).forEach(pr => {
        if ((pr.name + pr.category).toLowerCase().includes(q)) hits.push({ type: "Store", title: pr.name, href: "#store" });
      });
      (S.data.members || []).forEach(m => {
        if ((m.name + m.role).toLowerCase().includes(q)) hits.push({ type: "Member", title: m.name, href: "#membersSection" });
      });
      box.innerHTML = hits.slice(0, 12).map(h => `
        <button type="button" class="search-hit" data-jump="${h.href}">
          <span>${esc(h.title)}</span>
          <span class="badge neutral">${esc(h.type)}</span>
        </button>
      `).join("") || '<p class="muted">No matching items found.</p>';

      $$("[data-jump]", box).forEach(btn => {
        btn.onclick = () => {
          closeModal("#modal");
          location.hash = btn.dataset.jump;
        };
      });
    });
  }
  $("#cmdSearchBtn").onclick = openGlobalSearch;

  // Executive Admin Control Center
  let adminTab = "overview";
  async function openAdmin() {
    try {
      const d = await api("adminGetData");
      const renderAdminTab = () => {
        const statuses = ["NEW", "PROCESSING", "COMPLETED", "CANCELLED"];
        let panel = "";
        if (adminTab === "overview") {
          panel = `
            <div class="admin-grid">
              <div class="metric"><strong>${d.stats.members}</strong><small>Total Members</small></div>
              <div class="metric"><strong>${d.stats.posts}</strong><small>Published Posts</small></div>
              <div class="metric"><strong>${d.stats.orders}</strong><small>Order Enquiries</small></div>
            </div>
            <div class="admin-panel">
              <h3>Quick Publishing</h3>
              <div class="admin-actions">
                <button type="button" class="primary" id="aNews">＋ Publish News</button>
                <button type="button" class="outline" id="aNotice">＋ Post Announcement</button>
                <button type="button" class="outline" id="aEvent">＋ Schedule Event</button>
                <button type="button" class="outline" id="aProduct">＋ Add Product</button>
                <button type="button" class="outline" id="aRefresh">Refresh Data</button>
              </div>
            </div>`;
        } else if (adminTab === "members") {
          panel = `
            <div class="admin-panel">
              <h3>Member Governance (${d.users.length})</h3>
              ${d.users.map(u => `
                <div class="admin-row">
                  <span>
                    <b>${esc(u.displayName)}</b>
                    <br><small class="muted">@${esc(u.username)} · ${esc(u.role)} · <span class="badge ${u.status === "ACTIVE" ? "" : "gold"}">${esc(u.status)}</span></small>
                  </span>
                  <button type="button" class="${u.status === "ACTIVE" ? "danger" : "outline"}" data-user="${esc(u.id)}" data-status="${u.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE"}">${u.status === "ACTIVE" ? "Suspend" : "Activate"}</button>
                </div>
              `).join("")}
            </div>`;
        } else if (adminTab === "moderation") {
          panel = `
            <div class="admin-panel">
              <h3>Feed Moderation (${d.posts.length})</h3>
              ${d.posts.map(p => `
                <div class="admin-row">
                  <span><b>${esc(p.title)}</b><br><small class="muted">${esc(p.author)} · ${esc(p.status)}</small></span>
                  <button type="button" class="danger" data-post="${esc(p.id)}">Hide post</button>
                </div>
              `).join("") || '<p class="muted">No posts to moderate.</p>'}
            </div>`;
        } else if (adminTab === "orders") {
          panel = `
            <div class="admin-panel">
              <h3>Order Enquiries (${d.orders.length})</h3>
              ${d.orders.map(o => `
                <div class="admin-row">
                  <span><b>${esc(o.productName)}</b><br><small class="muted">${esc(o.username)} · Qty ${esc(o.quantity)} · ${esc(o.status)}</small></span>
                  <select class="select-compact" data-order="${esc(o.id)}">
                    ${statuses.map(st => `<option value="${st}" ${o.status === st ? "selected" : ""}>${st}</option>`).join("")}
                  </select>
                </div>
              `).join("") || '<p class="muted">No order enquiries yet.</p>'}
            </div>`;
        }

        $("#adminBody").innerHTML = `
          <label class="badge gold" style="margin-bottom:8px">${ICONS.shield} BAKACREW CONTROL CENTER</label>
          <h2>Executive Admin Dashboard</h2>
          <div class="admin-tabs">
            <button type="button" data-atab="overview" class="${adminTab === "overview" ? "active" : ""}">Overview</button>
            <button type="button" data-atab="members" class="${adminTab === "members" ? "active" : ""}">Members (${d.users.length})</button>
            <button type="button" data-atab="moderation" class="${adminTab === "moderation" ? "active" : ""}">Moderation (${d.posts.length})</button>
            <button type="button" data-atab="orders" class="${adminTab === "orders" ? "active" : ""}">Orders (${d.orders.length})</button>
          </div>
          ${panel}
        `;

        $$("[data-atab]", $("#adminBody")).forEach(btn => {
          btn.onclick = () => {
            adminTab = btn.dataset.atab;
            renderAdminTab();
          };
        });
        if ($("#aRefresh")) $("#aRefresh").onclick = openAdmin;
        if ($("#aNews")) $("#aNews").onclick = () => adminContent("News");
        if ($("#aNotice")) $("#aNotice").onclick = () => adminContent("Announcement");
        if ($("#aEvent")) $("#aEvent").onclick = () => adminContent("Event");
        if ($("#aProduct")) $("#aProduct").onclick = () => adminContent("Product");
      };

      renderAdminTab();
      $("#adminModal").classList.add("open");

      $("#adminBody").onclick = async e => {
        const b = e.target.closest("[data-user],[data-post]");
        if (!b) return;
        try {
          if (b.dataset.user) await api("adminSetUserStatus", { userId: b.dataset.user, status: b.dataset.status });
          if (b.dataset.post) await api("adminSetPostStatus", { postId: b.dataset.post });
          toast("Changes saved.");
          openAdmin();
          refresh();
        } catch (x) {
          toast(x.message, "err");
        }
      };

      $("#adminBody").onchange = async e => {
        const x = e.target.closest("[data-order]");
        if (!x) return;
        try {
          await api("adminSetOrderStatus", { orderId: x.dataset.order, status: x.value });
          toast("Order status updated.");
        } catch (err) {
          toast(err.message, "err");
        }
      };
    } catch (e) {
      toast(e.message, "err");
    }
  }

  function adminContent(type) {
    const schema = {
      News: [["title", "Title"], ["summary", "Summary"], ["body", "Full Article Body"], ["category", "Category"]],
      Announcement: [["title", "Title"], ["body", "Bulletin Message"]],
      Event: [["title", "Event Title"], ["description", "Description"], ["date", "Date (e.g. 22 Nov 2026)"], ["location", "Location"], ["type", "Type"]],
      Product: [["name", "Product Name"], ["description", "Description"], ["category", "Category"], ["price", "Price (e.g. RM 89)"]]
    }[type];

    show(`
      <span class="badge gold" style="margin-bottom:8px">CONTENT PUBLISHER</span>
      <h2>Publish ${esc(type)}</h2>
      <form id="adminContentForm">
        ${schema.map(([n, l]) => `
          <div class="field">
            <label>${l}</label>
            ${["body", "summary", "description"].includes(n)
              ? `<textarea name="${n}" required></textarea>`
              : `<input name="${n}" required>`}
          </div>
        `).join("")}
        <button class="primary">Publish ${esc(type)}</button>
      </form>
    `);

    $("#adminContentForm").onsubmit = async e => {
      e.preventDefault();
      try {
        await api("adminCreateContent", { type, fields: Object.fromEntries(new FormData(e.target)) });
        closeModal("#modal");
        toast(`${type} published.`);
        openAdmin();
        refresh();
      } catch (x) {
        toast(x.message, "err");
      }
    };
  }

  // Initial Boot & Graceful Demo Fallback
  async function refresh() {
    renderSkeletons();
    try {
      const data = await api("getPublicData");
      S.demoMode = false;
      render(data);
    } catch (e) {
      $("#announcementList").innerHTML = "";
      $("#newsGrid").innerHTML = "";
      $("#eventsGrid").innerHTML = "";
      $("#storeGrid").innerHTML = "";
      $("#feedList").innerHTML = `
        <article class="post-card">
          <div class="card-meta">
            <span class="badge gold">${ICONS.alert} BACKEND CONNECTION</span>
          </div>
          <h3>Connect your Google Apps Script backend</h3>
          <p>${esc(e.message)} You can preview all upgraded interactive features right now using Demo Mode.</p>
          <div class="post-actions">
            <button type="button" class="primary" id="enableDemoBtn">Load Interactive Demo Preview</button>
            <button type="button" class="outline" id="retryConnectBtn">Retry Connection</button>
          </div>
        </article>
      `;
      $("#enableDemoBtn").onclick = () => {
        S.demoMode = true;
        render(structuredClone(DEMO_DATA));
        toast("Interactive Demo Mode active.");
      };
      $("#retryConnectBtn").onclick = refresh;
    }
  }

  $("#analyticsLink").href = getConfig().ANALYTICS_URL || "#";
  $("#year").textContent = new Date().getFullYear();
  updateAuth();
  refresh();
})();
