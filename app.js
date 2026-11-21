/* ============================================================
   田约认采 · 农户端交互原型
   Static demo. No build step, no external dependencies.
   ============================================================ */

(() => {
  "use strict";

  /* ---------- Icons ---------- */

  const ICON_PATHS = {
    home: '<path d="M3.5 10.8 12 3.6l8.5 7.2V20a1 1 0 0 1-1 1h-5v-6.4H9.5V21h-5a1 1 0 0 1-1-1z"/>',
    camera: '<path d="M4 7.8h3.1L8.7 5.5h6.6l1.6 2.3H20a1 1 0 0 1 1 1v9.4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8.8a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13.6" r="3.5"/>',
    receipt: '<path d="M5 3.5h14v17l-2.8-1.7-2.8 1.7-2.7-1.7-2.8 1.7L5 18.8z"/><path d="M8.5 8h7M8.5 11.5h7M8.5 15h4"/>',
    tree: '<path d="M12 22v-6"/><path d="M9 16h6"/><path d="M12 3c4.6 0 7 3.2 7 6.5 0 2.4-1.3 4.2-3.3 5.2H8.3C6.3 13.7 5 11.9 5 9.5 5 6.2 7.4 3 12 3Z"/><path d="M12 3v13"/>',
    wallet: '<path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H19a1 1 0 0 1 1 1v12.5a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 17z"/><path d="M4 8.5h14.5A1.5 1.5 0 0 1 20 10v4h-4a2.5 2.5 0 0 1 0-5h4"/>',
    broadcast: '<circle cx="12" cy="12" r="2.2"/><path d="M7.5 7.5a6.4 6.4 0 0 0 0 9M16.5 7.5a6.4 6.4 0 0 1 0 9M4.8 4.8a10.2 10.2 0 0 0 0 14.4M19.2 4.8a10.2 10.2 0 0 1 0 14.4"/>',
    user: '<circle cx="12" cy="8" r="3.8"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/>',
    bell: '<path d="M18 8.5a6 6 0 0 0-12 0c0 7-2.5 7.5-2.5 9h17c0-1.5-2.5-2-2.5-9Z"/><path d="M9.8 21h4.4"/>',
    'cloud-sun': '<path d="M12 3v2M5.6 6.1l1.4 1.4M3.5 13H5M18.4 6.1 17 7.5"/><path d="M8.5 10.2A4 4 0 0 1 16 11a3.3 3.3 0 0 1 .3 6.6H8.6A3.5 3.5 0 0 1 8.5 10.2Z"/>',
    'arrow-up-right': '<path d="M7 17 17 7M8 7h9v9"/>',
    'arrow-right': '<path d="M4.5 12h15M13.5 6l6 6-6 6"/>',
    'arrow-left': '<path d="M19.5 12h-15M10.5 6l-6 6 6 6"/>',
    'chevron-right': '<path d="m9 5 7 7-7 7"/>',
    'chevron-left': '<path d="m15 5-7 7 7 7"/>',
    'chevron-down': '<path d="m5 9 7 7 7-7"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 6.7"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    sparkles: '<path d="m12 3 1.4 4.2L18 8.6l-4.6 1.4L12 14.2l-1.4-4.2L6 8.6l4.6-1.4z"/><path d="m18.5 14 .8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8zM5.5 14l.6 1.6 1.6.6-1.6.6L5.5 18l-.6-1.2-1.6-.6 1.6-.6z"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3M9 21h6"/>',
    image: '<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><circle cx="9" cy="9.5" r="1.6"/><path d="m4.5 17 5-4.5 3.5 3 2.8-2.5 4.7 4.5"/>',
    video: '<rect x="3.5" y="6" width="12" height="12" rx="2"/><path d="m15.5 10 5-2.5v9l-5-2.5"/>',
    tag: '<path d="M3.8 5.2v6.6L13.9 22l8.1-8.1L11.5 3.5H4.8a1 1 0 0 0-1 1Z"/><circle cx="8.3" cy="8.2" r="1.4"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M7.5 3v4M16.5 3v4M3.5 10h17"/>',
    clock: '<circle cx="12" cy="12" r="8.7"/><path d="M12 7v5.4l3.4 2"/>',
    'map-pin': '<path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/>',
    play: '<path d="m8 5 11 7-11 7z"/>',
    users: '<circle cx="9" cy="8" r="3.2"/><path d="M2.8 20a6.2 6.2 0 0 1 12.4 0M16 5.2a3.4 3.4 0 0 1 0 6.6M17.8 14.5A5.5 5.5 0 0 1 21.5 20"/>',
    'message-circle': '<path d="M20.5 11.5a8.3 8.3 0 0 1-9 8.2 9.3 9.3 0 0 1-3.2-.8L3.5 20.5l1.6-4.4a8.3 8.3 0 1 1 15.4-4.6Z"/>',
    heart: '<path d="M20.4 5.4a5.1 5.1 0 0 0-7.2 0L12 6.6l-1.2-1.2a5.1 5.1 0 0 0-7.2 7.2L12 21l8.4-8.4a5.1 5.1 0 0 0 0-7.2Z"/>',
    send: '<path d="m21 3-7.2 18-3.3-7.4L3 10.2z"/><path d="M21 3 10.5 13.6"/>',
    truck: '<path d="M3.5 6.5h10v10h-10zM13.5 10h4l3 3.2v3.3h-7z"/><circle cx="7" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/>',
    package: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z"/><path d="m4.3 7.8 7.7 4.4 7.7-4.4M12 12.2V21"/>',
    'shield-check': '<path d="m12 3 8 3v6c0 4.6-3.4 7.7-8 9-4.6-1.3-8-4.4-8-9V6z"/><path d="m8.5 12 2.5 2.5 4.8-5"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4v-.2a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/>',
    'help-circle': '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.6 2.6 0 1 1 4.3 2c-.9.7-1.8 1.2-1.8 2.5M12 17.2h.01"/>',
    'log-out': '<path d="M10 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h5M14.5 8l4 4-4 4M9 12h9.5"/>',
    leaf: '<path d="M20.5 3.5C12 3.3 5 6.3 5 13a6 6 0 0 0 6 6c6.7 0 9.5-7 9.5-15.5Z"/><path d="M4 21c1.5-5 5-8.5 10.5-11"/>',
    sprout: '<path d="M12 21v-8"/><path d="M12 13C7.8 13 5 10.2 5 6c4.2 0 7 2.8 7 7ZM12 10c0-3.8 2.4-6.2 6-6.2 0 3.8-2.4 6.2-6 6.2Z"/>',
    more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    'edit-3': '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    'alert-circle': '<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5h.01"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5h.01"/>',
    'bar-chart': '<path d="M5 20V10M12 20V4M19 20v-7"/>',
    smartphone: '<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M10 5h4M11 18.5h2"/>',
    'external-link': '<path d="M14 4h6v6M20 4 10.5 13.5"/><path d="M19 14v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4"/>',
    'refresh-ccw': '<path d="M3 12a9 9 0 0 1 15.5-6.2L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.5 6.2L3 16M3 21v-5h5"/>',
    award: '<circle cx="12" cy="9" r="5.5"/><path d="m8.5 13.7-1.3 7 4.8-2.5 4.8 2.5-1.3-7"/>',
    'chevron-up': '<path d="m5 15 7-7 7 7"/>',
    settings2: '<path d="M4 6h16M4 12h16M4 18h16"/><circle cx="9" cy="6" r="1.6"/><circle cx="15" cy="12" r="1.6"/><circle cx="8" cy="18" r="1.6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    gift: '<rect x="3.5" y="8.5" width="17" height="12" rx="1.5"/><path d="M12 8.5V21M3.5 12.5h17M7.7 8.5a2.7 2.7 0 1 1 0-5.4C10.4 3.1 12 8.5 12 8.5s1.6-5.4 4.3-5.4a2.7 2.7 0 1 1 0 5.4"/>',
    lock: '<rect x="4.5" y="10" width="15" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    wifi: '<path d="M2.8 8.8a14 14 0 0 1 18.4 0M5.8 12.4a9.5 9.5 0 0 1 12.4 0M8.8 16a5 5 0 0 1 6.4 0M12 19.5h.01"/>',
    battery: '<rect x="2.5" y="7" width="17" height="10" rx="2"/><path d="M22 10v4"/><rect x="5" y="9.5" width="11" height="5" rx="1"/>',
    eye: '<path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>',
    "volume-2": '<path d="M11 5 6.5 8.8H3v6.4h3.5L11 19z"/><path d="M15 9a4.2 4.2 0 0 1 0 6M17.8 6.5a8 8 0 0 1 0 11"/>',
    'clipboard': '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2.8h6V4M9 9h6M9 13h6M9 17h4"/>',
    'photo-stack': '<rect x="7" y="3" width="14" height="14" rx="2"/><path d="M3 7v13a1 1 0 0 0 1 1h13"/><circle cx="12" cy="8" r="1.2"/><path d="m8 14 3-3 2.2 2.2 1.8-1.8 3 2.6"/>'
  };

  function icon(name, cls = "") {
    const path = ICON_PATHS[name] || ICON_PATHS.info;
    return `<span class="icon ${cls}" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round">${path}</svg></span>`;
  }

  function hydrateStaticIcons(root = document) {
    root.querySelectorAll("[data-icon]").forEach((el) => {
      const name = el.getAttribute("data-icon");
      el.innerHTML = icon(name);
    });
  }

  /* ---------- Utilities ---------- */

  const clone = (value) => JSON.parse(JSON.stringify(value));
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
  }

  function safeColor(value) {
    return /^#[0-9a-f]{3,8}$/i.test(String(value || "")) ? value : "#dfe9d7";
  }

  function safeMediaSrc(value) {
    const src = String(value || "");
    if (/^(assets\/|blob:|data:image\/|data:video\/)/.test(src)) return src;
    return "assets/orchard-wide.webp";
  }

  function formatNumber(value) {
    return Number(value || 0).toLocaleString("zh-CN");
  }

  function formatMoney(value, decimals = 0) {
    return Number(value || 0).toLocaleString("zh-CN", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function todayLabel() {
    const d = new Date();
    const weekday = "日一二三四五六"[d.getDay()];
    return `${d.getMonth() + 1}月${d.getDate()}日 · 周${weekday}`;
  }

  function timeNow() {
    return new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false });
  }

  function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function percent(part, total) {
    return total ? Math.round((part / total) * 1000) / 10 : 0;
  }

  const AFFIRMATIONS = ["好嘞，收到", "谢谢娃儿", "晓得了", "放心哈"];

  function avatarHTML(person, extraClass = "", size = "") {
    const initial = person.initial || String(person.name || "?").slice(0, 1);
    const style = person.src
      ? ""
      : ` style="background:${safeColor(person.color || "#dfe9d7")}"`;
    const inner = person.src
      ? `<img src="${esc(person.src)}" alt="">`
      : `<span>${esc(initial)}</span>`;
    return `<span class="avatar avatar--initial ${extraClass}"${style} aria-hidden="true">${inner}</span>`;
  }

  function farmerAvatar(extraClass = "") {
    return `<span class="avatar ${extraClass}"><img src="assets/farmer-avatar.webp" alt="周桂芳"></span>`;
  }

  function studentPerson(name) {
    const fallbackColors = ["#dfe9d7", "#f1dfd1", "#e1e8f0", "#efe7d0", "#e4e0ed", "#e9e1d8"];
    const initials = {
      "晓龙": "晓", "林小雨": "林", "陈予安": "陈", "周雨桐": "周", "何佳": "何",
      "张一诺": "张", "苏念": "苏", "王浩": "王", "赵星野": "赵", "唐果": "唐",
      "蒋依依": "蒋", "刘一鸣": "刘"
    };
    let hash = 0;
    for (const c of name) hash += c.charCodeAt(0);
    return {
      name,
      initial: initials[name] || name.slice(0, 1),
      color: fallbackColors[hash % fallbackColors.length]
    };
  }

  /* ---------- Status definitions ---------- */

  const ORDER_STATUS = {
    sign: { label: "待到园挂牌", pill: "pill--orange", action: "去挂牌", description: "木牌已到村口驿站，挂好后拍一段视频给认养人。" },
    pending: { label: "待采摘", pill: "pill--green", action: "标记采摘", description: "确认采摘后，系统会按收成意向安排发货或自提。" },
    shipping: { label: "待发货", pill: "pill--blue", action: "安排发货", description: "果子已采下，请尽快安排冷链或通知到校自提。" },
    confirm: { label: "收成待确认", pill: "pill--neutral", action: "联系认养人", description: "认养人还没有选择收成处置方式，建议先聊两句。" },
    done: { label: "已完成", pill: "pill--neutral", action: "查看记录", description: "这份认养已完成交付，谢谢您把甜送到了。" }
  };

  const TYPE_META = {
    growth: { label: "地块长势", icon: "leaf", short: "长势 · 管护" },
    daily: { label: "田间日常", icon: "sun", short: "劳作 · 天气" },
    special: { label: "特色场景", icon: "tag", short: "挂牌 · 互动" }
  };

  const DRAFT_TEMPLATES = {
    growth: "今天去看了8号树，向阳面的果子已经转成橙黄色。下午把树盘里的草清了一下，又补了一层稻草，降了温也不怕。果子都还挂得稳稳的，拍给大家看看。",
    daily: "今早雾大，等太阳出来才进园子。给几棵树修了枝，手上全是树汁的味道。忙完坐在田埂上歇了一会儿，远处就是学校。",
    special: "今天把晓龙写的木牌挂上了——「等一场冬天的甜」。红绳系好，拍了段视频发给他。树有人惦记，人也有了盼头。"
  };

  const AI_DRAFTS = {
    growth: "今天去看了8号树，向阳面的果子已经转成橙黄色，糖度也上来了。降温前把树盘里的草清干净，又补了一层稻草。果子都挂得稳稳的，拍给大家看看，放心。\n\n#田埂日记 #春见耙耙柑 #团结村3号果园",
    daily: "今早雾大，等太阳出来才进园子。给几棵树修了枝，手上全是树汁的味道。忙完坐在田埂上歇了一会儿，远处就是学校。日子慢，果子也在慢慢长。\n\n#果园日常 #彭山柑橘 #守树人",
    special: "今天把晓龙写的木牌挂上了——「等一场冬天的甜」。红绳系好，拍了段视频发给他。树有人惦记，人也有了盼头。十二月，等你们来园里。\n\n#认养一棵树 #代际陪伴 #田埂上的约定"
  };

  const VOICE_LINES = [
    "今天果园里雾有点大，等日头出来了，我去把8号树的草再盖一层。",
    "果子这两天转色了，向阳的那一面先黄，看着心里踏实。",
    "晓龙的木牌到了，我下午就给他挂上，再拍个视频过去。"
  ];

  /* ---------- Default data ---------- */

  function defaultState() {
    return {
      version: 1,
      profile: {
        name: "周桂芳",
        age: 68,
        years: 38,
        village: "团结村",
        orchard: "团结村 3 号果园",
        phone: "138****0421"
      },
      notifications: [
        { id: "n1", icon: "receipt", title: "新认养订单", text: "刘一鸣认养了15号树，收成意向还待确认。", time: "10分钟前", target: "orders" },
        { id: "n2", icon: "calendar", title: "开园提醒", text: "12月20日开园，请提前确认8棵树的采摘排期。", time: "今天 08:30", target: "orders" },
        { id: "n3", icon: "camera", title: "内容小建议", text: "本周还差3条动态，可以拍8号树的转色特写。", time: "昨天", target: "feed" }
      ],
      notifRead: false,
      tasks: [
        { id: "sign8", title: "给 8 号树挂木牌并拍视频", meta: "晓龙的木牌已到村口驿站 · 约 5 分钟", due: "今天", action: "task-sign", done: false },
        { id: "yield9", title: "补 9 号树产量预估", meta: "认养人周雨桐还在等收货信息 · 约 2 分钟", due: "今天", action: "task-yield", done: false },
        { id: "withdraw", title: "本周提现 3,842 元", meta: "每周五统一结算 · 平台免手续费", due: "本周", action: "task-withdraw", done: false }
      ],
      trees: [
        { id: "t8", no: "8号", variety: "春见耙耙柑", age: 12, yield: 60, price: 398, adopter: "晓龙", sign: "等一场冬天的甜", image: "assets/tree-a.webp", phase: "转色期", package: "标准认养" },
        { id: "t12", no: "12号", variety: "不知火", age: 15, yield: 70, price: 458, adopter: "林小雨", sign: "和阿婆一起吃", image: "assets/tree-e.webp", phase: "转色期", package: "双人共享" },
        { id: "t3", no: "3号", variety: "爱媛38号", age: 8, yield: 50, price: 328, adopter: "陈予安", sign: "把甜分给室友", image: "assets/tree-d.webp", phase: "糖度上升", package: "标准认养" },
        { id: "t9", no: "9号", variety: "春见耙耙柑", age: 11, yield: null, price: 398, adopter: "周雨桐", sign: "给小朋友一点甜", image: "assets/tree-f.webp", phase: "转色期", package: "公益认养" },
        { id: "t7", no: "7号", variety: "春见耙耙柑", age: 13, yield: 62, price: 388, adopter: "何佳", sign: "冬天见", image: "assets/tree-a.webp", phase: "转色期", package: "标准认养" },
        { id: "t10", no: "10号", variety: "不知火", age: 14, yield: 68, price: 438, adopter: "张一诺", sign: "一诺的树", image: "assets/tree-e.webp", phase: "转色期", package: "标准认养" },
        { id: "t11", no: "11号", variety: "爱媛38号", age: 9, yield: 52, price: 338, adopter: "苏念", sign: "和苏打一起长大", image: "assets/tree-d.webp", phase: "采摘期", package: "双人共享" },
        { id: "t18", no: "18号", variety: "春见耙耙柑", age: 12, yield: 58, price: 378, adopter: "王浩", sign: "给爸妈", image: "assets/tree-f.webp", phase: "转色期", package: "标准认养" },
        { id: "t6", no: "6号", variety: "爱媛38号", age: 7, yield: 45, price: 318, adopter: "赵星野", sign: "星星的果树", image: "assets/tree-a.webp", phase: "转色期", package: "标准认养" },
        { id: "t5", no: "5号", variety: "春见耙耙柑", age: 10, yield: 56, price: 358, adopter: "唐果", sign: "果果收成", image: "assets/tree-e.webp", phase: "已采摘", package: "标准认养" },
        { id: "t21", no: "21号", variety: "爱媛38号", age: 8, yield: 46, price: 328, adopter: "蒋依依", sign: "依依不舍", image: "assets/tree-d.webp", phase: "已采摘", package: "标准认养" },
        { id: "t15", no: "15号", variety: "春见耙耙柑", age: 9, yield: 50, price: 348, adopter: "刘一鸣", sign: "一鸣惊人", image: "assets/tree-f.webp", phase: "转色期", package: "标准认养" }
      ],
      orders: [
        { id: "TY2026112108", treeId: "t8", treeNo: "8号", adopter: "晓龙", school: "锦江学院 · 计算机 2024级", package: "标准认养", amount: 398, channel: "邮寄到家", status: "sign", harvestDate: "12月20日", pickWindow: "12月20日—22日", sign: "等一场冬天的甜", created: "今天 09:12", guarantee: "保底 40 斤" },
        { id: "TY2026112112", treeId: "t12", treeNo: "12号", adopter: "林小雨", school: "锦江学院 · 文传 2023级", package: "双人共享", amount: 598, channel: "到校自提", status: "pending", harvestDate: "12月22日", pickWindow: "12月21日—27日", sign: "和阿婆一起吃", created: "今天 08:46", guarantee: "保底 40 斤" },
        { id: "TY2026112103", treeId: "t3", treeNo: "3号", adopter: "陈予安", school: "锦江学院 · 商学 2024级", package: "标准认养", amount: 328, channel: "团购代销", status: "pending", harvestDate: "12月18日", pickWindow: "12月18日—20日", sign: "把甜分给室友", created: "昨天 21:05", guarantee: "保底 40 斤" },
        { id: "TY2026112109", treeId: "t9", treeNo: "9号", adopter: "周雨桐", school: "锦江学院 · 外国语 2023级", package: "公益认养", amount: 498, channel: "公益捐赠", status: "pending", harvestDate: "12月24日", pickWindow: "12月24日统一送达", sign: "给小朋友一点甜", created: "昨天 19:31", guarantee: "保底 40 斤" },
        { id: "TY2026112107", treeId: "t7", treeNo: "7号", adopter: "何佳", school: "锦江学院 · 会计 2024级", package: "标准认养", amount: 388, channel: "邮寄到家", status: "pending", harvestDate: "12月20日", pickWindow: "12月20日—23日", sign: "冬天见", created: "11月19日", guarantee: "保底 40 斤" },
        { id: "TY2026112110", treeId: "t10", treeNo: "10号", adopter: "张一诺", school: "锦江学院 · 数媒 2023级", package: "标准认养", amount: 438, channel: "到校自提", status: "pending", harvestDate: "12月23日", pickWindow: "12月21日—27日", sign: "一诺的树", created: "11月19日", guarantee: "保底 40 斤" },
        { id: "TY2026112111", treeId: "t11", treeNo: "11号", adopter: "苏念", school: "锦江学院 · 汉语言 2024级", package: "双人共享", amount: 598, channel: "到校自提", status: "pending", harvestDate: "12月21日", pickWindow: "12月21日—27日", sign: "和苏打一起长大", created: "11月18日", guarantee: "保底 40 斤" },
        { id: "TY2026112118", treeId: "t18", treeNo: "18号", adopter: "王浩", school: "锦江学院 · 软件 2023级", package: "标准认养", amount: 378, channel: "邮寄到家", status: "pending", harvestDate: "12月22日", pickWindow: "12月22日—25日", sign: "给爸妈", created: "11月18日", guarantee: "保底 40 斤" },
        { id: "TY2026112106", treeId: "t6", treeNo: "6号", adopter: "赵星野", school: "锦江学院 · 土木 2024级", package: "标准认养", amount: 318, channel: "团购代销", status: "pending", harvestDate: "12月15日", pickWindow: "12月15日—17日", sign: "星星的果树", created: "11月17日", guarantee: "保底 40 斤" },
        { id: "TY2026112105", treeId: "t5", treeNo: "5号", adopter: "唐果", school: "锦江学院 · 英语 2023级", package: "标准认养", amount: 358, channel: "邮寄到家", status: "shipping", harvestDate: "12月18日", pickWindow: "12月18日—21日", sign: "果果收成", created: "11月16日", guarantee: "保底 40 斤" },
        { id: "TY2026112121", treeId: "t21", treeNo: "21号", adopter: "蒋依依", school: "锦江学院 · 法学 2024级", package: "标准认养", amount: 328, channel: "到校自提", status: "shipping", harvestDate: "12月24日", pickWindow: "12月24日—27日", sign: "依依不舍", created: "11月16日", guarantee: "保底 40 斤" },
        { id: "TY2026112115", treeId: "t15", treeNo: "15号", adopter: "刘一鸣", school: "锦江学院 · 人工智能 2023级", package: "标准认养", amount: 348, channel: "收成意向待确认", status: "confirm", harvestDate: "12月20日", pickWindow: "待认养人确认", sign: "一鸣惊人", created: "11月15日", guarantee: "保底 40 斤" }
      ],
      posts: [
        { id: "p1", type: "growth", author: "周桂芳", time: "昨天 17:42", text: "转了半个园子，8号树向阳面先黄了。今天摸了一下，果皮硬邦邦的，还要再等半个月。降温前把树根周围盖了层稻草，果子都好好的。", media: [{ src: "assets/tree-a.webp", kind: "image" }], likes: 46, comments: 8, audience: "认养人可见", reach: "12 位认养人" },
        { id: "p2", type: "daily", author: "周桂芳", time: "11月19日 16:08", text: "今早雾大，等太阳出来才进园子。修了几根挡光的枝，手上全是树汁的味道。忙完坐在田埂上歇了一会儿，远处就是学校。", media: [{ src: "assets/orchard-wide.webp", kind: "image" }], likes: 32, comments: 5, audience: "所有人可见", reach: "公开" },
        { id: "p3", type: "special", author: "周桂芳", time: "11月17日 10:26", text: "晓龙问我木牌什么时候挂。牌子昨天到了，今天把红绳也备好了。等挂上去，拍段视频给他看。", media: [{ src: "assets/fruit-close.webp", kind: "image" }], likes: 58, comments: 12, audience: "认养人可见", reach: "12 位认养人" }
      ],
      chats: {
        "晓龙": {
          name: "晓龙",
          initial: "晓",
          color: "#dfe9d7",
          role: "8号树认养人 · 锦江学院",
          unread: 2,
          messages: [
            { from: "student", type: "text", text: "阿姨，木牌不着急，降温了您多穿点。", time: "09:14" },
            { from: "farmer", type: "text", text: "放心，树好着呢。等牌子到了，我给你拍视频。", time: "09:20" },
            { from: "student", type: "text", text: "好嘞，您拍的视频我都存着，宿舍同学都羡慕我有一棵真的树。", time: "09:23" }
          ]
        },
        "林小雨": {
          name: "林小雨",
          initial: "林",
          color: "#f1dfd1",
          role: "12号树认养人 · 锦江学院",
          unread: 1,
          messages: [
            { from: "student", type: "voice", text: "阿姨，我选了到校自提，十二月二十二日来找您。", time: "昨天 20:16" },
            { from: "farmer", type: "text", text: "好，到时候我提前把最大的几个给你留着。", time: "昨天 20:21" }
          ]
        },
        "周雨桐": {
          name: "周雨桐",
          initial: "周",
          color: "#e1e8f0",
          role: "9号树认养人 · 锦江学院",
          unread: 0,
          messages: [
            { from: "student", type: "text", text: "阿姨，公益捐赠那棵树，麻烦您多拍点照片呀。", time: "昨天 18:03" }
          ]
        }
      },
      wallet: {
        available: 3842,
        month: 4776,
        total: 21860,
        breakdown: [
          { label: "认养套餐", amount: 3980, color: "#1f4030", desc: "8笔已结算认养" },
          { label: "团购代销", amount: 496, color: "#d96c2f", desc: "春见兜底收购" },
          { label: "内容激励", amount: 300, color: "#c5b170", desc: "本周优质动态" }
        ],
        weeks: [890, 1120, 1170, 1596],
        records: [
          { id: "r1", title: "认养套餐结算 · 8号树", meta: "晓龙 · 标准认养 · 平台已结算", date: "今天 08:40", amount: 398, type: "in" },
          { id: "r2", title: "团购代销 · 春见", meta: "平台兜底收购 225.5 斤", date: "11月20日", amount: 496, type: "in" },
          { id: "r3", title: "优质内容激励", meta: "田埂日记 · 本周精选", date: "11月19日", amount: 300, type: "in" },
          { id: "r4", title: "提现到微信零钱", meta: "尾号 0421 · 已到账", date: "11月15日", amount: -2600, type: "out" },
          { id: "r5", title: "认养套餐结算 · 12号树", meta: "林小雨 · 双人共享", date: "11月12日", amount: 598, type: "in" }
        ]
      },
      settings: {
        newOrderNotify: true,
        chatNotify: true,
        settlementNotify: true
      },
      draft: {
        type: "growth",
        text: DRAFT_TEMPLATES.growth,
        media: [{ src: "assets/orchard-wide.webp", kind: "image" }],
        audience: "adopters",
        dirty: false,
        contextTree: null
      }
    };
  }

  const STORAGE_KEY = "tianyue.farmer.v1";

  function loadState() {
    const base = defaultState();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return base;
      const saved = JSON.parse(raw);
      if (!saved || saved.version !== 1) return base;
      return {
        ...base,
        ...saved,
        profile: { ...base.profile, ...(saved.profile || {}) },
        settings: { ...base.settings, ...(saved.settings || {}) },
        draft: { ...base.draft, ...(saved.draft || {}) },
        wallet: { ...base.wallet, ...(saved.wallet || {}) }
      };
    } catch (error) {
      return base;
    }
  }

  let state = loadState();

  const ui = {
    route: "home",
    returnRoute: "home",
    orderFilter: "all",
    treeFilter: "all",
    lastPublished: null,
    pendingMedia: [],
    chatAutoReplyTimer: null,
    liveTimers: [],
    lastFocused: null,
    overlayOpen: false,
    liveActive: false
  };

  function saveState() {
    try {
      const snapshot = clone(state);
      snapshot.draft.media = snapshot.draft.media.filter((item) => !String(item.src).startsWith("blob:"));
      snapshot.posts = snapshot.posts.map((post) => ({
        ...post,
        media: (post.media || []).filter((item) => !String(item.src).startsWith("blob:"))
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
    } catch (error) {
      /* Demo remains usable if storage is unavailable. */
    }
  }

  /* ---------- Chrome / routing ---------- */

  const PAGE_META = {
    home: { title: "工作台", nav: "home" },
    feed: { title: "果园动态", nav: "feed" },
    orders: { title: "认养订单", nav: "orders" },
    trees: { title: "我的果树", nav: "trees" },
    wallet: { title: "收益钱包", nav: "me" },
    live: { title: "直播助手", nav: "home" },
    me: { title: "我的", nav: "me" }
  };

  const SECONDARY_ROUTES = new Set(["wallet", "live"]);

  function currentRoute() {
    const raw = (location.hash || "").replace(/^#\/?/, "").split("?")[0];
    return PAGE_META[raw] ? raw : "home";
  }

  function navigate(route, options = {}) {
    if (!PAGE_META[route]) route = "home";
    const previous = currentRoute();
    if (SECONDARY_ROUTES.has(route) && previous !== route) {
      ui.returnRoute = previous;
    }
    if (options.contextTree) {
      prepareDraftForTree(options.contextTree);
    }

    const wasSame = route === currentRoute() && route === (location.hash || "").replace(/^#\/?/, "");
    let historyUpdated = false;
    try {
      history[wasSame ? "replaceState" : "pushState"]({ route }, "", `#${route}`);
      historyUpdated = true;
    } catch (error) {
      // Some browsers refuse History API calls on file:// documents.
      historyUpdated = false;
    }

    if (!historyUpdated && (location.hash || "") !== `#${route}`) {
      location.hash = route;
      return;
    }

    closeOverlay(true);
    renderPage({ focus: options.focus });
  }

  function renderPage({ preserveScroll = false, focus = null } = {}) {
    const route = currentRoute();
    ui.route = route;
    const scrollY = window.scrollY;
    const view = $("#view");
    const pageRenderer = {
      home: pageHome,
      feed: pageFeed,
      orders: pageOrders,
      trees: pageTrees,
      wallet: pageWallet,
      live: pageLive,
      me: pageMe
    }[route] || pageHome;

    view.innerHTML = pageRenderer();
    updateChrome();
    if (preserveScroll) {
      window.requestAnimationFrame(() => window.scrollTo({ top: scrollY, behavior: "instant" }));
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }

    if (focus === "composer") {
      window.requestAnimationFrame(() => {
        const composer = $(".composer");
        if (composer) {
          composer.scrollIntoView({ behavior: "smooth", block: "start" });
          const textarea = $(".compose-textarea", composer);
          if (textarea) textarea.focus({ preventScroll: true });
        }
      });
    }
    if (route === "live") {
      window.requestAnimationFrame(() => {
        const startButton = $("[data-action='live-start']");
        if (startButton) startButton.focus({ preventScroll: true });
      });
    }
  }

  function updateChrome() {
    const route = currentRoute();
    const meta = PAGE_META[route] || PAGE_META.home;
    document.title = `${meta.title} · 田约认采农户端`;
    const crumb = $("#crumb-current");
    if (crumb) crumb.textContent = meta.title;

    $$(".rail-link").forEach((link) => {
      const isActive = link.dataset.route === route;
      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    $$(".tab-link").forEach((link) => {
      const isActive = link.dataset.route === meta.nav;
      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    $$("[data-notif-badge]").forEach((badge) => {
      badge.hidden = state.notifRead;
      badge.textContent = state.notifRead ? "" : String(state.notifications.length);
    });

    $$(".tab-badge").forEach((badge) => {
      badge.textContent = String(state.orders.length);
    });
    $$(".rail-count").forEach((badge) => {
      badge.textContent = String(state.orders.length);
    });
  }

  window.addEventListener("popstate", () => {
    const route = currentRoute();
    if (route === ui.route) return;
    closeOverlay(true);
    renderPage();
  });

  window.addEventListener("hashchange", () => {
    const route = currentRoute();
    if (route === ui.route) return;
    closeOverlay(true);
    renderPage();
  });

  /* ---------- Shared page fragments ---------- */

  function brandMark() {
    return `<span class="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M23.5 14.5C24.2 9.8 28 6.7 32.9 6.2C32.5 11.3 29.5 14.5 23.5 14.5Z" fill="#244936"/>
        <path d="M22.4 17.2C16.6 16.7 12.4 13 11.2 7.8C17.1 7.7 21.4 11 22.4 17.2Z" fill="#5D7D5A"/>
        <circle cx="23" cy="28.4" r="12.1" fill="#D96C2F"/>
        <path d="M18 26.5C20.2 24.9 24.5 24.6 28.3 26.1" stroke="#F8E7CD" stroke-width="1.4" stroke-linecap="round" opacity=".7"/>
      </svg>
    </span>`;
  }

  function mobileBrandHead({ title = null, subtitle = null, back = false } = {}) {
    if (back) {
      return `<header class="mobile-head">
        <div class="mobile-page-title">
          <button class="mobile-back" type="button" data-action="back" aria-label="返回">${icon("arrow-left")}</button>
          <div><h1>${esc(title)}</h1>${subtitle ? `<p>${esc(subtitle)}</p>` : ""}</div>
        </div>
        <div class="mobile-head-actions">
          <button class="icon-btn" type="button" data-action="notifications" aria-label="查看通知">
            ${icon("bell")}<span class="dot-badge" data-notif-badge hidden>3</span>
          </button>
        </div>
      </header>`;
    }
    return `<header class="mobile-head">
      <a class="mobile-brand" href="#home" data-route="home" aria-label="田约认采农户工作台">
        ${brandMark()}
        <span><strong>田约认采</strong><small>农户工作台 · 团结村</small></span>
      </a>
      <div class="mobile-head-actions">
        <a class="mobile-client-link" href="client.html" aria-label="进入认养人端">
          ${icon("smartphone")}<span>认养人端</span>
        </a>
        <button class="icon-btn" type="button" data-action="notifications" aria-label="查看通知">
          ${icon("bell")}<span class="dot-badge" data-notif-badge hidden>3</span>
        </button>
        <button class="avatar mobile-avatar" type="button" data-route="me" aria-label="打开我的页面">
          <img src="assets/farmer-avatar.webp" alt="周桂芳">
        </button>
      </div>
    </header>`;
  }

  function pageHeading({ eyebrow, title, sub, actions = "", mobile = true }) {
    return `${mobile ? mobileBrandHead() : ""}
      <div class="page-head">
        <div class="page-head-copy">
          <p class="eyebrow">${eyebrow}</p>
          <h1 class="display">${title}</h1>
          ${sub ? `<p class="page-sub">${sub}</p>` : ""}
        </div>
        ${actions ? `<div class="page-head-actions">${actions}</div>` : ""}
      </div>`;
  }

  function statusPill(status) {
    const meta = ORDER_STATUS[status] || ORDER_STATUS.pending;
    return `<span class="pill ${meta.pill}"><span class="pill-dot"></span>${meta.label}</span>`;
  }

  function taskProgress() {
    const done = state.tasks.filter((task) => task.done).length;
    return { done, total: state.tasks.length, percent: Math.round((done / state.tasks.length) * 100) };
  }

  function unreadChatCount() {
    return Object.values(state.chats).reduce((sum, chat) => sum + (chat.unread || 0), 0);
  }

  function orderCounts() {
    return state.orders.reduce((counts, order) => {
      counts.all += 1;
      counts[order.status] = (counts[order.status] || 0) + 1;
      return counts;
    }, { all: 0, pending: 0, sign: 0, shipping: 0, confirm: 0, done: 0 });
  }

  function getTree(treeId) {
    return state.trees.find((tree) => tree.id === treeId);
  }

  function getOrderForTree(treeId) {
    return state.orders.find((order) => order.treeId === treeId);
  }

  function prepareDraftForTree(treeId) {
    const tree = getTree(treeId);
    if (!tree) return;
    state.draft.type = "special";
    state.draft.text = `今天把${tree.adopter}写的木牌挂上了——「${tree.sign}」。红绳系好，拍了段视频发给他。树有人惦记，人也有了盼头。`;
    state.draft.media = [{ src: tree.image, kind: "image" }];
    state.draft.audience = "adopters";
    state.draft.dirty = true;
    state.draft.contextTree = treeId;
    saveState();
    toast(`已为 ${tree.no}树准备好一条挂牌动态`);
  }

  function completeTask(taskId, notify = true) {
    const task = state.tasks.find((item) => item.id === taskId);
    if (!task || task.done) return false;
    task.done = true;
    saveState();
    if (notify) toast("这件事已经记在小本本上了", "success");
    return true;
  }

  /* ---------- Home ---------- */

  function pageHome() {
    const done = taskProgress();
    const counts = orderCounts();
    const unread = unreadChatCount();
    const remaining = state.tasks.length - done.done;
    const orderPreview = state.orders.slice(0, 4);
    const xiaolong = state.chats["晓龙"];
    const latestStudentMessage = [...xiaolong.messages].reverse().find((m) => m.from === "student");
    const previewAvatars = ["晓龙", "林小雨", "周雨桐"].map((name) => avatarHTML(studentPerson(name))).join("");

    return `
      ${mobileBrandHead()}
      <div class="home-head">
        <div class="home-head-copy">
          <div class="home-date-line">
            <span>${todayLabel()}</span>
            <span class="weather-inline">${icon("cloud-sun")}彭山 9°C · 阴</span>
          </div>
          <h1 class="display">周阿姨，<em>今天果园也好。</em></h1>
          <p class="page-sub">天冷了，8号树转色过半。今天还有 ${remaining} 件小事，慢慢来。</p>
        </div>
      </div>

      <div class="stat-grid">
        <article class="stat-card">
          <div class="stat-card-head"><span>本月认养</span>${icon("tree")}</div>
          <div class="stat-value">12<small>棵</small></div>
          <div class="stat-foot"><strong>12 / 12</strong><span>全部认养</span></div>
        </article>
        <article class="stat-card">
          <div class="stat-card-head"><span>本月收入</span>${icon("wallet")}</div>
          <div class="stat-value"><small style="font-size:13px;margin-right:1px">¥</small>${formatNumber(state.wallet.month)}</div>
          <div class="stat-foot"><strong>可提现 ¥${formatNumber(state.wallet.available)}</strong></div>
        </article>
        <article class="stat-card stat-card--accent">
          <div class="stat-card-head"><span>待采摘</span>${icon("leaf")}</div>
          <div class="stat-value">${counts.pending}<small>棵</small></div>
          <div class="stat-foot"><strong>12月20日</strong><span>开园</span></div>
        </article>
      </div>

      <section class="quick-section" aria-label="常用操作">
        <div class="quick-grid">
          <button class="quick-card" type="button" data-route="feed" data-focus="composer">
            <span class="quick-icon">${icon("camera")}</span>
            <span class="quick-copy"><strong>拍动态</strong><small>记录今天</small></span>
          </button>
          <button class="quick-card" type="button" data-route="live">
            <span class="quick-icon">${icon("broadcast")}</span>
            <span class="quick-copy"><strong>开直播</strong><small>今晚 19:30</small></span>
          </button>
          <button class="quick-card" type="button" data-route="orders">
            <span class="quick-icon">${icon("receipt")}</span>
            <span class="quick-copy"><strong>认养订单</strong><small>${counts.pending} 个待采摘</small></span>
          </button>
          <button class="quick-card" type="button" data-action="open-withdraw">
            <span class="quick-icon">${icon("wallet")}</span>
            <span class="quick-copy"><strong>提现</strong><small>可提 ¥${formatNumber(state.wallet.available)}</small></span>
          </button>
        </div>
      </section>

      <div class="hero-grid">
        <article class="hero-orchard">
          <img src="assets/orchard-wide.webp" alt="周桂芳在团结村果园里查看成熟的柑橘" fetchpriority="high">
          <div class="hero-top">
            <span class="hero-seal">${icon("leaf")}2026 产季 · 本季认养已满</span>
            <span class="hero-photo-date">实拍于 11月18日</span>
          </div>
          <div class="hero-copy">
            <h2>这一季，12 棵树<br><em>都有了年轻的主人。</em></h2>
            <p>从锦江学院到团结村，一段 6.8 公里的相互惦记。</p>
            <div class="hero-bottom">
              <button class="btn btn--cream" type="button" data-route="trees">
                看看我的树 ${icon("arrow-right")}
              </button>
              <div class="hero-proof">
                <div class="avatar-stack">${previewAvatars}<span class="avatar-stack-more">+9</span></div>
                <p class="hero-proof-text"><strong>12 位认养人</strong>8 棵等您采摘</p>
              </div>
            </div>
          </div>
        </article>

        <article class="live-preview">
          <img src="assets/live-stage.webp" alt="彭山果园里的助农直播现场">
          <div class="live-preview-top">
            <span class="live-label"><span class="live-dot"></span>直播预告</span>
            <span class="live-time">今晚 19:30</span>
          </div>
          <div class="live-preview-body">
            <h3>果园夜话 · 第12期</h3>
            <p>给 8 号树系上第一根红绳</p>
            <div class="live-preview-meta">
              <span>${icon("users")}214 人已预约</span>
              <button class="btn" type="button" data-route="live">去准备直播</button>
            </div>
          </div>
        </article>
      </div>

      <div class="home-main-grid">
        <div class="home-primary">
          <section class="card task-panel" aria-labelledby="tasks-heading">
            <div class="section-head">
              <h2 id="tasks-heading">今天先做这几件</h2>
              <div class="task-progress">
                <span>${done.done} / ${done.total}</span>
                <span class="task-progress-bar" aria-hidden="true"><span style="width:${done.percent}%"></span></span>
              </div>
            </div>
            <div class="task-list">
              ${state.tasks.map((task) => `
                <div class="task-row ${task.done ? "is-done" : ""}">
                  <button class="task-check" type="button" data-action="toggle-task" data-id="${esc(task.id)}" aria-label="${task.done ? "撤回完成" : "标记完成"}：${esc(task.title)}" aria-pressed="${task.done}">
                    ${icon("check")}
                  </button>
                  <div class="task-copy">
                    <div class="task-title">${esc(task.title)}</div>
                    <p class="task-meta">${esc(task.meta)}</p>
                  </div>
                  <div class="task-side">
                    <span class="task-due">${task.done ? "已完成" : esc(task.due)}</span>
                    <button class="task-go" type="button" data-action="${esc(task.action)}" aria-label="处理：${esc(task.title)}">${icon("chevron-right")}</button>
                  </div>
                </div>
              `).join("")}
            </div>
          </section>

          <section class="card home-orders" aria-labelledby="recent-orders-heading">
            <div class="section-head">
              <h2 id="recent-orders-heading">最近订单</h2>
              <button class="section-link" type="button" data-route="orders">全部 12 笔 ${icon("chevron-right", "icon--sm")}</button>
            </div>
            <div class="preview-orders">
              ${orderPreview.map((order) => {
                const tree = getTree(order.treeId);
                return `<button class="preview-order" type="button" data-action="view-order" data-id="${esc(order.id)}">
                  ${avatarHTML(studentPerson(order.adopter), "preview-order-avatar")}
                  <span class="preview-order-copy">
                    <span class="preview-order-top"><strong>${esc(order.adopter)}</strong><span>${esc(order.treeNo)}树 · ${esc(order.package)}</span></span>
                    <span class="preview-order-meta"><span>${esc(order.channel)}</span><span class="dot"></span><span>${esc(tree ? tree.variety : order.treeNo)}</span></span>
                  </span>
                  <span class="preview-order-price"><strong>¥${formatNumber(order.amount)}</strong>${statusPill(order.status)}</span>
                </button>`;
              }).join("")}
            </div>
          </section>
        </div>

        <aside class="home-side">
          <section class="message-card" aria-labelledby="message-heading">
            <div class="message-card-head">
              <span>${icon("message-circle")}认养人留言</span>
              <span class="unread-pill">${unread} 条新消息</span>
            </div>
            <blockquote class="message-quote" id="message-heading">“${esc(latestStudentMessage ? latestStudentMessage.text : "阿姨，树好着呢吧？")}”</blockquote>
            <div class="message-author">
              ${avatarHTML(studentPerson("晓龙"))}
              <span>晓龙 · 8号树认养人 · 锦江学院</span>
            </div>
            <button class="btn" type="button" data-action="open-chat" data-person="晓龙">
              打开留言 ${icon("arrow-right")}
            </button>
          </section>

          <section class="ai-tip-card" aria-label="AI 内容助手">
            <span class="ai-tip-icon">${icon("sparkles")}</span>
            <div class="ai-tip-copy">
              <strong>不会写文案？</strong>
              <span>拍一张照片，AI 帮你整理成一条田埂动态，自动带上话题。</span>
            </div>
            <button type="button" data-route="feed" data-focus="composer" aria-label="去试试 AI 写文案">${icon("arrow-up-right")}</button>
          </section>
        </aside>
      </div>

      <p class="home-quote">以数字认养为桥，联结青年与乡土。</p>
    `;
  }

  /* ---------- Feed ---------- */

  function mediaItemHTML(media, index, removable = false) {
    const isVideo = media.kind === "video";
    return `<div class="media-item">
      ${isVideo
        ? `<video src="${esc(safeMediaSrc(media.src))}" muted playsinline preload="metadata"></video>`
        : `<img src="${esc(safeMediaSrc(media.src))}" alt="第 ${index + 1} 张果园实拍">`}
      ${removable ? `<button class="media-remove" type="button" data-action="remove-media" data-index="${index}" aria-label="移除这张素材">${icon("x")}</button>` : ""}
    </div>`;
  }

  function previewCoverHTML() {
    const media = state.draft.media[0];
    if (!media) {
      return `<div class="preview-cover-empty">${icon("image")}<span>认养人正等着看今天的果园</span></div>`;
    }
    if (media.kind === "video") {
      return `<video src="${esc(safeMediaSrc(media.src))}" muted playsinline preload="metadata"></video><span class="preview-cover-label">${icon("video")}视频</span>`;
    }
    return `<img src="${esc(safeMediaSrc(media.src))}" alt="动态封面预览"><span class="preview-cover-label">${TYPE_META[state.draft.type].label}</span>`;
  }

  function postMediaHTML(post) {
    if (!post.media || !post.media.length) return "";
    const media = post.media[0];
    return `<div class="post-media">
      ${media.kind === "video"
        ? `<video src="${esc(safeMediaSrc(media.src))}" muted playsinline preload="metadata"></video>`
        : `<img src="${esc(safeMediaSrc(media.src))}" alt="果园动态实拍" loading="lazy">`}
      <span class="post-type">${esc(TYPE_META[post.type]?.label || "果园实拍")}</span>
      ${ui.lastPublished === post.id ? `<span class="post-new-badge">刚刚发布</span>` : ""}
    </div>`;
  }

  function pageFeed() {
    const draft = state.draft;
    const publishedCount = state.posts.length;
    const hasPublishedToday = state.posts.some((post) => post.time === "刚刚" || post.time.startsWith("今天"));
    const chars = draft.text.length;
    const recentPosts = state.posts.slice(0, 6);

    return `
      ${mobileBrandHead()}
      <div class="page-head">
        <div class="page-head-copy">
          <p class="eyebrow">田埂内容 · 已发布 ${publishedCount} 条</p>
          <h1 class="display">把果园的事，<em>说给认养人听。</em></h1>
          <p class="page-sub">真实、日常、不摆拍。一条实拍视频，比十句“放心”更有用。</p>
        </div>
      </div>

      <div class="feed-layout">
        <section class="card composer" aria-labelledby="composer-heading">
          <div class="composer-head">
            <div>
              <div class="composer-title">${icon("camera")}<h2 id="composer-heading">发布一条果园动态</h2></div>
              <p>发布后会推送给 12 位认养人，并同步到田埂日记。</p>
            </div>
            <span class="draft-state ${hasPublishedToday ? "is-published" : ""}"><span class="pill-dot"></span>${hasPublishedToday ? "今日已发布" : "今日未发布"}</span>
          </div>

          <div class="field-label">今天拍什么 <span>三种模板，照着拍就好</span></div>
          <div class="type-grid" role="group" aria-label="动态类型">
            ${Object.entries(TYPE_META).map(([type, meta]) => `
              <button class="type-option ${draft.type === type ? "is-active" : ""}" type="button" data-action="draft-type" data-type="${type}" aria-pressed="${draft.type === type}">
                <span class="type-option-icon">${icon(meta.icon)}</span>
                <span class="type-option-copy"><strong>${meta.label}</strong><small>${meta.short}</small></span>
              </button>
            `).join("")}
          </div>

          <div class="media-tray" aria-label="已选择的素材">
            ${draft.media.map((media, index) => mediaItemHTML(media, index, true)).join("")}
            <button class="media-add" type="button" data-action="pick-media">
              ${icon("plus")}<span>拍一段 / 相册</span>
            </button>
            <input type="file" id="media-input" accept="image/*,video/*" multiple hidden>
          </div>
          <p class="media-hint">最多 3 张实拍 · 建议竖屏 · 不加水印和滤镜 ·
            <button type="button" class="inline-link" data-action="pick-default-media">用一张果园实拍</button>
          </p>

          <div class="textarea-wrap">
            <textarea class="compose-textarea" id="draft-text" maxlength="220" placeholder="今天果园里发生了什么？写两句就好……">${esc(draft.text)}</textarea>
            <span class="char-count" id="char-count">${chars} / 220</span>
          </div>

          <div class="compose-toolbar">
            <div class="toolbar-group">
              <button class="tool-btn tool-btn--voice" type="button" data-action="voice-input" title="演示：点击模拟语音转文字">
                ${icon("mic")}<span class="voice-label">按住说话</span>
              </button>
              <button class="tool-btn" type="button" data-action="pick-media">
                ${icon("image")}<span>配图</span>
              </button>
            </div>
            <span class="media-hint">语音会自动转成文字</span>
          </div>

          <div class="ai-strip">
            ${icon("sparkles")}
            <p><strong>AI 帮你想开头</strong> · 根据“${TYPE_META[draft.type].label}”生成一段像您说话的文案</p>
            <button type="button" data-action="ai-write">帮我写</button>
          </div>

          <div class="publish-settings">
            <div class="audience-control" role="group" aria-label="谁可以看">
              <button class="audience-btn ${draft.audience === "adopters" ? "is-active" : ""}" type="button" data-action="set-audience" data-audience="adopters">
                ${icon("lock")}认养人可见
              </button>
              <button class="audience-btn ${draft.audience === "all" ? "is-active" : ""}" type="button" data-action="set-audience" data-audience="all">
                ${icon("eye")}所有人可见
              </button>
            </div>
            <span class="publish-note">预计触达 <strong>${draft.audience === "adopters" ? "12 位" : "全部"}</strong>认养人</span>
          </div>

          <div class="publish-row">
            <p class="publish-note">真实、清楚、不着急。<br>今天拍不好，明天再拍也来得及。</p>
            <button class="btn btn--accent publish-btn" type="button" data-action="publish">
              ${icon("send")}发布到田埂
            </button>
          </div>
        </section>

        <aside class="preview-column">
          <section class="card phone-preview-card" aria-label="动态发布预览">
            <div class="phone-preview-head">
              <span>${icon("smartphone")}认养人看到的样子</span>
              <span>实时预览</span>
            </div>
            <div class="phone-preview">
              <div class="preview-cover">${previewCoverHTML()}</div>
              <div class="preview-body">
                <div class="preview-author">
                  ${farmerAvatar()}
                  <div><strong>周桂芳</strong><span>团结村 · 68岁 · 种植38年</span></div>
                  <span class="preview-audience">${draft.audience === "adopters" ? "认养人可见" : "所有人可见"}</span>
                </div>
                <p class="preview-caption ${draft.text.trim() ? "" : "is-empty"}" id="preview-caption">${draft.text.trim() ? esc(draft.text) : "写两句今天果园里发生的事，认养人正等着听。"}</p>
                <div class="preview-actions">
                  <span>${icon("heart")}0</span>
                  <span>${icon("message-circle")}0</span>
                  <span style="margin-left:auto">${icon("map-pin")}团结村 3 号果园</span>
                </div>
              </div>
            </div>
          </section>

          <section class="card content-tips">
            <h3>${icon("sparkles")}一条好动态的 3 个要点</h3>
            <div class="tip-list">
              <div class="tip-item"><span class="tip-num">1</span><span><strong>拍真的。</strong>用手机原相机，拍树、拍手、拍今天的天气，不需要摆拍。</span></div>
              <div class="tip-item"><span class="tip-num">2</span><span><strong>说人话。</strong>像平时聊天一样，说清楚今天做了什么、果子怎么样。</span></div>
              <div class="tip-item"><span class="tip-num">3</span><span><strong>带上树号。</strong>认养人最想知道“我的那棵树”今天好不好。</span></div>
            </div>
          </section>
        </aside>
      </div>

      <section class="feed-recent" aria-labelledby="recent-feed-heading">
        <div class="section-head">
          <h2 id="recent-feed-heading">最近发布</h2>
          <span class="section-link">已同步田埂日记 ${icon("chevron-right", "icon--sm")}</span>
        </div>
        <div class="post-grid">
          ${recentPosts.map((post) => `
            <article class="feed-post ${ui.lastPublished === post.id ? "is-new" : ""}">
              ${postMediaHTML(post)}
              <div class="post-body">
                <div class="post-author-row">
                  ${farmerAvatar()}
                  <div><strong>${esc(post.author)}</strong><span>团结村 · 守树人</span></div>
                  <span class="post-time">${esc(post.time)}</span>
                </div>
                <p class="post-caption">${esc(post.text)}</p>
                <div class="post-meta">
                  <span>${icon("heart")}${post.likes}</span>
                  <span>${icon("message-circle")}${post.comments}</span>
                  <span class="post-reach">${esc(post.reach)}</span>
                </div>
              </div>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  /* ---------- Orders ---------- */

  function orderCardHTML(order) {
    const tree = getTree(order.treeId);
    const statusMeta = ORDER_STATUS[order.status] || ORDER_STATUS.pending;
    const primaryAction = order.status === "sign"
      ? "order-go-sign"
      : order.status === "pending" || order.status === "shipping"
        ? "advance-order"
        : order.status === "confirm"
          ? "message-order"
          : "view-order";
    const primaryLabel = order.status === "done" ? "查看记录" : statusMeta.action;
    const iconName = order.status === "shipping" ? "truck" : order.status === "sign" ? "tag" : order.status === "done" ? "check" : "package";

    return `<article class="order-card">
      <div class="order-card-head">
        <button class="order-no" type="button" data-action="view-order" data-id="${esc(order.id)}" style="background:none;padding:0">${esc(order.id)}</button>
        ${statusPill(order.status)}
      </div>
      <div class="order-card-body">
        <div class="order-tree-row">
          <div class="order-tree-thumb"><img src="${esc(tree ? tree.image : "assets/tree-a.webp")}" alt="${esc(order.treeNo)}树实拍" loading="lazy"></div>
          <div class="order-tree-copy">
            <h3>${esc(order.treeNo)}树 <span>${esc(tree ? tree.variety : "")}</span></h3>
            <p>${tree ? `${esc(tree.age)}年树龄 · 预估 ${tree.yield ? `${tree.yield} 斤` : "待补充"} · ${esc(tree.phase)}` : "果园在架果树"}</p>
            <div class="order-package-line">
              <span class="pill pill--orange">${esc(order.package)}</span>
              <span class="pill pill--neutral">${esc(order.channel)}</span>
              <span class="pill pill--green">${esc(order.guarantee)}</span>
            </div>
          </div>
        </div>
        <div class="order-adopter">
          ${avatarHTML(studentPerson(order.adopter))}
          <div class="order-adopter-copy">
            <strong>${esc(order.adopter)} <span style="font-weight:400;color:var(--muted-2)">· ${esc(order.school)}</span></strong>
            <span>采摘排期 ${esc(order.harvestDate)} · ${esc(order.created)} 下单</span>
          </div>
          <button class="btn btn--soft" type="button" data-action="open-chat" data-person="${esc(order.adopter)}" aria-label="联系 ${esc(order.adopter)}">
            ${icon("message-circle")}联系
          </button>
        </div>
        <div class="order-sign">${icon("tag")}<span>木牌寄语：<em>「${esc(order.sign)}」</em></span></div>
      </div>
      <div class="order-card-foot">
        <div class="order-price">¥${formatNumber(order.amount)} <small>认养款</small></div>
        <div class="order-actions">
          <button class="icon-btn" type="button" data-action="view-order" data-id="${esc(order.id)}" aria-label="查看订单详情">${icon("receipt")}</button>
          <button class="btn ${order.status === "sign" ? "btn--accent" : "btn--soft"}" type="button" data-action="${primaryAction}" data-id="${esc(order.id)}">
            ${icon(iconName)}${primaryLabel}
          </button>
        </div>
      </div>
    </article>`;
  }

  function pageOrders() {
    const counts = orderCounts();
    const labels = {
      all: "全部",
      pending: "待采摘",
      sign: "待挂牌",
      shipping: "待发货",
      confirm: "待确认"
    };
    const filtered = ui.orderFilter === "all"
      ? state.orders
      : state.orders.filter((order) => order.status === ui.orderFilter);

    return `
      ${mobileBrandHead()}
      <div class="page-head">
        <div class="page-head-copy">
          <p class="eyebrow">认养订单 · 按采摘日自动排期</p>
          <h1 class="display">把每一份惦记，<em>好好送到。</em></h1>
          <p class="page-sub">12 笔订单都已排进产季。先挂牌、再采摘、后发货，每一步都让认养人看得见。</p>
        </div>
        <div class="page-head-actions">
          <button class="btn btn--outline btn--sm" type="button" data-action="open-orders-help">${icon("help-circle")}排期说明</button>
        </div>
      </div>

      <div class="order-summary">
        <div class="order-summary-item"><strong>${counts.all}</strong><span>本季认养订单</span></div>
        <div class="order-summary-item"><strong>${counts.pending}</strong><span>待采摘</span></div>
        <div class="order-summary-item"><strong>¥${formatNumber(state.wallet.month)}</strong><span>本月已结算</span></div>
      </div>

      <div class="chip-row order-filters" role="group" aria-label="筛选订单">
        ${Object.entries(labels).map(([key, label]) => `
          <button class="chip ${ui.orderFilter === key ? "is-active" : ""}" type="button" data-action="filter-orders" data-filter="${key}" aria-pressed="${ui.orderFilter === key}">
            ${label}<span class="chip-count">${counts[key] || 0}</span>
          </button>
        `).join("")}
      </div>

      <div class="order-list">
        ${filtered.length ? filtered.map(orderCardHTML).join("") : `<div class="card empty-state"><span class="empty-icon">${icon("receipt")}</span><h3>这里暂时没有订单</h3><p>换个筛选条件看看，新的认养会第一时间通知您。</p></div>`}
      </div>

      <div class="order-model-note">
        ${icon("shield-check")}
        <div><strong>认养预定 + 团购兜底</strong>认养优先锁定销路；未认养果由平台按 2.2 元/斤组织校园团购兜底，降低滞销风险。</div>
        <button type="button" data-action="open-groupbuy-help">查看规则</button>
      </div>
    `;
  }

  /* ---------- Trees ---------- */

  function treeCardHTML(tree) {
    const order = getOrderForTree(tree.id);
    const status = order ? order.status : "pending";
    const adopter = studentPerson(tree.adopter);
    return `<article class="tree-card">
      <div class="tree-cover">
        <img src="${esc(tree.image)}" alt="${esc(tree.no)}树果园实拍" loading="lazy">
        <span class="tree-no">${esc(tree.no)}树</span>
        <span class="tree-status">${statusPill(status)}</span>
        <button class="tree-edit-btn" type="button" data-action="edit-tree" data-id="${esc(tree.id)}" aria-label="编辑 ${esc(tree.no)}树信息">${icon("edit-3")}</button>
      </div>
      <div class="tree-body">
        <div class="tree-title-row">
          <div><h3>${esc(tree.no)}树</h3><p class="tree-meta">${esc(tree.variety)} · 树龄 ${tree.age} 年</p></div>
          <span class="phase"><span class="pill-dot"></span>${esc(tree.phase)}</span>
        </div>
        <div class="tree-facts">
          <div class="tree-fact"><span>预估产量</span><strong class="${tree.yield ? "" : "is-missing"}">${tree.yield ? `${tree.yield} <small>斤</small>` : "待补充"}</strong></div>
          <div class="tree-fact"><span>本季认养价</span><strong>¥${formatNumber(tree.price)} <small>/年</small></strong></div>
        </div>
        <div class="tree-adopter">
          ${avatarHTML(adopter)}
          <p><strong>${esc(tree.adopter)}</strong> · ${esc(tree.package)} · 「${esc(tree.sign)}」</p>
          <button class="btn btn--soft" type="button" data-action="open-chat" data-person="${esc(tree.adopter)}">联系</button>
        </div>
        <div class="tree-card-foot">
          <div class="tree-harvest-note">${icon("calendar")}${order ? `预计 ${esc(order.harvestDate)} 采摘` : "采摘排期待定"}</div>
          <button class="manage-link" type="button" data-action="view-order" data-id="${esc(order ? order.id : "")}">订单详情 ${icon("chevron-right")}</button>
        </div>
      </div>
    </article>`;
  }

  function pageTrees() {
    const incomplete = state.trees.filter((tree) => !tree.yield).length;
    const counts = orderCounts();
    const filters = {
      all: { label: "全部", count: state.trees.length },
      pending: { label: "待采摘", count: counts.pending },
      sign: { label: "待挂牌", count: counts.sign },
      incomplete: { label: "待完善", count: incomplete }
    };
    let trees = state.trees;
    if (ui.treeFilter === "pending") trees = state.trees.filter((tree) => getOrderForTree(tree.id)?.status === "pending");
    if (ui.treeFilter === "sign") trees = state.trees.filter((tree) => getOrderForTree(tree.id)?.status === "sign");
    if (ui.treeFilter === "incomplete") trees = state.trees.filter((tree) => !tree.yield);

    return `
      ${mobileBrandHead()}
      <div class="page-head">
        <div class="page-head-copy">
          <p class="eyebrow">果树管理 · 12 棵本季已全部认养</p>
          <h1 class="display">每一棵树，<em>都有名有姓。</em></h1>
          <p class="page-sub">补全树况、挂好木牌，认养人在手机那头就能看见自己的树。</p>
        </div>
      </div>

      <div class="trees-banner">
        <span class="trees-banner-icon">${icon("award")}</span>
        <div class="trees-banner-copy">
          <strong>本季 12 棵树全部认养</strong>
          <p>下一季的候补名单已开放，平台会提前 7 天同步拍摄清单。</p>
        </div>
        <button class="btn btn--soft" type="button" data-action="open-update-help">准备上新</button>
      </div>

      <div class="chip-row tree-filters" role="group" aria-label="筛选果树">
        ${Object.entries(filters).map(([key, filter]) => `
          <button class="chip ${ui.treeFilter === key ? "is-active" : ""}" type="button" data-action="filter-trees" data-filter="${key}" aria-pressed="${ui.treeFilter === key}">
            ${filter.label}<span class="chip-count">${filter.count}</span>
          </button>
        `).join("")}
      </div>

      <div class="tree-grid">
        ${trees.length ? trees.map(treeCardHTML).join("") : `<div class="card empty-state"><span class="empty-icon">${icon("tree")}</span><h3>没有符合条件的果树</h3><p>换个筛选条件看看。</p></div>`}
      </div>

      <p class="trees-foot-note">${icon("info")}每棵树一年只认养一次。已认养果树的编号与品种修改需经平台审核；产量预估修改后，认养人页面会同步更新。</p>
    `;
  }

  /* ---------- Wallet ---------- */

  function pageWallet() {
    const weekTotal = state.wallet.weeks.reduce((a, b) => a + b, 0);
    const maxWeek = Math.max(...state.wallet.weeks);
    const totalBreakdown = state.wallet.breakdown.reduce((sum, item) => sum + item.amount, 0);
    const records = state.wallet.records;

    return `
      ${mobileBrandHead({ title: "收益钱包", subtitle: "每一分收成，都算得清楚", back: true })}
      <div class="page-head">
        <div class="page-head-copy">
          <p class="eyebrow">收益钱包 · 每周五结算</p>
          <h1 class="display">每一分收成，<em>都算得清楚。</em></h1>
          <p class="page-sub">认养款、团购代销与内容激励分项入账。提现免手续费，预计 2 小时内到账。</p>
        </div>
        <div class="page-head-actions">
          <button class="btn btn--accent btn--sm" type="button" data-action="open-withdraw">${icon("wallet")}提现</button>
        </div>
      </div>

      <section class="wallet-hero" aria-label="可提现余额">
        <div class="wallet-hero-top">
          <span class="wallet-label">${icon("wallet")}可提现余额</span>
          <span class="pill">${icon("shield-check")}已实名认证</span>
        </div>
        <div class="wallet-balance">¥${formatMoney(state.wallet.available, 2)}<small>元</small></div>
        <div class="wallet-actions">
          <button class="btn btn--cream" type="button" data-action="open-withdraw">${icon("arrow-up-right")}提现到微信</button>
          <button class="btn btn--glass" type="button" data-action="open-settlement-help">${icon("clipboard")}结算明细</button>
        </div>
        <div class="wallet-bottom">
          <div>本月收入<strong>¥${formatMoney(state.wallet.month, 2)}</strong></div>
          <div>累计收入<strong>¥${formatMoney(state.wallet.total, 2)}</strong></div>
          <div class="rule">认养款 70% 直达农户<br>平台服务费 30% 用于内容与冷链</div>
        </div>
      </section>

      <div class="wallet-stats">
        <div class="wallet-stat-card"><span>待结算</span><strong>¥0.00</strong><small>本周五自动结算</small></div>
        <div class="wallet-stat-card"><span>近四周到账</span><strong>¥${formatNumber(weekTotal)}</strong><small>含认养与团购</small></div>
        <div class="wallet-stat-card"><span>结算周期</span><strong>T + 1</strong><small>确认收货后次日</small></div>
      </div>

      <div class="wallet-grid">
        <section class="card wallet-panel" aria-labelledby="income-structure-heading">
          <h2 id="income-structure-heading">本月收入构成</h2>
          <p class="panel-sub">合计 ¥${formatNumber(totalBreakdown)} · 3 个来源</p>
          <div class="revenue-bar" aria-hidden="true">
            ${state.wallet.breakdown.map((item, index) => `<span class="bar-${index + 1}" style="width:${percent(item.amount, totalBreakdown)}%;background:${safeColor(item.color)}"></span>`).join("")}
          </div>
          <div class="revenue-list">
            ${state.wallet.breakdown.map((item) => `
              <div class="revenue-item">
                <span class="revenue-dot" style="background:${safeColor(item.color)}"></span>
                <span>${esc(item.label)} <small style="display:inline;color:var(--muted-2);font-size:8px">· ${esc(item.desc)}</small></span>
                <strong>¥${formatNumber(item.amount)}</strong>
                <small>${percent(item.amount, totalBreakdown)}%</small>
              </div>
            `).join("")}
          </div>
          <div class="wallet-note">${icon("info")}本月收入较上月增长 18%，主要来自校园团购兜底与内容激励。</div>
          <div class="week-bars" aria-label="近四周收入趋势">
            ${state.wallet.weeks.map((value, index) => `<div class="week-bar" title="第${index + 1}周 ¥${formatNumber(value)}"><i style="height:${Math.max(12, Math.round((value / maxWeek) * 40))}px"></i><span>${["第一周", "第二周", "第三周", "本周"][index]}</span></div>`).join("")}
          </div>
        </section>

        <section class="card wallet-panel" aria-labelledby="rules-heading">
          <h2 id="rules-heading">结算规则</h2>
          <p class="panel-sub">平台不压款，账目可追溯</p>
          <div class="settlement-rules">
            <div class="rule-row"><span class="rule-icon">${icon("shield-check")}</span><div><strong>认养款 70% 直达农户</strong>剩余 30% 用于内容运营、冷链与平台服务。</div></div>
            <div class="rule-row"><span class="rule-icon">${icon("truck")}</span><div><strong>团购兜底单独结算</strong>按 2.2 元/斤核算，与认养订单分开入账。</div></div>
            <div class="rule-row"><span class="rule-icon">${icon("calendar")}</span><div><strong>每周五统一提现</strong>单笔最低 10 元，平台免手续费，预计 2 小时内到账。</div></div>
          </div>
          <button class="btn btn--soft btn--block btn--sm" type="button" data-action="open-settlement-help" style="margin-top:14px">查看完整结算说明</button>
        </section>
      </div>

      <section class="card records-panel" aria-labelledby="records-heading">
        <div class="section-head">
          <h2 id="records-heading">收支记录</h2>
          <span class="section-link">共 ${records.length} 笔</span>
        </div>
        <div class="record-list">
          ${records.map((record) => `
            <div class="record-row ${record.type === "out" ? "is-out" : ""}">
              <span class="record-icon">${icon(record.type === "out" ? "arrow-up-right" : "arrow-right")}</span>
              <div class="record-copy"><strong>${esc(record.title)}</strong><span>${esc(record.meta)} · ${esc(record.date)}</span></div>
              <div class="record-amount ${record.type === "out" ? "is-out" : ""}">${record.type === "out" ? "-" : "+"}¥${formatMoney(Math.abs(record.amount), 2)}<small>${record.type === "out" ? "已到账" : "已入账"}</small></div>
            </div>
          `).join("")}
        </div>
      </section>
    `;
  }

  /* ---------- Live ---------- */

  function pageLive() {
    return `
      ${mobileBrandHead({ title: "直播助手", subtitle: "果园夜话 · 第12期", back: true })}
      <div class="page-head">
        <div class="page-head-copy">
          <p class="eyebrow">直播助手 · 今晚 19:30</p>
          <h1 class="display">把田埂，<em>搬到手机里。</em></h1>
          <p class="page-sub">不用专业设备。找一处光线好的树下，把手机架稳，讲讲 8 号树的木牌和今天的果子。</p>
        </div>
      </div>

      <div class="live-layout">
        <section class="live-stage">
          <img src="assets/live-stage.webp" alt="果园助农直播画面示例">
          <div class="live-stage-top">
            <span class="pill${""}">${icon("broadcast")}今晚 19:30</span>
            <span class="pill">214 人已预约</span>
          </div>
          <button class="live-stage-play" type="button" data-action="live-start" aria-label="进入直播准备">${icon("play")}</button>
          <div class="live-stage-body">
            <p class="eyebrow eyebrow--plain">果园夜话 · 第12期</p>
            <h2>给 8 号树系上第一根红绳</h2>
            <div class="live-stage-meta">
              <span>${icon("users")}214 人已预约</span>
              <span>${icon("clock")}预计 30 分钟</span>
              <span>${icon("map-pin")}团结村 3 号果园</span>
            </div>
          </div>
        </section>

        <aside class="card live-setup">
          <h2>开播前，检查三件事</h2>
          <div class="live-schedule">
            <div class="live-schedule-time">19:30</div>
            <div class="live-schedule-copy"><strong>今晚 · 11月21日</strong><span>果园夜话第12期 · 预约 214 人</span></div>
          </div>
          <div class="live-checks">
            <div class="live-check">${icon("check")}网络通畅，电量 86%</div>
            <div class="live-check">${icon("check")}手机支架已在田埂架好</div>
            <div class="live-check">${icon("check")}8号树木牌与红绳已备好</div>
          </div>
          <button class="btn btn--accent btn--block" type="button" data-action="live-start">${icon("broadcast")}进入演示直播间</button>
          <p class="live-tip">演示版使用示例画面，正式版将接入微信直播能力。</p>
          <div class="live-attendees">
            <div class="avatar-stack">
              ${avatarHTML(studentPerson("晓龙"))}
              ${avatarHTML(studentPerson("林小雨"))}
              ${avatarHTML(studentPerson("周雨桐"))}
              <span class="avatar-stack-more">+9</span>
            </div>
            <p><strong>12 位认养人已预约</strong><span>晓龙、林小雨、周雨桐……今晚都想来听。</span></p>
          </div>
        </aside>
      </div>

      <div class="live-grid">
        <section class="card script-panel">
          <h2>${icon("clipboard")}今晚的直播脚本</h2>
          <div class="script-list">
            <div class="script-item"><span class="script-num">01</span><div><strong>开场 · 带大家看园子（2分钟）</strong><p>镜头从田埂慢慢推到 8 号树，说明今天的光线和果子的转色情况。</p></div></div>
            <div class="script-item"><span class="script-num">02</span><div><strong>挂牌 · 读一读晓龙的木牌（5分钟）</strong><p>边挂红绳边念「等一场冬天的甜」，讲讲这个孩子每周都来问树。</p></div></div>
            <div class="script-item"><span class="script-num">03</span><div><strong>答疑 · 降温、自提与保底（8分钟）</strong><p>回答认养人最关心的三个问题：冷不冷、什么时候采、保底多少斤。</p></div></div>
          </div>
        </section>

        <section class="card live-history">
          <h2>${icon("bar-chart")}上期回顾</h2>
          <div class="history-stats">
            <div class="history-stat"><strong>214</strong><span>观看人次</span></div>
            <div class="history-stat"><strong>37</strong><span>评论互动</span></div>
            <div class="history-stat"><strong>6</strong><span>新增认养</span></div>
          </div>
          <p class="history-note">第11期「果园夜话：冬天的第一口甜」 · 回放已同步到田埂日记，可继续带来长尾认养。</p>
          <button class="btn btn--soft btn--block btn--sm" type="button" data-action="live-replay" style="margin-top:12px">查看直播回放</button>
        </section>
      </div>
    `;
  }

  /* ---------- Profile ---------- */

  function settingsRow({ icon: iconName, title, sub, action, route, href, tone, value, switchKey, target }) {
    const inner = `
      <span class="settings-icon">${icon(iconName)}</span>
      <span class="settings-copy"><strong>${esc(title)}</strong>${sub ? `<span>${esc(sub)}</span>` : ""}</span>
      ${switchKey ? `<button class="switch ${state.settings[switchKey] ? "is-on" : ""}" type="button" data-action="toggle-setting" data-setting="${switchKey}" role="switch" aria-checked="${Boolean(state.settings[switchKey])}" aria-label="${esc(title)}"></button>` : value ? `<span class="settings-value">${esc(value)}</span>` : icon("chevron-right", "settings-chevron")}
    `;
    if (switchKey) return `<div class="settings-row"${tone ? ` data-tone="${tone}"` : ""}>${inner}</div>`;

    const attrs = [
      `class="settings-row"`,
      tone ? `data-tone="${tone}"` : "",
      action ? `data-action="${action}"` : "",
      route ? `data-route="${route}"` : "",
      target ? `data-target="${target}"` : "",
      href ? `href="${href}"` : "",
      href ? `target="_blank" rel="noopener"` : ""
    ].filter(Boolean).join(" ");
    if (href) return `<a ${attrs}>${inner}</a>`;
    return `<button ${attrs} type="button">${inner}</button>`;
  }

  function pageMe() {
    const done = taskProgress();
    return `
      ${mobileBrandHead()}
      <div class="page-head">
        <div class="page-head-copy">
          <p class="eyebrow">守树人档案 · 已入驻 286 天</p>
          <h1 class="display">周阿姨，<em>果园的当家人。</em></h1>
          <p class="page-sub">这里是您的数字果园档案。资料、提醒和结算，都在这一页。</p>
        </div>
      </div>

      <div class="profile-layout">
        <div class="profile-main">
          <section class="profile-hero">
            <div class="profile-hero-top">
              <img class="avatar profile-avatar" src="assets/farmer-avatar.webp" alt="周桂芳">
              <div class="profile-identity">
                <h1>周桂芳 <span class="profile-verified">${icon("check")}实名认证</span></h1>
                <p>团结村 3 号果园 · 守树人</p>
                <div class="profile-tags">
                  <span class="pill">68 岁</span>
                  <span class="pill">种植 38 年</span>
                  <span class="pill">彭山 · 黄丰镇</span>
                </div>
              </div>
              <button class="profile-edit" type="button" data-action="edit-profile" aria-label="编辑农户资料">${icon("edit-3")}</button>
            </div>
            <div class="profile-hero-bottom">
              <p>“果树不会说话，但结的果子会。<strong>把每一棵树照顾好，就是我最要紧的事。</strong>”</p>
            </div>
          </section>

          <div class="profile-stat-grid">
            <div class="profile-stat"><strong>12</strong><span>本季在架果树</span></div>
            <div class="profile-stat"><strong>86</strong><span>累计认养家庭</span></div>
            <div class="profile-stat"><strong>128</strong><span>代际陪伴互动</span></div>
          </div>

          <div class="settings-grid">
            <section class="settings-group">
              <p class="settings-group-title">果园经营</p>
              <div class="settings-card">
                ${settingsRow({ icon: "tree", title: "我的果树", sub: "12 棵 · 本季已全部认养", route: "trees", tone: "orange" })}
                ${settingsRow({ icon: "package", title: "团购兜底", sub: "未认养果 2.2 元/斤统一收购", action: "open-groupbuy-help" })}
                ${settingsRow({ icon: "shield-check", title: "认养协议与保底条款", sub: "保底 40 斤 · 破损包赔", action: "open-agreement-help" })}
                ${settingsRow({ icon: "truck", title: "物流与自提设置", sub: "锦江学院南门田约驿站", action: "open-logistics-help" })}
              </div>
            </section>

            <section class="settings-group">
              <p class="settings-group-title">内容与成长</p>
              <div class="settings-card">
                ${settingsRow({ icon: "camera", title: "拍摄教程", sub: "三个固定镜头，零门槛拍果园", action: "open-shooting-help", tone: "blue" })}
                ${settingsRow({ icon: "sparkles", title: "AI 内容助手", sub: "不会写文案，按住说话就好", route: "feed" })}
                ${settingsRow({ icon: "broadcast", title: "直播回放", sub: "上期 214 人次观看", route: "live" })}
              </div>
            </section>

            <section class="settings-group">
              <p class="settings-group-title">收益与提醒</p>
              <div class="settings-card">
                ${settingsRow({ icon: "wallet", title: "收益钱包", sub: `可提现 ¥${formatMoney(state.wallet.available, 2)}`, route: "wallet", tone: "orange" })}
                ${settingsRow({ icon: "clipboard", title: "结算记录", sub: "认养、团购、内容激励分项可查", route: "wallet" })}
                ${settingsRow({ icon: "bell", title: "新订单提醒", switchKey: "newOrderNotify" })}
                ${settingsRow({ icon: "message-circle", title: "认养人留言提醒", switchKey: "chatNotify" })}
                ${settingsRow({ icon: "calendar", title: "每周结算提醒", switchKey: "settlementNotify" })}
              </div>
            </section>

            <section class="settings-group">
              <p class="settings-group-title">服务与帮助</p>
              <div class="settings-card">
                ${settingsRow({ icon: "users", title: "联系平台运营", sub: "工作日 9:00–18:00", action: "open-contact-help" })}
                ${settingsRow({ icon: "help-circle", title: "帮助中心", sub: "常见问题与操作说明", action: "open-help" })}
                ${settingsRow({ icon: "smartphone", title: "切回用户端", sub: "看看 8 号树今天的心情", href: "client.html", tone: "blue" })}
              </div>
            </section>
          </div>
        </div>

        <aside class="profile-side">
          <section class="card wallet-panel" style="background:linear-gradient(135deg,#fcf4e8,#f8ecdd);border-color:rgba(217,108,47,.14)">
            <p class="eyebrow">本周可提现</p>
            <h2 style="font-size:38px;margin-top:2px">¥${formatMoney(state.wallet.available, 2)}</h2>
            <p class="panel-sub" style="margin-top:5px">本周五结算 · 免手续费 · 2 小时内到账</p>
            <div style="display:flex;gap:8px;margin-top:14px">
              <button class="btn btn--accent btn--sm" type="button" data-action="open-withdraw">去提现</button>
              <button class="btn btn--outline btn--sm" type="button" data-route="wallet">看明细</button>
            </div>
          </section>

          <section class="card settings-card" style="margin-top:14px">
            ${settingsRow({ icon: "refresh-ccw", title: "重新体验演示", sub: "清空本地改动，恢复初始数据", action: "reset-demo" })}
          </section>

          <section class="card content-tips" style="margin-top:14px">
            <h3>${icon("award")}守树人小档案</h3>
            <div class="tip-list">
              <div class="tip-item"><span class="tip-num">01</span><span>2018 年起参与线下认养，累计接待 40 多组家庭。</span></div>
              <div class="tip-item"><span class="tip-num">02</span><span>最拿手的是春见耙耙柑，去年 8 号树测出 14.2 度糖。</span></div>
              <div class="tip-item"><span class="tip-num">03</span><span>这个产季，已经和 12 位大学生认养人成了“忘年交”。</span></div>
            </div>
          </section>

          <section class="card content-tips profile-plan" style="margin-top:14px">
            <h3>${icon("calendar")}本周内容计划</h3>
            <div class="plan-list">
              <div class="plan-item">
                <span class="plan-date">周一</span>
                <p><strong>8号树转色记录</strong><span>田埂日记 · 已发布</span></p>
                <span class="pill pill--green">已发</span>
              </div>
              <div class="plan-item">
                <span class="plan-date">周三</span>
                <p><strong>给树根盖稻草</strong><span>田间日常 · 待拍摄</span></p>
                <span class="pill pill--orange">待发</span>
              </div>
              <div class="plan-item">
                <span class="plan-date">周五</span>
                <p><strong>果园夜话第12期</strong><span>直播 · 19:30</span></p>
                <span class="pill">直播</span>
              </div>
            </div>
            <button class="btn btn--soft btn--block btn--sm" type="button" data-route="feed" data-focus="composer" style="margin-top:11px">去拍下一条</button>
          </section>
        </aside>
      </div>

      <p class="profile-footer">
        <strong>田约认采 · 以数字认养为桥，联结青年与乡土</strong>
        五行山项目组 · 四川大学锦江学院 · 三创赛三农电子商务赛道<br>
        当前为交互演示版，数据保存在本机浏览器。　
        <button type="button" data-action="reset-demo">清除演示数据</button>
      </p>
    `;
  }

  /* ---------- Modals: order detail ---------- */

  function orderDetailModal(orderId) {
    const order = state.orders.find((item) => item.id === orderId);
    if (!order) return;
    const tree = getTree(order.treeId);
    const statusMeta = ORDER_STATUS[order.status];
    const stageIndex = { confirm: 1, sign: 1, pending: 2, shipping: 3, done: 4 }[order.status] || 1;
    const steps = ["完成认养", "挂牌确认", "采摘打包", "交付完成"];
    const primaryAction = order.status === "sign" ? "order-go-sign" : (order.status === "pending" || order.status === "shipping") ? "advance-order" : order.status === "confirm" ? "open-chat" : "close-overlay";
    const primaryLabel = order.status === "done" ? "关闭" : statusMeta.action;
    const primaryPerson = order.status === "confirm" ? order.adopter : "";

    openModal({
      title: `${order.treeNo}树 · 认养订单`,
      subtitle: order.id,
      body: `
        <div style="display:flex;align-items:center;gap:12px">
          <div class="order-tree-thumb" style="width:76px;height:76px;border-radius:13px"><img src="${esc(tree ? tree.image : "")}" alt=""></div>
          <div style="min-width:0;flex:1">
            <div style="display:flex;align-items:center;gap:7px;flex-wrap:wrap"><h3 style="font-family:var(--serif);font-size:19px">${esc(order.treeNo)}树</h3>${statusPill(order.status)}</div>
            <p style="margin-top:4px;color:var(--muted);font-size:9.5px">${esc(tree ? tree.variety : "")} · 树龄 ${tree ? tree.age : "-"} 年 · ${esc(order.package)}</p>
            <p style="margin-top:2px;color:var(--muted-2);font-size:9px">${esc(order.channel)} · 采摘排期 ${esc(order.harvestDate)}</p>
          </div>
        </div>

        <div class="order-adopter" style="margin-top:14px;border-top:1px solid var(--line)">
          ${avatarHTML(studentPerson(order.adopter))}
          <div class="order-adopter-copy"><strong>${esc(order.adopter)}</strong><span>${esc(order.school)}</span></div>
          <button class="btn btn--soft btn--sm" type="button" data-action="open-chat" data-person="${esc(order.adopter)}">${icon("message-circle")}聊两句</button>
        </div>

        <div class="order-sign" style="margin-top:10px;padding:10px">${icon("tag")}<span>木牌寄语：<em>「${esc(order.sign)}」</em></span></div>

        <div style="margin-top:17px;padding:13px;border-radius:11px;background:var(--surface-soft)">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:10px">
            <strong style="font-size:10px">订单进度</strong><span style="color:var(--muted-2);font-size:8.5px">${esc(statusMeta.description)}</span>
          </div>
          <div style="display:flex;align-items:center;gap:4px">
            ${steps.map((step, index) => `<div style="flex:1;text-align:center"><span style="display:block;width:19px;height:19px;margin:0 auto;border-radius:50%;background:${index < stageIndex ? "var(--forest)" : index === stageIndex ? "var(--orange)" : "var(--paper-2)"};color:${index <= stageIndex ? "#fff" : "var(--muted-2)"};font-size:8px;line-height:19px">${index < stageIndex ? "✓" : index + 1}</span><small style="display:block;margin-top:4px;color:${index <= stageIndex ? "var(--ink-soft)" : "var(--muted-2)"};font-size:7.5px;white-space:nowrap">${step}</small></div>`).join("")}
          </div>
        </div>

        <div class="receipt-box" style="margin-top:12px">
          <div class="receipt-row"><span>认养金额</span><span class="amount" style="font-size:18px">¥${formatNumber(order.amount)}</span></div>
          <div class="receipt-row"><span>保底收成</span><strong>${esc(order.guarantee)}</strong></div>
          <div class="receipt-row"><span>采摘 / 自提窗口</span><strong>${esc(order.pickWindow)}</strong></div>
          <div class="receipt-row"><span>下单时间</span><strong>${esc(order.created)}</strong></div>
        </div>
      `,
      foot: `
        <button class="btn btn--outline" type="button" data-close>关闭</button>
        <button class="btn ${order.status === "sign" ? "btn--accent" : ""}" type="button" data-action="${primaryAction}" data-id="${esc(order.id)}" data-person="${esc(primaryPerson)}">${esc(primaryLabel)}</button>
      `,
      wide: true
    });
  }

  /* ---------- Modals: chat ---------- */

  function ensureChat(name) {
    if (!state.chats[name]) {
      const order = state.orders.find((item) => item.adopter === name);
      state.chats[name] = {
        name,
        ...studentPerson(name),
        role: order ? `${order.treeNo}树认养人 · 锦江学院` : "认养人 · 锦江学院",
        unread: 0,
        messages: order
          ? [{ from: "student", type: "text", text: `阿姨，${order.treeNo}树最近怎么样呀？`, time: "刚刚" }]
          : []
      };
      saveState();
    }
    return state.chats[name];
  }

  function chatBodyHTML(chat) {
    return chat.messages.map((message) => {
      const mine = message.from === "farmer";
      if (message.type === "voice") {
        return `<div class="chat-bubble-row ${mine ? "is-me" : ""}">
          ${mine ? "" : `<span class="chat-mini-avatar">${esc(chat.initial)}</span>`}
          <div>
            <div class="chat-bubble">
              <div class="chat-voice">${icon("volume-2")}<span class="wave"><i></i><i></i><i></i><i></i><i></i><i></i></span><span>12″</span></div>
            </div>
            <p class="chat-bubble-time">${esc(message.time)}</p>
          </div>
        </div>`;
      }
      return `<div class="chat-bubble-row ${mine ? "is-me" : ""}">
        ${mine ? "" : `<span class="chat-mini-avatar">${esc(chat.initial)}</span>`}
        <div>
          <div class="chat-bubble">${esc(message.text)}</div>
          <p class="chat-bubble-time">${esc(message.time)}</p>
        </div>
      </div>`;
    }).join("");
  }

  function openChat(name) {
    const chat = ensureChat(name);
    chat.unread = 0;
    saveState();
    updateChrome();
    if (currentRoute() === "home") renderPage({ preserveScroll: true });
    openSheet(`
      <div class="sheet-head">
        <div class="sheet-head-copy"><h2>与 ${esc(chat.name)} 聊聊</h2><p>语音会自动转成文字，慢慢说就好</p></div>
        <button class="sheet-close" type="button" data-close aria-label="关闭">${icon("x")}</button>
      </div>
      <div class="chat-person">
        ${avatarHTML(chat, "", "")}
        <div class="chat-person-copy"><strong>${esc(chat.name)}</strong><span>${esc(chat.role)}</span></div>
        <span class="pill pill--green"><span class="pill-dot"></span>在线</span>
      </div>
      <div class="chat-body" id="chat-body">
        <p class="chat-date">2026年11月21日</p>
        ${chatBodyHTML(chat)}
      </div>
      <div class="chat-quick">
        <button type="button" data-action="chat-quick" data-text="娃儿放心，树好着呢">娃儿放心，树好着呢</button>
        <button type="button" data-action="chat-quick" data-text="降温了，我给你拍段视频">降温了，给你拍段视频</button>
        <button type="button" data-action="chat-quick" data-text="木牌挂好了，给你看">木牌挂好了</button>
        <button type="button" data-action="chat-quick" data-text="十二月来园里耍">十二月来园里耍</button>
      </div>
      <form class="chat-composer" data-form="chat" data-person="${esc(name)}">
        <button class="chat-voice-btn" type="button" data-action="chat-voice" aria-label="语音转文字">${icon("mic")}</button>
        <input name="message" id="chat-input" autocomplete="off" placeholder="说点什么…" aria-label="输入留言" maxlength="120" autofocus>
        <button class="send-btn" type="submit" aria-label="发送">${icon("send")}</button>
      </form>
      <p class="chat-note">语音会自动转成文字 · 演示对话会自动收到一条模拟回复</p>
    `, { sheet: true });
    requestAnimationFrame(() => {
      const body = $("#chat-body");
      if (body) body.scrollTop = body.scrollHeight;
      const input = $("#chat-input");
      if (input) input.focus({ preventScroll: true });
    });
  }

  function sendChatMessage(person, text) {
    const value = String(text || "").trim();
    if (!value) return;
    const chat = ensureChat(person);
    chat.messages.push({ from: "farmer", type: "text", text: value, time: timeNow() });
    saveState();
    const body = $("#chat-body");
    if (body) {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = `<div class="chat-bubble-row is-me"><div><div class="chat-bubble">${esc(value)}</div><p class="chat-bubble-time">${timeNow()}</p></div></div>`;
      body.appendChild(wrapper.firstElementChild);
      body.scrollTop = body.scrollHeight;
    }
    const input = $("#chat-input");
    if (input) {
      input.value = "";
      input.focus({ preventScroll: true });
    }
    window.clearTimeout(ui.chatAutoReplyTimer);
    ui.chatAutoReplyTimer = window.setTimeout(() => {
      const replies = {
        "晓龙": "好嘞阿姨，您也注意身体。等木牌挂好了给我看看！",
        "林小雨": "谢谢阿姨！十二月见，我给您带杯热奶茶。",
        "周雨桐": "好呀好呀，小朋友看到照片一定很开心。"
      };
      const replyText = replies[person] || "收到啦阿姨，谢谢您惦记。";
      const liveChat = ensureChat(person);
      liveChat.messages.push({ from: "student", type: "text", text: replyText, time: timeNow() });
      saveState();
      const liveBody = $("#chat-body");
      if (liveBody && ui.overlayOpen) {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = `<div class="chat-bubble-row"><span class="chat-mini-avatar">${esc(liveChat.initial)}</span><div><div class="chat-bubble">${esc(replyText)}</div><p class="chat-bubble-time">${timeNow()}</p></div></div>`;
        liveBody.appendChild(wrapper.firstElementChild);
        liveBody.scrollTop = liveBody.scrollHeight;
      }
    }, 1600);
  }

  /* ---------- Modals: notifications ---------- */

  function openNotifications() {
    openSheet(`
      <div class="sheet-head">
        <div class="sheet-head-copy"><h2>园子里的消息</h2><p>${state.notifRead ? "已全部读完" : `${state.notifications.length} 条未读`}</p></div>
        <button class="sheet-close" type="button" data-close aria-label="关闭">${icon("x")}</button>
      </div>
      <div class="notification-list">
        ${state.notifications.map((item) => `
          <button class="notification-item" type="button" data-action="notification-go" data-target="${esc(item.target)}">
            <span class="notification-icon">${icon(item.icon)}</span>
            <span class="notification-copy"><strong>${esc(item.title)}</strong><p>${esc(item.text)}</p><time>${esc(item.time)}</time></span>
          </button>
        `).join("")}
      </div>
      <div class="notifications-foot">
        <button class="btn btn--soft" type="button" data-action="mark-notifications-read" ${state.notifRead ? "disabled" : ""}>${state.notifRead ? "已全部读完" : "全部标为已读"}</button>
      </div>
    `, { sheet: true, className: "notifications-sheet" });
  }

  /* ---------- Modals: withdraw ---------- */

  function openWithdraw() {
    openModal({
      title: "提现到微信零钱",
      subtitle: "平台免手续费 · 预计 2 小时内到账",
      body: `
        <form data-form="withdraw" id="withdraw-form">
          <div class="form-field">
            <label for="withdraw-amount">提现金额 <span>单笔最低 10 元</span></label>
            <div class="money-input-wrap"><span class="money-prefix">¥</span><input class="input" id="withdraw-amount" name="amount" type="number" min="10" max="${state.wallet.available}" step="0.01" inputmode="decimal" placeholder="0.00" required autofocus></div>
            <div class="amount-quick">
              <button type="button" data-action="fill-withdraw" data-amount="100">¥100</button>
              <button type="button" data-action="fill-withdraw" data-amount="500">¥500</button>
              <button type="button" data-action="fill-withdraw" data-amount="${state.wallet.available}">全部提现</button>
            </div>
            <div class="balance-hint"><span>可提现余额</span><strong>¥${formatMoney(state.wallet.available, 2)}</strong></div>
          </div>
          <div class="form-field">
            <label>到账方式</label>
            <div class="withdraw-method">
              <span class="method-icon">${icon("wallet")}</span>
              <p>微信零钱 <span>周桂芳 · 尾号 0421</span></p>${icon("check")}
            </div>
          </div>
          <p class="field-note" style="margin-top:10px">认养款按 70% 结算给农户。提现记录可在收益钱包查看。</p>
          <div class="modal-foot" style="padding:18px 0 0;justify-content:flex-end">
            <button class="btn btn--outline" type="button" data-close>取消</button>
            <button class="btn btn--accent" type="submit">确认提现</button>
          </div>
        </form>
      `
    });
  }

  function submitWithdraw(form) {
    const amountValue = Number(form.elements.amount.value);
    if (!Number.isFinite(amountValue) || amountValue < 10) {
      toast("提现金额不能低于 10 元");
      return;
    }
    if (amountValue > state.wallet.available) {
      toast("提现金额超过了可提现余额");
      return;
    }
    const amount = Math.round(amountValue * 100) / 100;
    const submitButton = form.querySelector('[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "处理中…";
    }
    window.setTimeout(() => {
      state.wallet.available = Math.round((state.wallet.available - amount) * 100) / 100;
      state.wallet.records.unshift({
        id: `r${Date.now()}`,
        title: "提现到微信零钱",
        meta: "尾号 0421 · 预计2小时内到账",
        date: "刚刚",
        amount: -amount,
        type: "out"
      });
      completeTask("withdraw", false);
      saveState();
      closeOverlay(true);
      renderPage({ preserveScroll: true });
      openModal({
        title: "",
        body: `
          <div class="success-view">
            <span class="success-mark">${icon("check")}</span>
            <h2>提现申请已提交</h2>
            <p>¥${formatMoney(amount, 2)} 正在前往微信零钱，预计 2 小时内到账。</p>
            <div class="receipt-box">
              <div class="receipt-row"><span>提现金额</span><span class="amount">¥${formatMoney(amount, 2)}</span></div>
              <div class="receipt-row"><span>到账方式</span><strong>微信零钱 · 尾号 0421</strong></div>
              <div class="receipt-row"><span>预计到账</span><strong>2 小时内</strong></div>
            </div>
            <button class="btn btn--block" type="button" data-close style="margin-top:17px">知道了</button>
          </div>
        `,
        hideHead: true,
        hideClose: true,
        centered: true,
        flush: true
      });
      toast("提现申请已提交", "success");
    }, 850);
  }

  /* ---------- Modals: tree edit ---------- */

  function openTreeModal(treeId) {
    const tree = getTree(treeId);
    if (!tree) return;
    openModal({
      title: `编辑果树 · ${tree.no}树`,
      subtitle: "树况修改后会同步到认养人页面",
      body: `
        <form data-form="tree" id="tree-form" data-id="${esc(tree.id)}">
          <div class="field-row">
            <div class="form-field">
              <label for="tree-no">果树编号</label>
              <input class="input" id="tree-no" name="no" value="${esc(tree.no)}" required maxlength="8">
            </div>
            <div class="form-field">
              <label for="tree-variety">品种</label>
              <select class="select" id="tree-variety" name="variety">
                ${["春见耙耙柑", "爱媛38号", "不知火"].map((value) => `<option ${tree.variety === value ? "selected" : ""}>${value}</option>`).join("")}
              </select>
            </div>
          </div>
          <div class="field-row">
            <div class="form-field">
              <label for="tree-age">树龄 <span>年</span></label>
              <input class="input" id="tree-age" name="age" type="number" min="1" max="80" value="${tree.age}" required>
            </div>
            <div class="form-field">
              <label for="tree-phase">当前树况</label>
              <select class="select" id="tree-phase" name="phase">
                ${["转色期", "糖度上升", "采摘期", "已采摘", "清园养护"].map((value) => `<option ${tree.phase === value ? "selected" : ""}>${value}</option>`).join("")}
              </select>
            </div>
          </div>
          <div class="field-row">
            <div class="form-field">
              <label for="tree-yield">预估产量 <span>斤</span></label>
              <input class="input" id="tree-yield" name="yield" type="number" min="0" max="500" value="${tree.yield ?? ""}" placeholder="如 60" ${!tree.yield ? "autofocus" : ""}>
              ${!tree.yield ? `<p class="field-note" style="color:var(--orange-dark)">这棵树的产量还没补，认养人还在等。</p>` : ""}
            </div>
            <div class="form-field">
              <label for="tree-price">认养价 <span>元 / 年</span></label>
              <input class="input" id="tree-price" name="price" type="number" min="1" max="9999" value="${tree.price}" required>
            </div>
          </div>
          <div class="order-sign" style="margin-top:4px">${icon("info")}<span>认养人：<em>${esc(tree.adopter)}</em> · 木牌寄语「${esc(tree.sign)}」 · 修改后自动推送提醒。</span></div>
          <div class="modal-foot" style="padding:18px 0 0">
            <button class="btn btn--outline" type="button" data-close>取消</button>
            <button class="btn btn--accent" type="submit">保存并同步</button>
          </div>
        </form>
      `
    });
  }

  function submitTreeForm(form) {
    const tree = getTree(form.dataset.id);
    if (!tree) return;
    const formData = new FormData(form);
    const nextYield = String(formData.get("yield") || "").trim();
    const age = Number(formData.get("age"));
    const price = Number(formData.get("price"));
    const next = {
      no: String(formData.get("no") || "").trim() || tree.no,
      variety: String(formData.get("variety") || tree.variety),
      phase: String(formData.get("phase") || tree.phase),
      age: Number.isFinite(age) ? Math.max(1, Math.round(age)) : tree.age,
      yield: nextYield ? Math.max(0, Math.round(Number(nextYield))) : null,
      price: Number.isFinite(price) ? Math.max(1, Math.round(price)) : tree.price
    };
    if (!next.no) {
      toast("请填写果树编号");
      return;
    }
    Object.assign(tree, next);
    const order = getOrderForTree(tree.id);
    if (order) {
      order.treeNo = next.no;
    }
    if (tree.id === "t9" && next.yield) completeTask("yield9", false);
    saveState();
    closeOverlay(true);
    renderPage({ preserveScroll: true });
    toast("果树信息已保存，并同步给认养人", "success");
  }

  /* ---------- Modals: generic / info ---------- */

  function openInfoModal(title, subtitle, html) {
    openModal({
      title,
      subtitle,
      body: html,
      foot: `<button class="btn" type="button" data-close>知道了</button>`
    });
  }

  function openGroupbuyHelp() {
    openInfoModal("团购兜底，怎么兜？", "认养优先，团购兜底，不让好果子烂在地里。", `
      <div class="tip-list">
        <div class="tip-item"><span class="tip-num">01</span><span>认养期结束后仍未认养的果树，平台统一纳入校园团购。</span></div>
        <div class="tip-item"><span class="tip-num">02</span><span>按 <strong>2.2 元/斤</strong> 结算，60 斤预计回款 132 元；可转为下一年认养金。</span></div>
        <div class="tip-item"><span class="tip-num">03</span><span>团购订单单独结算，不与认养款混账，收入在收益钱包分项可查。</span></div>
      </div>
      <div class="wallet-note" style="margin-top:14px">${icon("shield-check")}2026 年产季，彭山试点优先保障认养订单，其次启动团购兜底。</div>
    `);
  }

  function openAgreementHelp() {
    openInfoModal("认养协议与保底条款", "一份对认养人、也对农户公平的约定。", `
      <div class="tip-list">
        <div class="tip-item"><span class="tip-num">01</span><span>每棵树一年只认养一次；认养后 24 小时内锁树挂牌。</span></div>
        <div class="tip-item"><span class="tip-num">02</span><span>标准认养保底 40 斤，实际产量不足由平台按比例协调。</span></div>
        <div class="tip-item"><span class="tip-num">03</span><span>认养款 70% 直达农户，30% 用于内容、冷链与平台服务。</span></div>
        <div class="tip-item"><span class="tip-num">04</span><span>邮寄破损 24 小时内包赔；到园自提可在现场试吃。</span></div>
      </div>
    `);
  }

  function openLogisticsHelp() {
    openInfoModal("物流与自提设置", "让每一箱果子都有去处。", `
      <div class="tip-list">
        <div class="tip-item"><span class="tip-num">01</span><span><strong>邮寄到家：</strong>顺丰冷链，平台承担运费，可拆 3 箱寄出。</span></div>
        <div class="tip-item"><span class="tip-num">02</span><span><strong>到校自提：</strong>锦江学院南门田约驿站，12月21日至27日凭码取货。</span></div>
        <div class="tip-item"><span class="tip-num">03</span><span><strong>公益捐赠：</strong>彭山区留守儿童之家，12月24日统一送达。</span></div>
        <div class="tip-item"><span class="tip-num">04</span><span><strong>团购代销：</strong>按 2.2 元/斤结算，平台统一组织校园团购。</span></div>
      </div>
    `);
  }

  function openShootingHelp() {
    openInfoModal("农户零门槛拍摄教程", "不摆拍、不加滤镜，真实就是最好的内容。", `
      <div class="tip-list">
        <div class="tip-item"><span class="tip-num">01</span><span><strong>地块长势：</strong>先拍全景，再走近拍一张果实特写。</span></div>
        <div class="tip-item"><span class="tip-num">02</span><span><strong>田间日常：</strong>拍手上的活、脚下的土，说一句今天在做什么。</span></div>
        <div class="tip-item"><span class="tip-num">03</span><span><strong>特色场景：</strong>木牌、红绳、学生来园、采摘装筐都可以拍。</span></div>
        <div class="tip-item"><span class="tip-num">04</span><span>固定手机、找顺光、录 30 秒即可。平台会统一剪辑配文。</span></div>
      </div>
    `);
  }

  function openUpdateHelp() {
    openInfoModal("下一季上新准备", "先把单店模型跑正，再谈扩张。", `
      <p style="color:var(--muted);font-size:11px;line-height:1.9">本季 12 棵果树已全部认养。下一季上新前，平台会提前 7 天同步拍摄清单、树况字段和认养价建议。</p>
      <div class="tip-list" style="margin-top:13px">
        <div class="tip-item"><span class="tip-num">01</span><span>补齐每棵树的树龄、产量预估与成熟期。</span></div>
        <div class="tip-item"><span class="tip-num">02</span><span>拍一组果树全景与果实特写，作为认养页封面。</span></div>
        <div class="tip-item"><span class="tip-num">03</span><span>确认下一季保底斤数与自提点安排。</span></div>
      </div>
    `);
  }

  function openSettlementHelp() {
    openInfoModal("结算与提现说明", "每一笔都拆得开、对得上。", `
      <div class="tip-list">
        <div class="tip-item"><span class="tip-num">01</span><span>认养订单确认收货后次日结算，每周五可发起提现。</span></div>
        <div class="tip-item"><span class="tip-num">02</span><span>认养款按 70% 进入农户可提现余额；团购代销与内容激励单独入账。</span></div>
        <div class="tip-item"><span class="tip-num">03</span><span>单笔提现最低 10 元，平台免手续费，预计 2 小时内到账。</span></div>
        <div class="tip-item"><span class="tip-num">04</span><span>如对账目有疑问，可联系平台运营核对订单流水。</span></div>
      </div>
    `);
  }

  function openOrdersHelp() {
    openInfoModal("订单排期说明", "按成熟期与收成意向自动排序。", `
      <p style="color:var(--muted);font-size:11px;line-height:1.9">12 笔订单已按采摘日排好：12月15日起分批采摘，12月20日集中开园。邮寄订单需提前一天打包，自提订单请提前确认驿站时段。</p>
      <div class="tip-list" style="margin-top:13px">
        <div class="tip-item"><span class="tip-num">01</span><span>待挂牌的订单优先处理，认养人在等木牌视频。</span></div>
        <div class="tip-item"><span class="tip-num">02</span><span>标记采摘后，系统会自动通知认养人。</span></div>
        <div class="tip-item"><span class="tip-num">03</span><span>公益捐赠订单请按 12月24日统一送达节点备货。</span></div>
      </div>
    `);
  }

  function openContactHelp() {
    openInfoModal("联系平台运营", "项目运营小组会尽快回复您。", `
      <div style="display:flex;align-items:center;gap:12px;padding:14px;border-radius:12px;background:var(--surface-soft)">
        <span class="ai-tip-icon">${icon("users")}</span>
        <div><strong style="display:block;font-size:11px">五行山项目组 · 四川大学锦江学院</strong><span style="display:block;margin-top:3px;color:var(--muted);font-size:9px">服务时间：工作日 9:00–18:00<br>线上客服与拍摄指导均由项目组学生轮值。</span></div>
      </div>
      <div class="wallet-note" style="margin-top:12px">${icon("info")}演示版暂未接入在线客服，正式版将在小程序内提供工单入口。</div>
    `);
  }

  function openHelp() {
    openInfoModal("帮助中心", "第一次用也不怕，照着做就好。", `
      <div class="tip-list">
        <div class="tip-item"><span class="tip-num">01</span><span><strong>怎么发一条动态？</strong>去“果园动态”，拍一张照片，写两句今天做的事，点发布。</span></div>
        <div class="tip-item"><span class="tip-num">02</span><span><strong>怎么给树挂牌？</strong>在“订单”找到待挂牌订单，点“去挂牌”，拍视频发布后会通知认养人。</span></div>
        <div class="tip-item"><span class="tip-num">03</span><span><strong>什么时候能提现？</strong>每周五，最低 10 元，平台免手续费。</span></div>
        <div class="tip-item"><span class="tip-num">04</span><span><strong>不会用怎么办？</strong>联系平台运营，或请家里年轻人帮忙看一眼。</span></div>
      </div>
    `);
  }

  function openEditProfile() {
    openModal({
      title: "编辑农户资料",
      subtitle: "资料会展示在果树详情页，请填写真实信息。",
      body: `
        <form data-form="profile" id="profile-form">
          <div class="field-row">
            <div class="form-field"><label for="profile-name">姓名</label><input class="input" id="profile-name" name="name" value="${esc(state.profile.name)}" required></div>
            <div class="form-field"><label for="profile-age">年龄</label><input class="input" id="profile-age" name="age" type="number" min="18" max="100" value="${state.profile.age}"></div>
          </div>
          <div class="form-field"><label for="profile-orchard">果园名称</label><input class="input" id="profile-orchard" name="orchard" value="${esc(state.profile.orchard)}" required></div>
          <div class="field-row">
            <div class="form-field"><label for="profile-years">种植年限 <span>年</span></label><input class="input" id="profile-years" name="years" type="number" min="1" max="90" value="${state.profile.years}"></div>
            <div class="form-field"><label for="profile-village">所在村</label><input class="input" id="profile-village" name="village" value="${esc(state.profile.village)}"></div>
          </div>
          <div class="form-field"><label for="profile-bio">想对认养人说的话 <span>选填</span></label><textarea class="input" id="profile-bio" name="bio" style="height:80px;padding:10px 12px;resize:vertical" placeholder="果树不会说话，但结的果子会……">果树不会说话，但结的果子会。把每一棵树照顾好，就是我最要紧的事。</textarea></div>
          <div class="modal-foot" style="padding:18px 0 0">
            <button class="btn btn--outline" type="button" data-close>取消</button>
            <button class="btn btn--accent" type="submit">保存资料</button>
          </div>
        </form>
      `
    });
  }

  function openResetConfirm() {
    openModal({
      title: "重新体验演示？",
      subtitle: "这会清空您刚刚发布的动态、订单状态和提现记录。",
      body: `<p style="color:var(--muted);font-size:11px;line-height:1.8">恢复后，工作台将回到初始演示数据：12 笔订单、3 件待办、3 条已发布动态。此操作只影响本机浏览器中的演示数据。</p>`,
      foot: `<button class="btn btn--outline" type="button" data-close>再想想</button><button class="btn btn--danger" type="button" data-action="confirm-reset">恢复初始数据</button>`
    });
  }

  /* ---------- Generic modal / sheet ---------- */

  function openModal({ title, subtitle = "", body = "", foot = "", wide = false, hideHead = false, hideClose = false, centered = true, flush = false }) {
    ui.lastFocused = document.activeElement;
    const overlayClass = `overlay${centered ? " overlay--centered" : ""}`;
    $("#overlay-root").innerHTML = `<div class="${overlayClass}" data-overlay="true">
      <div class="modal ${wide ? "modal--wide" : ""}" role="dialog" aria-modal="true" ${hideHead ? `aria-label="${esc(title || "提示")}"` : `aria-labelledby="modal-title"`} tabindex="-1">
        ${hideHead ? "" : `<div class="modal-head"><div><h2 id="modal-title">${title ? esc(title) : ""}</h2>${subtitle ? `<p>${esc(subtitle)}</p>` : ""}</div>${hideClose ? "" : `<button class="modal-close" type="button" data-close aria-label="关闭">${icon("x")}</button>`}</div>`}
        ${flush ? body : `<div class="modal-body">${body}</div>`}
        ${foot ? `<div class="modal-foot">${foot}</div>` : ""}
      </div>
    </div>`;
    ui.overlayOpen = true;
    document.body.classList.add("is-locked");
    requestAnimationFrame(() => {
      const root = $("#overlay-root");
      const focused = root.querySelector("[autofocus]") || root.querySelector(".modal");
      if (focused) focused.focus({ preventScroll: true });
    });
  }

  function openSheet(content, { className = "", sheet = true } = {}) {
    ui.lastFocused = document.activeElement;
    $("#overlay-root").innerHTML = `<div class="overlay overlay--sheet" data-overlay="true">
      <div class="sheet ${className}" role="dialog" aria-modal="true" tabindex="-1">${content}</div>
    </div>`;
    ui.overlayOpen = true;
    document.body.classList.add("is-locked");
    requestAnimationFrame(() => {
      const root = $("#overlay-root");
      const focused = root.querySelector("[autofocus]") || root.querySelector(".sheet");
      if (focused) focused.focus({ preventScroll: true });
    });
  }

  function closeOverlay(silent = false) {
    if (!ui.overlayOpen && !$("#overlay-root").innerHTML) return;
    window.clearTimeout(ui.chatAutoReplyTimer);
    ui.chatAutoReplyTimer = null;
    clearLiveTimers();
    ui.liveActive = false;
    $("#overlay-root").innerHTML = "";
    ui.overlayOpen = false;
    document.body.classList.remove("is-locked");
    if (!silent && ui.lastFocused instanceof HTMLElement) {
      try { ui.lastFocused.focus({ preventScroll: true }); } catch (error) { /* noop */ }
    }
    ui.lastFocused = null;
  }

  /* ---------- Live room ---------- */

  function clearLiveTimers() {
    ui.liveTimers.forEach((timer) => {
      window.clearInterval(timer);
      window.clearTimeout(timer);
    });
    ui.liveTimers = [];
  }

  function openLiveRoom() {
    ui.lastFocused = document.activeElement;
    $("#overlay-root").innerHTML = `<div class="live-room" role="dialog" aria-modal="true" aria-label="演示直播间" tabindex="-1">
      <div class="live-room-bg"></div>
      <div class="live-room-top">
        <div class="live-room-brand">
          <span class="live-room-live"><span class="live-dot"></span>直播中</span>
          <span class="live-room-viewers">${icon("eye")}<span id="live-viewers">214</span> 人在看 · <span id="live-duration">00:00</span></span>
        </div>
        <div style="display:flex;gap:7px;align-items:center">
          <span class="pill pill--ghost" style="font-size:8px">演示直播间</span>
          <button class="live-room-close" type="button" data-action="live-end" aria-label="结束直播">${icon("x")}</button>
        </div>
      </div>
      <div class="live-demo-watermark">${icon("video")}示例画面 · 正式版接入现场直播</div>
      <div class="live-room-middle">
        <div class="live-room-comments" id="live-comments">
          <div class="live-comment"><strong>晓龙</strong><span>阿姨好，8号树的木牌挂上了吗？</span></div>
          <div class="live-comment"><strong>林小雨</strong><span>今年果子看着好甜！</span></div>
        </div>
        <aside class="live-product">
          <img src="assets/fruit-close.webp" alt="春见耙耙柑">
          <div class="live-product-copy">
            <small>认养套餐</small>
            <strong>团结村 8 号树</strong>
            <span>¥398/年 <button type="button" data-action="live-explain">讲解</button></span>
          </div>
        </aside>
      </div>
      <div class="live-room-bottom">
        <p class="live-room-title"><strong>果园夜话 · 第12期</strong>　给8号树系上第一根红绳</p>
        <div class="live-room-controls">
          <form class="live-chat-input" data-form="live-chat">
            <input name="message" id="live-chat-input" autocomplete="off" placeholder="和直播间的认养人说点什么…" aria-label="直播评论">
            <button type="submit" aria-label="发送评论">${icon("send")}</button>
          </form>
          <button class="live-round-btn" type="button" data-action="live-flip" aria-label="切换镜头">${icon("camera")}</button>
          <button class="live-end-btn" type="button" data-action="live-end">${icon("x")}结束</button>
        </div>
      </div>
    </div>`;
    ui.overlayOpen = true;
    ui.liveActive = true;
    document.body.classList.add("is-locked");
    const start = Date.now();
    const duration = $("#live-duration");
    const viewers = $("#live-viewers");
    const comments = $("#live-comments");
    const liveComments = [
      ["周雨桐", "给小朋友的那棵树也拍一下呀"],
      ["苏念", "到校自提是12月21日吗？"],
      ["张一诺", "阿姨注意保暖～"],
      ["陈予安", "这棵树我认领啦！"],
      ["何佳", "木牌写得真好"]
    ];
    let viewerCount = 214;
    let commentIndex = 0;
    const durationTimer = window.setInterval(() => {
      const seconds = Math.floor((Date.now() - start) / 1000);
      if (duration) duration.textContent = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
    }, 1000);
    const viewerTimer = window.setInterval(() => {
      viewerCount += randomBetween(0, 3);
      if (viewers) viewers.textContent = String(viewerCount);
    }, 6000);
    const commentTimer = window.setInterval(() => {
      if (!comments) return;
      const [name, text] = liveComments[commentIndex % liveComments.length];
      commentIndex += 1;
      comments.insertAdjacentHTML("beforeend", `<div class="live-comment"><strong>${esc(name)}</strong><span>${esc(text)}</span></div>`);
      while (comments.children.length > 6) comments.removeChild(comments.firstElementChild);
      comments.scrollTop = comments.scrollHeight;
    }, 7000);
    ui.liveTimers.push(durationTimer, viewerTimer, commentTimer);
    requestAnimationFrame(() => {
      const room = $(".live-room");
      if (room) room.focus({ preventScroll: true });
    });
  }

  function endLiveRoom() {
    if (!ui.liveActive) {
      closeOverlay();
      return;
    }
    const durationText = $("#live-duration")?.textContent || "00:14";
    const viewersText = $("#live-viewers")?.textContent || "214";
    clearLiveTimers();
    ui.liveActive = false;
    $("#overlay-root").innerHTML = "";
    ui.overlayOpen = false;
    document.body.classList.remove("is-locked");
    openModal({
      title: "",
      hideHead: true,
      hideClose: true,
      centered: true,
      flush: true,
      body: `<div class="success-view">
        <span class="success-mark">${icon("check")}</span>
        <h2>今晚的直播辛苦了</h2>
        <p>果园夜话第12期已结束，回放会在剪辑后同步到田埂日记。</p>
        <div class="receipt-box">
          <div class="receipt-row"><span>本场时长</span><strong>${esc(durationText)}</strong></div>
          <div class="receipt-row"><span>累计观看</span><strong>${esc(viewersText)} 人</strong></div>
          <div class="receipt-row"><span>新增预约</span><strong>+8 人</strong></div>
        </div>
        <button class="btn btn--block" type="button" data-close style="margin-top:17px">回到直播助手</button>
      </div>`
    });
    toast("直播已结束，回放正在生成", "success");
  }

  function sendLiveComment(text) {
    const value = String(text || "").trim();
    if (!value) return;
    const comments = $("#live-comments");
    if (!comments) return;
    comments.insertAdjacentHTML("beforeend", `<div class="live-comment is-self"><strong>周桂芳</strong><span>${esc(value)}</span></div>`);
    while (comments.children.length > 6) comments.removeChild(comments.firstElementChild);
    comments.scrollTop = comments.scrollHeight;
    const input = $("#live-chat-input");
    if (input) {
      input.value = "";
      input.focus({ preventScroll: true });
    }
  }

  /* ---------- Toast ---------- */

  function toast(message, tone = "default") {
    if (!message) return;
    const root = $("#toast-root");
    const node = document.createElement("div");
    node.className = `toast ${tone === "success" ? "toast--success" : ""}`;
    node.innerHTML = `${icon(tone === "success" ? "check" : "info")}<span>${esc(message)}</span>`;
    root.appendChild(node);
    while (root.children.length > 3) root.removeChild(root.firstElementChild);
    window.setTimeout(() => {
      node.classList.add("is-leaving");
      window.setTimeout(() => node.remove(), 240);
    }, 3000);
  }

  /* ---------- Event handling ---------- */

  function setDraftType(type) {
    if (!TYPE_META[type]) return;
    if (!state.draft.dirty || !state.draft.text.trim()) {
      state.draft.text = DRAFT_TEMPLATES[type];
      state.draft.dirty = false;
    }
    state.draft.type = type;
    state.draft.contextTree = null;
    saveState();
    renderPage({ preserveScroll: true });
  }

  function publishDraft() {
    const text = state.draft.text.trim();
    if (!text) {
      toast("先写两句今天的果园吧");
      const textarea = $("#draft-text");
      if (textarea) textarea.focus();
      return;
    }
    const type = state.draft.type;
    const media = state.draft.media.filter((item) => safeMediaSrc(item.src));
    const audienceLabel = state.draft.audience === "adopters" ? "认养人可见" : "所有人可见";
    const post = {
      id: `p${Date.now()}`,
      type,
      author: "周桂芳",
      time: "刚刚",
      text,
      media,
      likes: 0,
      comments: 0,
      audience: audienceLabel,
      reach: state.draft.audience === "adopters" ? "12 位认养人" : "公开"
    };
    const wasSignTask = state.draft.contextTree === "t8";
    state.posts.unshift(post);
    state.posts = state.posts.slice(0, 12);
    ui.lastPublished = post.id;
    state.draft = {
      type: "growth",
      text: "",
      media: [],
      audience: "adopters",
      dirty: false,
      contextTree: null
    };
    if (wasSignTask) completeTask("sign8", false);
    saveState();
    renderPage({ preserveScroll: true });
    toast(wasSignTask ? "发布成功 · 8号树挂牌任务已完成" : "发布成功，已推送给 12 位认养人", "success");
  }

  function advanceOrder(orderId) {
    const order = state.orders.find((item) => item.id === orderId);
    if (!order) return;
    let next = null;
    if (order.status === "pending") next = "shipping";
    if (order.status === "shipping") next = "done";
    if (!next) {
      if (order.status === "sign") {
        closeOverlay(true);
        navigate("feed", { contextTree: "t8", focus: "composer" });
      }
      return;
    }
    order.status = next;
    const tree = getTree(order.treeId);
    if (tree && next === "done") tree.phase = "已采摘";
    if (tree && next === "shipping") tree.phase = "已采摘";
    saveState();
    closeOverlay(true);
    renderPage({ preserveScroll: true });
    toast(next === "shipping" ? "已标记采摘，认养人已收到通知" : "已安排发货，交付完成", "success");
  }

  function handleClick(event) {
    const closeTarget = event.target.closest("[data-close]");
    if (closeTarget) {
      closeOverlay();
      return;
    }
    const overlay = event.target.closest("[data-overlay]");
    if (overlay && event.target === overlay) {
      closeOverlay();
      return;
    }

    const routeTarget = event.target.closest("[data-route]");
    if (routeTarget) {
      if (routeTarget.tagName === "A" || routeTarget.closest("a")) {
        const anchor = routeTarget.tagName === "A" ? routeTarget : routeTarget.closest("a");
        if (anchor && anchor.getAttribute("href") && !anchor.getAttribute("href").startsWith("#")) {
          return;
        }
        event.preventDefault();
      }
      const route = routeTarget.dataset.route;
      const focus = routeTarget.dataset.focus || null;
      closeOverlay(true);
      navigate(route, { focus });
      return;
    }

    const target = event.target.closest("[data-action]");
    if (!target) return;
    const action = target.dataset.action;
    const id = target.dataset.id;
    const person = target.dataset.person;

    switch (action) {
      case "back":
        navigate(ui.returnRoute || "home");
        break;
      case "notifications":
        openNotifications();
        break;
      case "mark-notifications-read":
        state.notifRead = true;
        saveState();
        closeOverlay(true);
        renderPage({ preserveScroll: true });
        openNotifications();
        toast("都读完了，园子里的事记在心上了", "success");
        break;
      case "notification-go":
        state.notifRead = true;
        saveState();
        closeOverlay(true);
        navigate(target.dataset.target || "home");
        break;
      case "open-chat":
        openChat(person);
        break;
      case "chat-quick":
        sendChatMessage($(".chat-composer")?.dataset.person || "晓龙", target.dataset.text);
        break;
      case "chat-voice": {
        const personName = $(".chat-composer")?.dataset.person || "晓龙";
        const line = VOICE_LINES[Math.floor(Math.random() * VOICE_LINES.length)];
        sendChatMessage(personName, line);
        toast("语音已转成文字发给认养人", "success");
        break;
      }
      case "toggle-task": {
        const task = state.tasks.find((item) => item.id === id);
        if (!task) break;
        task.done = !task.done;
        saveState();
        renderPage({ preserveScroll: true });
        if (task.done) toast("这件事已经记在小本本上了", "success");
        break;
      }
      case "task-sign":
        navigate("feed", { contextTree: "t8", focus: "composer" });
        break;
      case "task-yield":
        openTreeModal("t9");
        break;
      case "task-withdraw":
        openWithdraw();
        break;
      case "draft-type":
        setDraftType(target.dataset.type);
        break;
      case "set-audience":
        state.draft.audience = target.dataset.audience === "all" ? "all" : "adopters";
        saveState();
        renderPage({ preserveScroll: true });
        break;
      case "pick-media":
        $("#media-input")?.click();
        break;
      case "pick-default-media":
        state.draft.media = [{ src: "assets/orchard-wide.webp", kind: "image" }];
        state.draft.dirty = true;
        saveState();
        renderPage({ preserveScroll: true });
        toast("已放入一张果园实拍");
        break;
      case "remove-media":
        state.draft.media.splice(Number(target.dataset.index), 1);
        state.draft.dirty = true;
        saveState();
        renderPage({ preserveScroll: true });
        break;
      case "ai-write": {
        const button = target;
        if (button.disabled) break;
        button.disabled = true;
        button.textContent = "正在写…";
        window.setTimeout(() => {
          state.draft.text = AI_DRAFTS[state.draft.type] || AI_DRAFTS.growth;
          state.draft.dirty = true;
          saveState();
          if (currentRoute() === "feed") renderPage({ preserveScroll: true });
          toast("写好了，您看看像不像您说的话", "success");
        }, 900);
        break;
      }
      case "voice-input": {
        if (target.classList.contains("is-recording")) break;
        const label = target.querySelector(".voice-label");
        const previous = label ? label.textContent : "";
        target.classList.add("is-recording");
        if (label) label.textContent = "正在听…";
        window.setTimeout(() => {
          target.classList.remove("is-recording");
          if (label) label.textContent = previous || "按住说话";
          const line = VOICE_LINES[Math.floor(Math.random() * VOICE_LINES.length)];
          state.draft.text = state.draft.text.trim() ? `${state.draft.text}\n${line}` : line;
          state.draft.dirty = true;
          saveState();
          if (currentRoute() === "feed") renderPage({ preserveScroll: true });
          toast("语音已转成文字，可以接着改", "success");
        }, 1100);
        break;
      }
      case "publish":
        publishDraft();
        break;
      case "filter-orders":
        ui.orderFilter = target.dataset.filter || "all";
        renderPage({ preserveScroll: true });
        break;
      case "filter-trees":
        ui.treeFilter = target.dataset.filter || "all";
        renderPage({ preserveScroll: true });
        break;
      case "view-order":
        if (id) orderDetailModal(id);
        break;
      case "advance-order":
        advanceOrder(id);
        break;
      case "order-go-sign":
        closeOverlay(true);
        navigate("feed", { contextTree: "t8", focus: "composer" });
        break;
      case "message-order":
        closeOverlay(true);
        if (id) {
          const order = state.orders.find((item) => item.id === id);
          if (order) openChat(order.adopter);
        }
        break;
      case "open-withdraw":
        openWithdraw();
        break;
      case "fill-withdraw": {
        const input = $("#withdraw-amount");
        if (input) {
          input.value = target.dataset.amount;
          input.focus();
        }
        break;
      }
      case "edit-tree":
        openTreeModal(id);
        break;
      case "edit-profile":
        openEditProfile();
        break;
      case "open-groupbuy-help":
        openGroupbuyHelp();
        break;
      case "open-agreement-help":
        openAgreementHelp();
        break;
      case "open-logistics-help":
        openLogisticsHelp();
        break;
      case "open-shooting-help":
        openShootingHelp();
        break;
      case "open-update-help":
        openUpdateHelp();
        break;
      case "open-settlement-help":
        openSettlementHelp();
        break;
      case "open-orders-help":
        openOrdersHelp();
        break;
      case "open-contact-help":
        openContactHelp();
        break;
      case "open-help":
        openHelp();
        break;
      case "toggle-setting": {
        const key = target.dataset.setting;
        if (!key) break;
        state.settings[key] = !state.settings[key];
        saveState();
        target.classList.toggle("is-on", state.settings[key]);
        target.setAttribute("aria-checked", String(state.settings[key]));
        break;
      }
      case "reset-demo":
        openResetConfirm();
        break;
      case "confirm-reset":
        try { localStorage.removeItem(STORAGE_KEY); } catch (error) { /* noop */ }
        state = defaultState();
        ui.orderFilter = "all";
        ui.treeFilter = "all";
        ui.lastPublished = null;
        ui.returnRoute = "home";
        closeOverlay(true);
        navigate("home");
        toast("演示数据已恢复", "success");
        break;
      case "live-start":
        openLiveRoom();
        break;
      case "live-end":
        endLiveRoom();
        break;
      case "live-explain":
        toast("已把8号树的认养卡片推到直播间");
        break;
      case "live-flip":
        toast("演示版暂不支持切换镜头");
        break;
      case "close-overlay":
        closeOverlay();
        break;
      case "live-replay":
        openInfoModal("直播回放 · 第11期", "果园夜话：冬天的第一口甜", `
          <p style="color:var(--muted);font-size:11px;line-height:1.8">回放已同步到田埂日记，认养人可以随时观看。正式版将支持把回放片段剪成短视频，一键发布到抖音、小红书和视频号。</p>
          <div class="wallet-note" style="margin-top:12px">${icon("info")}演示版仅展示入口，不包含真实视频文件。</div>
        `);
        break;
      default:
        break;
    }
  }

  function handleInput(event) {
    if (event.target.id !== "draft-text") return;
    state.draft.text = event.target.value;
    state.draft.dirty = true;
    const count = $("#char-count");
    if (count) count.textContent = `${event.target.value.length} / 220`;
    const preview = $("#preview-caption");
    if (preview) {
      preview.textContent = event.target.value.trim() || "写两句今天果园里发生的事，认养人正等着听。";
      preview.classList.toggle("is-empty", !event.target.value.trim());
    }
    saveState();
  }

  function handleChange(event) {
    if (event.target.id !== "media-input") return;
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    files.slice(0, Math.max(0, 3 - state.draft.media.length)).forEach((file) => {
      const isVideo = file.type.startsWith("video/");
      const isImage = file.type.startsWith("image/");
      if (!isVideo && !isImage) return;
      state.draft.media.push({
        src: URL.createObjectURL(file),
        kind: isVideo ? "video" : "image",
        name: file.name
      });
    });
    state.draft.dirty = true;
    saveState();
    event.target.value = "";
    renderPage({ preserveScroll: true });
    toast("素材已放进动态");
  }

  function handleSubmit(event) {
    const form = event.target.closest("[data-form]");
    if (!form) return;
    event.preventDefault();
    switch (form.dataset.form) {
      case "chat": {
        const input = form.elements.message;
        sendChatMessage(form.dataset.person, input ? input.value : "");
        break;
      }
      case "live-chat": {
        const input = form.elements.message;
        sendLiveComment(input ? input.value : "");
        break;
      }
      case "withdraw":
        submitWithdraw(form);
        break;
      case "tree":
        submitTreeForm(form);
        break;
      case "profile":
        closeOverlay(true);
        toast("资料已保存，平台将在 1 个工作日内审核", "success");
        break;
      default:
        break;
    }
  }

  function handleKeydown(event) {
    if (event.key === "Escape" && ui.overlayOpen) {
      if (ui.liveActive) endLiveRoom();
      else closeOverlay();
      return;
    }
    if (event.key === "Enter" && event.target.matches("[data-setting][role='switch']")) {
      event.target.click();
      return;
    }
    if (event.key !== "Tab" || !ui.overlayOpen) return;
    const root = $("#overlay-root");
    const focusable = $$('button:not([disabled]), [href], input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])', root)
      .filter((el) => el.offsetParent !== null || el.getClientRects().length);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const onDialog = document.activeElement === root.firstElementChild || document.activeElement?.getAttribute("role") === "dialog";
    if (event.shiftKey && (document.activeElement === first || onDialog)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  /* ---------- Init ---------- */

  function init() {
    hydrateStaticIcons();
    try {
      if (!location.hash) history.replaceState({ route: "home" }, "", "#home");
      if (!PAGE_META[currentRoute()]) history.replaceState({ route: "home" }, "", "#home");
    } catch (error) {
      // Keep the app usable when opened as a local file.
    }
    ui.route = currentRoute();
    renderPage();
  }

  document.addEventListener("click", handleClick);
  document.addEventListener("input", handleInput);
  document.addEventListener("submit", handleSubmit);
  document.addEventListener("change", handleChange);
  document.addEventListener("keydown", handleKeydown);

  init();
})();
