(() => {
  "use strict";

  const STORAGE_KEY = "tianyue.client.v1";
  const TODAY = (() => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${now.getFullYear()}-${month}-${day}`;
  })();

  const MOODS = {
    waiting: {
      label: "等待中",
      quote: "今天也在等你。",
      desc: "一棵树把枝条轻轻偏向你来的方向。"
    },
    happy: {
      label: "开心",
      quote: "你来了，我就安心了。",
      desc: "叶片向上舒展，树冠里藏着细碎的光。"
    },
    shy: {
      label: "初见",
      quote: "我在慢慢认识你。",
      desc: "一棵刚被认养的小树，有一点害羞。"
    },
    sad: {
      label: "想念",
      quote: "很久没见，有一点想你。",
      desc: "枝叶安静地垂下来，但它没有怪你。"
    },
    harvest: {
      label: "收获",
      quote: "我们一起结出的果实，真好看。",
      desc: "树冠被暖橙色果实压弯，是一起走过的季节。"
    }
  };

  const HEART_LINES = [
    "谢谢你把时间分给我。",
    "今天的风很舒服，想分享给你。",
    "你有开心一点吗？",
    "我在慢慢长大，也在慢慢记住你。",
    "你来了，我就安心了。",
    "我们一起结出的果实，真好看。"
  ];

  const QUICK_REPLIES = [
    "娃儿放心，树好着呢。",
    "今天也替你浇了水。",
    "果子又长大了一点。",
    "十二月，等你来园里。"
  ];

  const DEFAULT_STATE = {
    mood: "waiting",
    streak: 9,
    companionship: 23,
    growth: 3,
    growthProgress: 0,
    lastVisit: null,
    messages: []
  };

  const scene = document.querySelector("#treeScene");
  const quote = document.querySelector("#treeQuote");
  const speech = document.querySelector("#treeSpeech");
  const moodPill = document.querySelector("#moodPill");
  const companionBtn = document.querySelector("#companionBtn");
  const companionBtnTitle = document.querySelector("#companionBtnTitle");
  const companionBtnSub = document.querySelector("#companionBtnSub");
  const companionNote = document.querySelector("#companionNote");
  const streakDays = document.querySelector("#streakDays");
  const totalVisits = document.querySelector("#totalVisits");
  const headlineDays = document.querySelector("#headlineDays");
  const growthStage = document.querySelector("#growthStage");
  const growthNote = document.querySelector("#growthNote");
  const growthSteps = Array.from(document.querySelectorAll(".growth-step"));
  const moodButtons = Array.from(document.querySelectorAll(".mood-option"));
  const messageForm = document.querySelector("#messageForm");
  const messageInput = document.querySelector("#messageInput");
  const echoList = document.querySelector("#echoList");
  const sceneParticles = document.querySelector("#sceneParticles");
  const toastNode = document.querySelector("#toast");
  const resetDemo = document.querySelector("#resetDemo");

  const STAGES = ["幼苗", "长叶", "开花", "结果", "繁茂"];
  let state = loadState();
  let toastTimer = 0;
  let quoteTimer = 0;

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (!saved || typeof saved !== "object") return { ...DEFAULT_STATE, messages: [] };
      return {
        ...DEFAULT_STATE,
        ...saved,
        mood: MOODS[saved.mood] ? saved.mood : "waiting",
        messages: Array.isArray(saved.messages) ? saved.messages.slice(-10) : []
      };
    } catch (error) {
      return { ...DEFAULT_STATE, messages: [] };
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      /* The demo remains interactive if storage is unavailable. */
    }
  }

  function doneToday() {
    return state.lastVisit === TODAY;
  }

  function animateSpeech() {
    speech.classList.remove("is-changing");
    // Force a reflow so the short fade-in can replay.
    void speech.offsetWidth;
    speech.classList.add("is-changing");
  }

  function setQuote(text) {
    quote.textContent = text;
    animateSpeech();
  }

  function setMood(mood, { save = true, announce = false } = {}) {
    if (!MOODS[mood]) return;
    state.mood = mood;
    scene.dataset.mood = mood;
    scene.setAttribute("aria-label", `8号树的情绪插画：${MOODS[mood].label}`);
    quote.textContent = MOODS[mood].quote;
    moodPill.innerHTML = `<span class="pill-leaf"></span>${MOODS[mood].label}`;
    moodButtons.forEach((button) => {
      const active = button.dataset.mood === mood;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    document.querySelector("#treeSvgDesc").textContent =
      `一棵没有明显人脸的手绘柑橘树，${MOODS[mood].desc} 当前情绪：${MOODS[mood].label}。`;
    animateSpeech();
    if (save) saveState();
    if (announce) {
      toast(`8号树现在有一点${MOODS[mood].label}`);
    }
  }

  function renderGrowth() {
    const stage = Math.min(Math.max(state.growth, 0), 4);
    growthStage.textContent = String(stage + 1);
    growthSteps.forEach((el, index) => {
      el.classList.toggle("is-past", index < stage);
      el.classList.toggle("is-current", index === stage);
    });
    if (stage >= 4) {
      growthNote.textContent = "它已经长成一棵繁茂大树，等冬天把甜交给你。";
    } else if (state.growthProgress > 0) {
      growthNote.textContent = `再陪它 ${3 - state.growthProgress} 次，就走进“繁茂大树”。`;
    } else {
      growthNote.textContent = "再陪它 3 次，就走进“繁茂大树”。";
    }
  }

  function renderCompanion() {
    const finished = doneToday();
    scene.classList.toggle("has-new-growth", finished);
    streakDays.textContent = String(state.streak);
    totalVisits.textContent = String(state.companionship);
    headlineDays.textContent = String(state.companionship);
    companionBtn.classList.toggle("is-done", finished);
    if (finished) {
      companionBtnTitle.textContent = "今天已经陪过它了";
      companionBtnSub.textContent = "它把你的到来记在年轮里";
      companionNote.textContent = "明天再来，它还会在这里。";
    } else {
      companionBtnTitle.textContent = "来树下坐一会儿";
      companionBtnSub.textContent = "今天还没有见过它";
      companionNote.textContent = "每天来一次，它会记住你。";
    }
    renderGrowth();
  }

  function renderEchoes() {
    if (!echoList) return;
    const recent = state.messages.slice(-4);
    echoList.innerHTML = "";
    if (!recent.length) {
      const empty = document.createElement("div");
      empty.className = "echo-placeholder";
      empty.textContent = "树洞还很安静。说一句，它会听见。";
      echoList.appendChild(empty);
      return;
    }
    recent.forEach((message) => {
      const row = document.createElement("div");
      row.className = `echo-item${message.from === "tree" ? " is-tree" : ""}`;
      const who = document.createElement("strong");
      who.textContent = message.from === "tree" ? "8号树：" : "你：";
      const text = document.createElement("span");
      text.textContent = message.text;
      row.append(who, text);
      echoList.appendChild(row);
    });
  }

  function chooseReply(text) {
    if (text.includes("累") || text.includes("辛苦")) return "今天也辛苦了。风从园子里吹过，我替你收着。";
    if (text.includes("谢谢")) return "谢谢你把时间分给我。";
    if (text.includes("想") || text.includes("好久") || text.includes("忙")) return "我在慢慢长大，也在慢慢记住你。";
    if (text.includes("奶奶") || text.includes("周")) return "周奶奶今天也来给我浇水了。她让我替她谢谢你。";
    if (text.includes("果") || text.includes("甜")) return "果子正在慢慢变黄，等十二月，给你留最甜的那几个。";
    const index = state.messages.length % HEART_LINES.length;
    return HEART_LINES[index];
  }

  function pushMessage(text) {
    const clean = String(text || "").trim().replace(/\s+/g, " ");
    if (!clean) {
      messageInput.focus();
      toast("写一句话再发吧。");
      return;
    }
    const time = new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false });
    state.messages.push({ from: "user", text: clean, time });
    const reply = chooseReply(clean);
    state.messages.push({ from: "tree", text: reply, time });
    state.messages = state.messages.slice(-10);
    saveState();
    renderEchoes();
    setQuote(reply);
    if (state.mood !== "harvest") {
      setMood("happy", { save: true });
      setQuote(reply);
    }
    burst(7, "leaf");
    messageInput.value = "";
    messageInput.focus();
    toast("它听见了，叶子轻轻动了一下。");
  }

  function checkIn() {
    if (doneToday()) {
      setQuote("今天已经见过你啦，再坐一会儿也可以。");
      burst(5, "warm");
      toast("今天已经陪过它了，明天再来吧。");
      return;
    }
    const wasStage = state.growth;
    state.streak += 1;
    state.companionship += 1;
    state.lastVisit = TODAY;
    state.growthProgress += 1;
    if (state.growthProgress >= 3 && state.growth < 4) {
      state.growth += 1;
      state.growthProgress = 0;
    }
    const reachedNewStage = state.growth > wasStage;
    setMood(reachedNewStage ? "harvest" : "happy", { save: false });
    setQuote(reachedNewStage ? "你看，我们一起走到了这里。" : "你来了，我就安心了。");
    renderCompanion();
    saveState();
    burst(15, "mixed");
    scene.classList.add("is-celebrating");
    window.setTimeout(() => scene.classList.remove("is-celebrating"), 1300);
    toast(reachedNewStage ? "陪你走到了新的成长阶段。" : "它把你的到来记在了年轮里。");
  }

  function burst(count = 10, colorMode = "leaf") {
    if (!sceneParticles) return;
    const palettes = {
      leaf: ["#8FB474", "#B8CE8D", "#D4C17A"],
      warm: ["#F4C178", "#E98F52", "#FFF0C7"],
      mixed: ["#F0AF5E", "#9DBB80", "#F7DFA2", "#D77A43"]
    };
    const colors = palettes[colorMode] || palettes.leaf;
    for (let index = 0; index < count; index += 1) {
      const particle = document.createElement("span");
      particle.className = "scene-particle";
      particle.style.setProperty("--x", `${34 + Math.random() * 36}%`);
      particle.style.setProperty("--y", `${35 + Math.random() * 30}%`);
      particle.style.setProperty("--size", `${4 + Math.random() * 7}px`);
      particle.style.setProperty("--color", colors[index % colors.length]);
      particle.style.setProperty("--drift", `${-35 + Math.random() * 70}px`);
      particle.style.setProperty("--rotate", `${-40 + Math.random() * 80}deg`);
      particle.style.animationDelay = `${Math.random() * 0.24}s`;
      sceneParticles.appendChild(particle);
      window.setTimeout(() => particle.remove(), 1900);
    }
  }

  function toast(message) {
    window.clearTimeout(toastTimer);
    toastNode.textContent = message;
    toastNode.classList.add("is-visible");
    toastTimer = window.setTimeout(() => toastNode.classList.remove("is-visible"), 2700);
  }

  function reset() {
    if (!window.confirm("重置后，陪伴天数、心情和树洞留言会恢复到初始演示状态。要继续吗？")) return;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      /* noop */
    }
    state = { ...DEFAULT_STATE, messages: [] };
    renderAll();
    setMood("waiting", { save: false });
    toast("陪伴演示已回到起点。");
  }

  function renderAll() {
    setMood(state.mood, { save: false });
    renderCompanion();
    renderEchoes();
  }

  companionBtn.addEventListener("click", checkIn);

  moodButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const mood = button.dataset.mood;
      setMood(mood, { announce: true });
      if (window.matchMedia("(max-width: 979px)").matches) {
        scene.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      burst(8, mood === "harvest" ? "warm" : "leaf");
    });
  });

  messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    pushMessage(messageInput.value);
  });

  document.querySelectorAll("[data-quick]").forEach((button) => {
    button.addEventListener("click", () => {
      pushMessage(button.dataset.quick);
    });
  });

  scene.addEventListener("click", (event) => {
    if (event.target.closest("button, a, input, textarea")) return;
    scene.classList.remove("is-touched");
    void scene.offsetWidth;
    scene.classList.add("is-touched");
    window.setTimeout(() => scene.classList.remove("is-touched"), 700);
    setQuote(HEART_LINES[Math.floor(Math.random() * HEART_LINES.length)]);
    burst(6, "leaf");
  });

  resetDemo.addEventListener("click", reset);

  renderAll();
})();
