(function () {
  const topbar = document.getElementById("topbar");
  const copyBib = document.getElementById("copyBib");
  const leftSel = document.getElementById("leftModel");
  const rightSel = document.getElementById("rightModel");
  const swapBtn = document.getElementById("swapModels");
  const filters = document.getElementById("galleryFilters");
  const filterHint = document.getElementById("filterHint");
  const presets = document.getElementById("pairPresets");
  const root = document.getElementById("gallery-root");

  let manifest = null;
  let activeFilter = "all";
  let leftId = "opus";
  let rightId = "h3";

  window.addEventListener("scroll", () => {
    topbar.classList.toggle("is-scrolled", window.scrollY > 8);
  }, { passive: true });


  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function observeReveals(scope) {
    const rootScope = scope || document;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      rootScope.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.08 });
    rootScope.querySelectorAll(".reveal:not(.is-in)").forEach((el) => io.observe(el));
  }
  observeReveals(document);
  if ("IntersectionObserver" in window) {
    const navMap = {};
    document.querySelectorAll('.nav a[href^="#"]').forEach((a) => {
      navMap[a.getAttribute("href").slice(1)] = a;
    });
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const id = en.target.id;
        Object.keys(navMap).forEach((k) => {
          if (k === id) navMap[k].setAttribute("aria-current", "true");
          else navMap[k].removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-28% 0px -62% 0px" });
    Object.keys(navMap).forEach((id) => {
      const el = document.getElementById(id);
      if (el) spy.observe(el);
    });
  }

  copyBib.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(document.getElementById("bibtex").textContent);
      copyBib.textContent = "Copied";
      setTimeout(() => { copyBib.textContent = "Copy BibTeX"; }, 1200);
    } catch (e) { copyBib.textContent = "Select & copy"; }
  });

  function esc(s) {
    return String(s ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }
  function modelMeta(id) {
    return (manifest.models || []).find((m) => m.id === id) || { id, label: id, short: id };
  }
  function fillSelects() {
    const opts = (manifest.models || []).map((m) =>
      `<option value="${esc(m.id)}">${esc(m.label)}</option>`
    ).join("");
    leftSel.innerHTML = opts;
    rightSel.innerHTML = opts;
    leftId = manifest.default_left || "opus";
    rightId = manifest.default_right || "h3";
    leftSel.value = leftId;
    rightSel.value = rightId;
  }
  function fillFilters() {
    const defs = manifest.filters || [];
    filters.innerHTML = defs.map((f, i) =>
      `<button class="chip${i === 0 ? " active" : ""}" data-filter="${esc(f.id)}" data-hint="${esc(f.hint || "")}" type="button">${esc(f.label)}</button>`
    ).join("");
    activeFilter = (defs[0] && defs[0].id) || "all";
    if (filterHint) filterHint.textContent = "";
    if (filterHint) filterHint.style.display = "none";
  }
  function fmtScore(x) {
    if (x == null) return "—";
    if (typeof x === "boolean") return x ? "1" : "0";
    const n = Number(x);
    if (Number.isNaN(n)) return String(x);
    return Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100);
  }
  function yesNo(x) {
    if (x == null) return "—";
    return x ? "✓" : "✗";
  }
  function passFail(passed) {
    if (passed == null) return "";
    return passed ? "pass" : "fail";
  }
  function prefLabel(p) {
    if (!p) return "—";
    if (p === "code_better") return "prefer code-render";
    if (p === "h3_better") return "prefer H3";
    if (p === "comparable") return "about equal";
    return p.replaceAll("_", " ");
  }
  function styleLabel(s) {
    if (!s) return "—";
    return s;
  }
  function judgePair(solLike) {
    return solLike || { code: null, h3: null };
  }
  function buildSummary(c) {
    const s = c.scores || {};
    const vb = s.vbench || {};
    const hu = s.human || {};
    const sol = judgePair(s.vlm_sol);
    const son = judgePair(s.vlm_sonnet);
    const cs = sol.code || {};
    const hs = sol.h3 || {};
    const bits = [];
    if (hu.code_done != null && hu.h3_done != null && hu.code_done !== hu.h3_done) {
      bits.push(`Humans: code-render ${hu.code_done ? "completes" : "fails"}, H3 ${hu.h3_done ? "completes" : "fails"}.`);
    } else if (hu.code_done != null && hu.h3_done != null) {
      if (hu.code_done && hu.h3_done) bits.push("Humans: both complete.");
      else if (!hu.code_done && !hu.h3_done) bits.push("Humans: neither completes.");
    } else if (hu.code_done != null) {
      bits.push(`Humans: code-render ${hu.code_done ? "completes" : "fails"}.`);
    }
    if (vb.code != null && vb.h3 != null) {
      if (Number(vb.code) < Number(vb.h3)) bits.push(`VBench native scores the opposite way (code ${fmtScore(vb.code)} < H3 ${fmtScore(vb.h3)}).`);
      else if (Number(vb.code) > Number(vb.h3)) bits.push(`VBench native favors code-render (${fmtScore(vb.code)} > H3 ${fmtScore(vb.h3)}).`);
      else bits.push(`VBench native ties them (${fmtScore(vb.code)}).`);
    }
    if (cs.passed != null && hs.passed != null) {
      if (cs.passed && hs.passed) bits.push("GPT-6.1-Sol accepts both.");
      else if (!cs.passed && !hs.passed) bits.push("GPT-6.1-Sol rejects both.");
      else bits.push(`GPT-6.1-Sol accepts ${cs.passed ? "code-render" : "H3"} only.`);
    }
    const sc = son.code || {};
    const sh = son.h3 || {};
    if (sc.passed != null && sh.passed != null) {
      if (sc.passed && sh.passed) bits.push("Claude Sonnet 5.5 accepts both.");
      else if (!sc.passed && !sh.passed) bits.push("Claude Sonnet 5.5 rejects both.");
      else bits.push(`Claude Sonnet 5.5 accepts ${sc.passed ? "code-render" : "H3"} only.`);
    }
    if (hu.visual_pref) bits.push(`Look: ${prefLabel(hu.visual_pref)}.`);
    if (hu.code_style_tier) bits.push(`Code animation style: ${styleLabel(hu.code_style_tier)}.`);
    return bits.join(" ");
  }
  function scoreBlock(c) {
    const s = c.scores || {};
    const vb = s.vbench || {};
    const hu = s.human || {};
    const sol = judgePair(s.vlm_sol);
    const son = judgePair(s.vlm_sonnet);
    const cs = sol.code || {};
    const hs = sol.h3 || {};
    const sc = son.code || {};
    const sh = son.h3 || {};
    const summary = buildSummary(c);
    const rSolC = c.reason_sol_code || c.reason_code || "";
    const rSolH = c.reason_sol_h3 || c.reason_h3 || "";
    const rSonC = c.reason_sonnet_code || "";
    const rSonH = c.reason_sonnet_h3 || "";
    const closed = [
      `VB ${fmtScore(vb.code)}/${fmtScore(vb.h3)}`,
      (hu.code_done != null || hu.h3_done != null) ? `Human ${yesNo(hu.code_done)}/${yesNo(hu.h3_done)}` : null,
      (cs.score != null || hs.score != null) ? `GPT-6.1-Sol ${fmtScore(cs.score)}/${fmtScore(hs.score)}` : null,
      (sc.score != null || sh.score != null) ? `Claude Sonnet 5.5 ${fmtScore(sc.score)}/${fmtScore(sh.score)}` : null,
    ].filter(Boolean).join(" · ");
    return `
      <details class="score-disclosure">
        <summary>
          <span>Scores & analysis</span>
          <span class="sum-meta">${esc(closed)}</span>
          <span class="chev">▾</span>
        </summary>
        <div class="score-stack">
          <div class="score-note">Scores are for the matched <strong>code-render vs MiniMax-H3</strong> pair (same prompt), not whichever models you put left/right.</div>
          ${summary ? `<div class="score-summary">${esc(summary)}</div>` : ""}
          <table class="score-table">
            <thead>
              <tr><th></th><th>Code-render</th><th>MiniMax-H3</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Task done? <span class="dim">(human)</span></td>
                <td>${esc(yesNo(hu.code_done))}</td>
                <td>${esc(yesNo(hu.h3_done))}</td>
              </tr>
              <tr>
                <td>VBench native</td>
                <td>${esc(fmtScore(vb.code))}</td>
                <td>${esc(fmtScore(vb.h3))}</td>
              </tr>
              <tr>
                <td>GPT-6.1-Sol <span class="dim">(8-frame)</span></td>
                <td>${esc(fmtScore(cs.score))}${cs.passed == null ? "" : ` · ${esc(passFail(cs.passed))}`}</td>
                <td>${esc(fmtScore(hs.score))}${hs.passed == null ? "" : ` · ${esc(passFail(hs.passed))}`}</td>
              </tr>
              <tr>
                <td>Claude Sonnet 5.5 <span class="dim">(8-frame)</span></td>
                <td>${esc(fmtScore(sc.score))}${sc.passed == null ? "" : ` · ${esc(passFail(sc.passed))}`}</td>
                <td>${esc(fmtScore(sh.score))}${sh.passed == null ? "" : ` · ${esc(passFail(sh.passed))}`}</td>
              </tr>
            </tbody>
          </table>
          <div class="score-meta">
            <div>Visual preference: <strong>${esc(prefLabel(hu.visual_pref))}</strong></div>
            <div>Code animation style: <strong>${esc(styleLabel(hu.code_style_tier))}</strong></div>
          </div>
          ${(rSolC || rSolH) ? `
            <div class="line"><strong>Why GPT-6.1-Sol said that</strong></div>
            ${rSolC ? `<div class="reason"><span class="who">Code-render:</span> ${esc(rSolC)}</div>` : ""}
            ${rSolH ? `<div class="reason"><span class="who">H3:</span> ${esc(rSolH)}</div>` : ""}
          ` : ""}
          ${(rSonC || rSonH) ? `
            <div class="line"><strong>Why Claude Sonnet 5.5 said that</strong></div>
            ${rSonC ? `<div class="reason"><span class="who">Code-render:</span> ${esc(rSonC)}</div>` : ""}
            ${rSonH ? `<div class="reason"><span class="who">H3:</span> ${esc(rSonH)}</div>` : ""}
          ` : ""}
        </div>
      </details>`;
  }
  function wireCard(card) {
    const frame = card.querySelector(".split-frame");
    const left = frame.querySelector(".pane.left");
    const right = frame.querySelector(".pane.right");
    const vL = left.querySelector("video");
    const vR = right.querySelector("video");
    const splitBtn = card.querySelector("[data-action='split']");
    const setMode = (mode) => {
      frame.dataset.mode = mode;
      frame.classList.toggle("is-interacting", mode !== "split");
      playCard(card, true);
    };
    left.addEventListener("click", () => setMode((frame.dataset.mode || "split") === "left" ? "split" : "left"));
    right.addEventListener("click", () => setMode((frame.dataset.mode || "split") === "right" ? "split" : "right"));
    splitBtn.addEventListener("click", () => setMode("split"));
    vL.addEventListener("timeupdate", () => {
      if ((frame.dataset.mode || "split") !== "split") return;
      if (Math.abs(vL.currentTime - vR.currentTime) > 0.35) vR.currentTime = vL.currentTime;
    });
    [vL, vR].forEach((v) => { v.muted = true; v.loop = true; v.playsInline = true; v.preload = "none"; });
  }
  function attachSrc(video) {
    if (video.dataset.attached === video.dataset.src) return;
    video.dataset.attached = video.dataset.src;
    video.classList.remove("ready");
    video.preload = "auto";
    video.src = video.dataset.src;
    const show = () => video.classList.add("ready");
    video.addEventListener("loadeddata", show, { once: true });
    video.addEventListener("playing", show, { once: true });
  }
  const startQueue = [];
  let starting = 0;
  function pumpQueue() {
    while (starting < 6 && startQueue.length) {
      const video = startQueue.shift();
      starting++;
      attachSrc(video);
      const release = () => {
        if (video.dataset.released === video.dataset.src) return;
        video.dataset.released = video.dataset.src;
        starting--;
        pumpQueue();
      };
      video.addEventListener("loadeddata", release, { once: true });
      video.addEventListener("error", release, { once: true });
      video.play().catch(() => {});
    }
  }
  function enqueue(video, first) {
    if (!video || !video.dataset.src) return;
    if (video.getAttribute("src") === video.dataset.src) { video.play().catch(() => {}); return; }
    const i = startQueue.indexOf(video);
    if (i >= 0) startQueue.splice(i, 1);
    if (first) startQueue.unshift(video); else startQueue.push(video);
    pumpQueue();
  }
  function playCard(card, first) {
    const frame = card.querySelector(".split-frame");
    const [left, right] = card.querySelectorAll("video");
    const mode = frame.dataset.mode || "split";
    const active = mode === "left" ? [left] : mode === "right" ? [right] : [left, right];
    [left, right].forEach((video) => { if (!active.includes(video)) video.pause(); });
    active.forEach((video) => enqueue(video, first));
  }
  let galleryObserver = null;
  function observeGallery() {
    if (galleryObserver) galleryObserver.disconnect();
    const cards = [...root.querySelectorAll(".compare-card")];
    galleryObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) playCard(entry.target, true); });
    }, { rootMargin: "240px 0px", threshold: 0.01 });
    cards.forEach((card) => galleryObserver.observe(card));
    cards.slice(0, 2).forEach((card) => playCard(card, true));
  }
  function bucketTag(bucket) {
    if (bucket === "bucket2_code_low_h3_high") return "VB code↓ H3↑";
    if (bucket === "bucket3_code_high_h3_low") return "VB code↑ H3↓";
    if (bucket === "bucket1_both_high") return "VB both high";
    return bucket || "matched";
  }
  function render() {
    if (!manifest) return;
    const L = modelMeta(leftId);
    const R = modelMeta(rightId);
    const cases = (manifest.cases || []).filter((c) => {
      if (!(c.videos && c.videos[leftId] && c.videos[rightId])) return false;
      if (activeFilter === "all") return true;
      return (c.tags || []).includes(activeFilter);
    });
    if (!cases.length) {
      root.innerHTML = `<div class="empty">No clips for this pair/filter (${cases.length} shown).</div>`;
      observeReveals(root);
      return;
    }
    root.innerHTML = cases.map((c) => `
      <article class="compare-card">
        <div class="compare-head">
          <h3>${esc(c.topic || c.prompt)}</h3>
          <span class="mini-tag">${esc(c.dimension || "matched")}</span>
          <span class="mini-tag soft">${esc(bucketTag(c.bucket))}</span>
          <span class="mini-tag soft">${esc(L.short)} vs ${esc(R.short)}</span>
        </div>
        <div class="split-frame" data-mode="split">
          <div class="pane left">
            <video muted loop playsinline data-src="${esc(c.videos[leftId])}"></video>
            <span class="pane-label">${esc(L.label)}</span>
          </div>
          <div class="pane right">
            <video muted loop playsinline data-src="${esc(c.videos[rightId])}"></video>
            <span class="pane-label">${esc(R.label)}</span>
          </div>
          <div class="divider"></div>
          <div class="prompt-overlay">
            <div class="prompt-eyebrow">Shared prompt</div>
            <p class="prompt-text">${esc(c.prompt || "")}</p>
          </div>
          <div class="hint">Hover for prompt · click a half to expand</div>
        </div>
        <div class="compare-foot">
          ${scoreBlock(c)}
          <button class="ghost-btn" data-action="split" type="button">Split view</button>
        </div>
      </article>
    `).join("");
    root.querySelectorAll(".compare-card").forEach(wireCard);
    observeGallery();
    const gallerySec = document.getElementById("gallery");
    if (gallerySec) gallerySec.classList.add("is-in");
  }
  function setPair(l, r, fromPreset) {
    if (l === r) return;
    leftId = l; rightId = r;
    leftSel.value = leftId;
    rightSel.value = rightId;
    presets.querySelectorAll(".chip").forEach((c) => {
      c.classList.toggle("active", fromPreset && c.dataset.left === l && c.dataset.right === r);
    });
    render();
  }
  leftSel.addEventListener("change", () => {
    if (leftSel.value === rightSel.value) { leftSel.value = leftId; return; }
    setPair(leftSel.value, rightSel.value, false);
  });
  rightSel.addEventListener("change", () => {
    if (rightSel.value === leftSel.value) { rightSel.value = rightId; return; }
    setPair(leftSel.value, rightSel.value, false);
  });
  swapBtn.addEventListener("click", () => setPair(rightId, leftId, false));
  presets.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    setPair(btn.dataset.left, btn.dataset.right, true);
  });
  filters.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    activeFilter = btn.dataset.filter;
    filters.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c === btn));
    if (filterHint) { filterHint.textContent = ""; filterHint.style.display = "none"; }
    render();
  });
  fetch("./gallery_cases.json")
    .then((r) => r.json())
    .then((data) => { manifest = data; fillSelects(); fillFilters(); render(); })
    .catch((err) => {
      root.innerHTML = `<div class="empty">Failed to load gallery_cases.json (${esc(err)})</div>`;
      observeReveals(root);
    });
})();
