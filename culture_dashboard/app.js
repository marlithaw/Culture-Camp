/* ============================================================================
   culture_dashboard/app.js — Matchbook Culture Camp & BOY Build Tracker (board view)
   ----------------------------------------------------------------------------
   Vanilla-JS port of the React/JSX design prototype (board.jsx / detail.jsx /
   app.jsx). Written in plain JS to match this site's existing convention — the
   live tracker (live_tracker.html) is also dependency-free vanilla JS — so the
   dashboard ships with no React, no Babel-in-the-browser, and no build step.

   DATA: this board reads the SAME data the existing tracker reads. See
   loadData() below and the header of culture_dashboard/data.js for the full
   rationale and the path to fully unifying the two sources.
   ============================================================================ */
(function () {
  "use strict";

  /* ----------------------------- data loading ----------------------------- */

  // Load the dashboard's data from the tracker's own source, in priority order.
  // 1) the tracker's inline <script id="data"> blob (its actual runtime source),
  // 2) sessions.json (a standalone, currently-identical copy),
  // 3) the bundled offline snapshot (window.MB_DATA from data.js).
  async function loadData() {
    // 1) The tracker's own runtime data source — guarantees zero drift.
    try {
      const res = await fetch("live_tracker.html", { cache: "no-cache" });
      if (res.ok) {
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, "text/html");
        const el = doc.getElementById("data");
        if (el && el.textContent.trim()) {
          return { data: JSON.parse(el.textContent), source: "live tracker" };
        }
      }
    } catch (e) { /* fall through to next source */ }

    // 2) Standalone sessions.json (deep-equal copy of the tracker blob).
    try {
      const res = await fetch("sessions.json", { cache: "no-cache" });
      if (res.ok) {
        return { data: await res.json(), source: "sessions.json" };
      }
    } catch (e) { /* fall through to fallback */ }

    // 3) Offline fallback: bundled static snapshot.
    if (window.MB_DATA) {
      return { data: window.MB_DATA, source: "bundled snapshot (offline fallback)" };
    }
    throw new Error("No Culture Dashboard data source could be loaded.");
  }

  // Bridge the tracker's data shape to the shape the board expects.
  // The tracker cards lack `day1Built` / `builtAt`; derive them (or pass through
  // if the source already provides them, e.g. the bundled snapshot).
  function normalizeCard(c) {
    var day1Built = (typeof c.day1Built === "boolean")
      ? c.day1Built
      : (c.view === "student" && c.col === "Day 1" && c.status === "Built");
    var builtAt = day1Built ? (c.builtAt || "Culture Camp · Day 1") : (c.builtAt || null);
    var out = Object.assign({}, c, { day1Built: day1Built, builtAt: builtAt });
    if (!out.resources || typeof out.resources !== "object") out.resources = {};
    return out;
  }

  // If a source ever omits `cols`, rebuild them from the cards (order preserved).
  function deriveCols(cards) {
    var cols = { student: [], boy: [] };
    cards.forEach(function (c) {
      var arr = cols[c.view];
      if (arr && c.col && arr.indexOf(c.col) === -1) arr.push(c.col);
    });
    return cols;
  }

  function normalizeData(raw) {
    return {
      tracks: raw.tracks,
      cols: raw.cols || deriveCols(raw.cards),
      cards: (raw.cards || []).map(normalizeCard),
    };
  }

  /* ------------------------------- helpers -------------------------------- */

  var STATUS_META = {
    "Built": { key: "built", label: "Built", tick: "✓" },
    "Partial": { key: "partial", label: "Partial", tick: "◑" },
    "Needs build": { key: "need", label: "Needs Build", tick: "" },
  };
  function sMeta(s) { return STATUS_META[s] || STATUS_META["Needs build"]; }
  function trackClass(t) { return "t-" + t; }

  function resClass(v) {
    var x = (v || "").toLowerCase();
    if (x === "built" || x === "done") return "built";
    if (x === "partial") return "partial";
    if (x === "need" || x === "needs build") return "need";
    if (x === "yes") return "yes";
    return "neutral";
  }

  var REDUCED_MOTION = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // tiny DOM builder: el("div", {class:"x"}, [children|strings])
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v == null || v === false) return;
        if (k === "class") node.className = v;
        else if (k === "style") node.setAttribute("style", v);
        else if (k === "html") node.innerHTML = v;
        else if (k.slice(0, 2) === "on" && typeof v === "function") {
          node.addEventListener(k.slice(2).toLowerCase(), v);
        } else if (k === "value") node.value = v;
        else node.setAttribute(k, v);
      });
    }
    if (children != null) {
      (Array.isArray(children) ? children : [children]).forEach(function (ch) {
        if (ch == null || ch === false) return;
        node.appendChild(typeof ch === "object" ? ch : document.createTextNode(String(ch)));
      });
    }
    return node;
  }

  // count-up: animate target into node.textContent over ~900ms ease-out-cubic.
  function countUp(node, target, suffix) {
    suffix = suffix || "";
    if (REDUCED_MOTION) { node.textContent = target + suffix; return; }
    var start = null, dur = 900;
    function step(t) {
      if (start === null) start = t;
      var p = Math.min(1, (t - start) / dur);
      var e = 1 - Math.pow(1 - p, 3);
      node.textContent = Math.round(target * e) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ------------------------------- SVG marks ------------------------------ */

  var FLAME_PATHS =
    '<path d="M70.5 2c-2.8 10.4-9.6 18.2-17.9 25.3C41.7 36.8 28.4 45.9 22.7 61.2c-6.6 17.7-2.4 36.8 11.4 48.9-3.1-7.9-3.3-16.4.6-23.9 3.2-6.2 8.6-10.4 13.7-15 .8 9.7-1.2 18.9 3.6 28 4.3 8.2 13 13.4 13.3 23.6 6.9-5.2 11-12.5 12.2-20.7 6.1 4.2 9.2 10.6 9.3 18.2 10.9-9.3 17.4-22.6 16.9-37.1-.6-17.9-11.6-31.2-19.5-46.3C90.9 26.4 87 13.9 70.5 2Z"/>' +
    '<path d="M11.5 96.8 2 116.2l21.5-9.2c-4.8-2.6-8.8-6.1-12-10.2Z"/>';

  function markSvg() {
    return el("span", {
      class: "markwrap",
      html: '<svg class="mark" viewBox="0 0 120 150" fill="#E21C24" role="img" ' +
        'aria-label="Matchbook Learning flame mark">' + FLAME_PATHS + "</svg>",
    });
  }
  function flameSvg() {
    return el("span", {
      html: '<svg class="flame" viewBox="0 0 120 150" fill="#ffffff" aria-hidden="true">' +
        FLAME_PATHS + "</svg>",
    });
  }

  /* ------------------------------- app state ------------------------------ */

  var DATA = null;
  var state = {
    view: "student",
    query: "",
    statusFilter: "all",
    activeTracks: new Set(),
    openId: null,
  };
  var day1Stats = { moments: 0, resources: 0 };

  // cached DOM references (built once)
  var refs = {};

  function currentCards() {
    return DATA.cards.filter(function (c) { return c.view === state.view; });
  }

  /* ------------------------------- KPI strip ------------------------------ */

  function buildKpis() {
    var feature = el("div", { class: "kpi feature" }, [
      flameSvg(),
      el("div", { class: "lab" }, "● Live · Day 1 Culture Camp"),
      el("div", { class: "headline" }, "Day 1 build complete — every teachable moment shipped."),
      el("div", { class: "row" }, [
        el("div", { class: "stat" }, [el("b", { id: "kpiMoments" }, "0"), el("span", null, "Teachable moments")]),
        el("div", { class: "stat" }, [el("b", null, "×3"), el("span", null, "Resources each")]),
        el("div", { class: "stat" }, [el("b", { id: "kpiResources" }, "0"), el("span", null, "Resources built")]),
      ]),
    ]);

    var completion = el("div", { class: "kpi" }, [
      el("div", { class: "lab" }, "View Completion"),
      el("div", { class: "big", id: "kpiPctWrap" }, [
        el("span", { id: "kpiPct" }, "0"),
        el("span", { style: "font-size:18px;color:var(--muted)" }, "%"),
      ]),
      el("div", { class: "meter" }, el("i", { id: "kpiMeter", style: "width:0%" })),
      el("div", { class: "sub", id: "kpiCompletionSub" }, ""),
    ]);

    var built = el("div", { class: "kpi tBuilt" }, [
      el("div", { class: "lab" }, "Built"), el("div", { class: "big", id: "kpiBuilt" }, "0"),
      el("div", { class: "sub" }, "Resource-ready sessions"),
    ]);
    var partial = el("div", { class: "kpi tPartial" }, [
      el("div", { class: "lab" }, "Partial"), el("div", { class: "big", id: "kpiPartial" }, "0"),
      el("div", { class: "sub" }, "Source exists, gaps remain"),
    ]);
    var need = el("div", { class: "kpi tNeed" }, [
      el("div", { class: "lab" }, "Needs Build"), el("div", { class: "big", id: "kpiNeed" }, "0"),
      el("div", { class: "sub" }, "Resource path to design"),
    ]);

    refs.kpis = el("section", { class: "kpis" }, [feature, completion, built, partial, need]);
    return refs.kpis;
  }

  // Recompute KPI numbers for the active view and (re)run the count-up + meter.
  function renderKpis() {
    var cards = currentCards();
    var total = cards.length;
    var built = cards.filter(function (c) { return c.status === "Built"; }).length;
    var partial = cards.filter(function (c) { return c.status === "Partial"; }).length;
    var need = cards.filter(function (c) { return c.status === "Needs build"; }).length;
    var pct = total ? Math.round((built / total) * 100) : 0;

    var root = refs.kpis;
    countUp(root.querySelector("#kpiMoments"), day1Stats.moments);
    countUp(root.querySelector("#kpiResources"), day1Stats.resources);
    countUp(root.querySelector("#kpiPct"), pct);
    countUp(root.querySelector("#kpiBuilt"), built);
    countUp(root.querySelector("#kpiPartial"), partial);
    countUp(root.querySelector("#kpiNeed"), need);
    root.querySelector("#kpiCompletionSub").textContent =
      built + " of " + total + " session cards built";

    var meter = root.querySelector("#kpiMeter");
    meter.style.width = "0%";
    setTimeout(function () { meter.style.width = pct + "%"; }, 120);
  }

  /* ------------------------------- Toolbar -------------------------------- */

  function buildToolbar() {
    var segStudent = el("button", {
      class: state.view === "student" ? "on" : "",
      onClick: function () { setView("student"); },
    }, "Student Culture Camp");
    var segBoy = el("button", {
      class: state.view === "boy" ? "on" : "",
      onClick: function () { setView("boy"); },
    }, "BOY Adult Calibration");
    refs.seg = { student: segStudent, boy: segBoy };

    var input = el("input", {
      placeholder: "Search sessions…",
      value: state.query,
      onInput: function (e) { state.query = e.target.value; renderBoard(); },
    });
    refs.search = input;
    var search = el("label", { class: "search" }, [
      el("span", {
        html: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
          'stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/>' +
          '<path d="m20 20-3.2-3.2"/></svg>',
      }),
      input,
    ]);

    var filterDefs = [
      ["all", "All", null], ["Built", "Built", "built"],
      ["Partial", "Partial", "partial"], ["Needs build", "Needs", "need"],
    ];
    refs.pills = {};
    var pills = filterDefs.map(function (d) {
      var val = d[0], lab = d[1], pip = d[2];
      var btn = el("button", {
        class: "pill" + (state.statusFilter === val ? " on" : ""),
        onClick: function () { setStatusFilter(val); },
      }, [pip ? el("span", { class: "pip " + pip }) : null, lab]);
      refs.pills[val] = btn;
      return btn;
    });

    var seg = el("div", { class: "seg", role: "tablist" }, [segStudent, segBoy]);
    var statusfilter = el("div", { class: "statusfilter" }, pills);
    refs.toolbar = el("div", { class: "toolbar" }, [seg, search, statusfilter]);
    return refs.toolbar;
  }

  /* -------------------------------- Legend -------------------------------- */

  function buildLegend() {
    refs.chips = {};
    var chips = DATA.tracks.map(function (t) {
      var key = t[0], name = t[1];
      var btn = el("button", {
        class: trackClass(key) + " chip",
        onClick: function () { toggleTrack(key); },
      }, [el("span", { class: "dot" }), name]);
      refs.chips[key] = btn;
      return btn;
    });
    refs.legend = el("div", { class: "legend" }, chips);
    updateLegend();
    return refs.legend;
  }

  function updateLegend() {
    var active = state.activeTracks;
    DATA.tracks.forEach(function (t) {
      var key = t[0], btn = refs.chips[key];
      var on = active.size === 0 || active.has(key);
      btn.classList.toggle("on", active.has(key));
      btn.classList.toggle("dim", !on);
    });
  }

  /* --------------------------------- Card --------------------------------- */

  function cardEl(c, dim) {
    var m = sMeta(c.status);
    var chipChildren = [];
    if (m.tick) chipChildren.push(el("span", { class: "tick" }, m.tick));
    chipChildren.push(m.label);

    var footer = c.day1Built
      ? el("span", { class: "builtflag" }, "✓ Built at Camp · ×3 resources")
      : el("span", { class: "csrc" }, c.source);

    return el("button", {
      class: "card " + trackClass(c.track) + (dim ? " dim" : ""),
      onClick: function () { openDrawer(c.id); },
    }, [
      el("div", { class: "cmeta" }, [
        el("span", { class: "dose" }, c.dosage),
        el("span", { class: "schip " + m.key }, chipChildren),
      ]),
      el("div", { class: "ctitle" }, c.title),
      footer,
    ]);
  }

  /* --------------------------------- Board -------------------------------- */

  function buildBoardShell() {
    refs.board = el("div", { class: "board" });
    refs.boardwrap = el("div", { class: "boardwrap" }, refs.board);
    renderBoard();
    return refs.boardwrap;
  }

  function renderBoard() {
    var cols = DATA.cols[state.view];
    var cards = currentCards();
    var q = state.query.trim().toLowerCase();
    var active = state.activeTracks;

    function visible(c) {
      if (active.size && !active.has(c.track)) return false;
      if (q && c.title.toLowerCase().indexOf(q) === -1) return false;
      return true;
    }
    function dimmed(c) {
      return state.statusFilter !== "all" && c.status !== state.statusFilter;
    }

    var board = refs.board;
    board.style.setProperty("--cols", cols.length);
    board.innerHTML = "";

    // header row
    var headrow = el("div", { class: "headrow" }, [el("div", { class: "corner" }, "System Tracks")]);
    cols.forEach(function (col, i) {
      headrow.appendChild(el("div", { class: "colhead" + (i === 0 ? " isLaunch" : "") }, [
        el("b", null, col),
        el("small", null, i === 0 ? "Launch" : (state.view === "student" ? "Camp" : "Adult PD")),
      ]));
    });
    board.appendChild(headrow);

    // track rows
    DATA.tracks.forEach(function (t) {
      var key = t[0], name = t[1], sub = t[2];
      var rowCards = cards.filter(function (c) { return c.track === key; });
      var builtN = rowCards.filter(function (c) { return c.status === "Built"; }).length;

      var row = el("div", { class: "trackrow " + trackClass(key) }, [
        el("div", { class: "tracklabel" }, [
          el("div", { class: "tname" }, [el("span", { class: "dot" }), name]),
          el("div", { class: "tsub" }, sub),
          el("div", { class: "tcount" }, builtN + "/" + rowCards.length + " built"),
        ]),
      ]);

      cols.forEach(function (col, ci) {
        var cell = rowCards.filter(function (c) { return c.col === col && visible(c); });
        var cellEl = el("div", { class: "cell" + (ci % 2 ? " even" : "") });
        if (cell.length === 0) {
          cellEl.appendChild(el("div", { class: "empty" }, "—"));
        } else {
          cell.forEach(function (c) { cellEl.appendChild(cardEl(c, dimmed(c))); });
        }
        row.appendChild(cellEl);
      });
      board.appendChild(row);
    });
  }

  /* -------------------------------- Drawer -------------------------------- */

  var THREE_LABELS = {
    "Student-facing lesson": "Student mini-lesson",
    "Rehearsal card": "Teacher rehearsal card",
    "Coaching look-for": "Coaching look-for",
  };

  function resEl(k, v) {
    return el("div", { class: "res" }, [
      el("span", { class: "rk" }, k),
      el("span", { class: "rv " + resClass(v) }, v == null ? "" : String(v)),
    ]);
  }

  function drawerEscHandler(e) {
    if (e.key === "Escape") closeDrawer();
  }

  function openDrawer(id) {
    var c = DATA.cards.find(function (x) { return x.id === id; });
    if (!c) return;
    state.openId = id;
    closeDrawer(true); // clear any existing (keep state)

    var tnameEntry = DATA.tracks.find(function (t) { return t[0] === c.track; });
    var tname = tnameEntry ? tnameEntry[1] : c.track;
    var m = sMeta(c.status);
    var res = c.resources || {};
    var coreKeys = ["Student-facing lesson", "Rehearsal card", "Coaching look-for"];
    var extKeys = Object.keys(res).filter(function (k) {
      return coreKeys.indexOf(k) === -1 && k !== "Source status";
    });

    var statusChip = (function () {
      var ch = [];
      if (m.tick) ch.push(el("span", { class: "tick" }, m.tick));
      ch.push(m.label);
      return el("span", { class: "schip " + m.key }, ch);
    })();

    var head = el("header", { class: "dhead" }, [
      el("div", { class: "dtop" }, [
        el("div", { class: "crumbs" }, [
          el("span", null, c.col), el("span", { class: "sep" }, "/"),
          el("span", null, tname), el("span", { class: "sep" }, "/"),
          el("span", null, c.dosage),
        ]),
        el("button", { class: "dclose", "aria-label": "Close", onClick: closeDrawer }, "✕"),
      ]),
      el("h2", null, c.title),
      el("div", { class: "dstatus" }, [
        statusChip,
        el("span", { style: "font-size:12px;color:var(--muted);font-weight:600" }, c.source),
      ]),
    ]);

    var body = el("div", { class: "dbody" });

    if (c.day1Built) {
      var ul = el("ul", null, coreKeys.map(function (k) {
        return el("li", null, [el("span", { class: "ck" }, "✓"), THREE_LABELS[k], el("small", null, "Done")]);
      }));
      body.appendChild(el("div", { class: "builtbanner" }, [
        el("div", { class: "bb-k" }, "✓ Shipped · Culture Camp Day 1"),
        el("div", { class: "bb-t" }, "Three resources built and verified for this teachable moment."),
        ul,
      ]));
    }

    body.appendChild(sec("What this teaches", el("p", null, c.teaches)));
    body.appendChild(sec("Why it matters", el("p", null, c.why)));
    body.appendChild(sec("Safe · Respectful · Responsible", el("p", { class: "pull" }, c.srr)));

    body.appendChild(sec("Moves in practice", el("div", { class: "kvline" }, [
      el("div", { class: "kv" }, [el("b", null, "Adult moves"), el("span", null, c.adult)]),
      el("div", { class: "kv" }, [el("b", null, "Student steps"), el("span", null, c.student)]),
    ])));

    var grade = c.grade || {};
    body.appendChild(sec("Grade-band translation", el("div", { class: "gband" }, [
      el("div", { class: "gcard" }, [el("b", null, "K–2"), el("p", null, grade["K-2"])]),
      el("div", { class: "gcard" }, [el("b", null, "3–5"), el("p", null, grade["3-5"])]),
      el("div", { class: "gcard" }, [el("b", null, "6–8"), el("p", null, grade["6-8"])]),
      el("div", { class: "gcard" }, [el("b", null, "Stays stable"),
        el("p", null, "Same value language and routine logic; execution flexes by age.")]),
    ])));

    // Resource path
    var resPath = el("div", { class: "sec" }, el("h3", null, "Resource path"));
    if (c.day1Built) {
      resPath.appendChild(el("div", { class: "subhead" }, "Day 1 camp build — delivered"));
      var coreGrid = el("div", { class: "resgrid" },
        coreKeys.map(function (k) { return resEl(THREE_LABELS[k], res[k]); }));
      coreGrid.appendChild(resEl("Source status", res["Source status"]));
      resPath.appendChild(coreGrid);
      if (extKeys.length > 0) {
        resPath.appendChild(el("div", { class: "subhead" }, "Extended resources — post-camp backlog"));
        resPath.appendChild(el("div", { class: "resgrid" },
          extKeys.map(function (k) { return resEl(k, res[k]); })));
      }
    } else {
      resPath.appendChild(el("p", { style: "margin-bottom:10px" }, c.resourceNeeded));
      resPath.appendChild(el("div", { class: "resgrid" },
        Object.keys(res).map(function (k) { return resEl(k, res[k]); })));
    }
    body.appendChild(resPath);

    var r3a = c.r3 || {};
    body.appendChild(sec("Rehearsal · Recognition · Reteach", el("div", { class: "r3" }, [
      el("div", { class: "r3i" }, [el("b", null, "Rehearsal move"), el("p", null, c.rehearsal)]),
      el("div", { class: "r3i" }, [el("b", null, "Recognition hook"), el("p", null, c.recognition)]),
      el("div", { class: "r3i" }, [el("b", null, "Reteach move"), el("p", null, c.reteach)]),
    ])));

    body.appendChild(sec("Coaching look-for", el("p", { class: "pull" }, c.coach)));

    body.appendChild(sec("R³ debrief", el("div", { class: "r3" }, [
      el("div", { class: "r3i" }, [el("b", null, "Reflection"), el("p", null, r3a.Reflection)]),
      el("div", { class: "r3i" }, [el("b", null, "Resistance"), el("p", null, r3a.Resistance)]),
      el("div", { class: "r3i" }, [el("b", null, "Revelation"), el("p", null, r3a.Revelation)]),
    ])));

    body.appendChild(el("p", { class: "note" },
      "Backward-planning logic: every session becomes a resource set — facilitator notes, " +
      "participant guide, slide sequence, rehearsal card, student lesson, and a coaching / evidence tool."));

    var scrim = el("div", { class: "scrim", onClick: closeDrawer });
    var drawer = el("aside", { class: "drawer " + trackClass(c.track), role: "dialog", "aria-modal": "true" }, [head, body]);

    refs.drawerNodes = [scrim, drawer];
    refs.app.appendChild(scrim);
    refs.app.appendChild(drawer);
    window.addEventListener("keydown", drawerEscHandler);
  }

  function sec(title, child) {
    return el("div", { class: "sec" }, [el("h3", null, title), child]);
  }

  function closeDrawer(keepState) {
    if (refs.drawerNodes) {
      refs.drawerNodes.forEach(function (n) { if (n.parentNode) n.parentNode.removeChild(n); });
      refs.drawerNodes = null;
      window.removeEventListener("keydown", drawerEscHandler);
    }
    if (!keepState) state.openId = null;
  }

  /* ----------------------------- state setters ---------------------------- */

  function setView(v) {
    if (state.view === v) return;
    state.view = v;
    refs.seg.student.classList.toggle("on", v === "student");
    refs.seg.boy.classList.toggle("on", v === "boy");
    renderKpis();
    renderBoard();
  }

  function setStatusFilter(val) {
    state.statusFilter = val;
    Object.keys(refs.pills).forEach(function (k) {
      refs.pills[k].classList.toggle("on", k === val);
    });
    renderBoard();
  }

  function toggleTrack(key) {
    if (state.activeTracks.has(key)) state.activeTracks.delete(key);
    else state.activeTracks.add(key);
    updateLegend();
    renderBoard();
  }

  /* --------------------------------- mount -------------------------------- */

  function buildMasthead() {
    return el("header", { class: "masthead" }, [
      el("div", { class: "brand" }, [
        markSvg(),
        el("div", null, [
          el("div", { class: "kick" }, "Matchbook · Culture Operating System"),
          el("h1", { html: "Culture Camp &amp; BOY <span>Build Tracker</span>" }),
        ]),
      ]),
      el("div", { class: "meta" }, [
        el("div", null, el("b", null, "Backward-planning macro board")),
        el("div", null, "Every session → a resource path → teaching, rehearsal, evidence, coaching."),
        el("div", { style: "margin-top:8px" },
          el("a", { href: "live_tracker.html", style: "font-family:var(--cond);font-weight:600;letter-spacing:.04em;text-transform:uppercase;font-size:12px;color:var(--spark-red)" },
            "← Open classic tracker view")),
      ]),
    ]);
  }

  function showError(msg) {
    var root = document.getElementById("root");
    root.innerHTML = "";
    root.appendChild(el("div", { class: "app" }, el("div", {
      class: "wrap",
      style: "padding-top:60px;font-family:var(--ui);color:var(--ink)",
    }, [
      el("h1", { style: "font-family:var(--disp);text-transform:uppercase" }, "Dashboard data unavailable"),
      el("p", { style: "color:var(--slate)" }, msg),
      el("p", null, el("a", { href: "live_tracker.html" }, "Open the classic tracker view instead →")),
    ])));
  }

  function mount(raw, source) {
    DATA = normalizeData(raw);

    // feature KPI: count of "built at camp" teachable moments across all cards.
    var moments = DATA.cards.filter(function (c) { return c.day1Built; }).length;
    day1Stats = { moments: moments, resources: moments * 3 };

    var root = document.getElementById("root");
    root.innerHTML = "";
    refs = {};
    refs.app = el("div", { class: "app" });
    var wrap = el("div", { class: "wrap" }, [
      buildMasthead(),
      buildKpis(),
      buildToolbar(),
      buildLegend(),
      buildBoardShell(),
    ]);
    refs.app.appendChild(wrap);
    root.appendChild(refs.app);

    renderKpis();

    // Surface which source fed the board (handy while the two are being unified).
    if (window.console && console.info) {
      console.info("[Culture Dashboard] data source: " + source +
        " · " + DATA.cards.length + " cards · " + day1Stats.moments + " day-1 build moments");
    }
  }

  function init() {
    loadData()
      .then(function (r) { mount(r.data, r.source); })
      .catch(function (err) {
        console.error(err);
        showError("Could not load the tracker data source. If you opened this file " +
          "directly from disk, serve the folder over http (or view it on the published site).");
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
