/* ============================================================
   BizChinese — interactive prototype controller (LUMI edition)
   ============================================================ */

const state = { name: "Alex", lang: "en", purpose: "work", scenario: "interview", shuffle: false };

const screenEl = document.getElementById("screen");
const crumbEl = document.getElementById("crumb");
const jumpEl = document.getElementById("jump");
let current = "welcome";

function render(id) {
  const scr = SCREEN_MAP[id];
  if (!scr) return;
  if (id === "recommend") state.shuffle = true; // fresh random picks on each arrival
  current = id;
  screenEl.innerHTML = scr.render(state);
  screenEl.scrollTop = 0;
  if (crumbEl) crumbEl.textContent = `${scr.group} · ${scr.title}`;
  if (jumpEl) jumpEl.value = id;
  if (location.hash.slice(1) !== id) history.replaceState(null, "", "#" + id);
  bind();
  if (id === "home") setupPullGesture();
}

/* ---- pull-DOWN gesture: drag the top handle to reveal LUMI chat ---- */
let pullMove = null, pullUp = null;
function setupPullGesture() {
  const sheet = screenEl.querySelector("[data-sheet]");
  const dim = screenEl.querySelector("[data-dim]");
  const opener = screenEl.querySelector("[data-pullopen]");
  if (!sheet || !opener) return;

  const H = screenEl.clientHeight || 844;
  const OPEN_AT = H * 0.28;
  let drag = null; // { startY, from, moved }
  let opened = false;

  const apply = (px) => {
    sheet.style.transform = `translateY(${px - H}px)`;
    if (dim) dim.style.opacity = String(Math.min(px / H, 1) * 0.34);
  };
  const snap = (px) => {
    sheet.classList.add("snap");
    if (dim) dim.classList.add("snap");
    apply(px);
    opened = px > H / 2;
    window.setTimeout(() => {
      sheet.classList.remove("snap");
      if (dim) dim.classList.remove("snap");
    }, 440);
  };
  apply(0); // start closed

  const down = (e, from) => {
    drag = { startY: e.clientY, from, moved: 0 };
    sheet.classList.remove("snap");
    if (dim) dim.classList.remove("snap");
    try { e.target.setPointerCapture(e.pointerId); } catch (_) {}
    e.preventDefault();
  };
  const onMove = (e) => {
    if (!drag) return;
    const dy = e.clientY - drag.startY;
    drag.moved = Math.max(drag.moved, Math.abs(dy));
    apply(Math.max(0, Math.min(H, drag.from + dy)));
  };
  const onUp = (e) => {
    if (!drag) return;
    const px = Math.max(0, Math.min(H, drag.from + (e.clientY - drag.startY)));
    if (drag.moved < 6) snap(opened ? 0 : H); // treat as a tap -> toggle
    else snap(px > OPEN_AT ? H : 0);
    drag = null;
  };

  opener.addEventListener("pointerdown", (e) => down(e, 0));
  const grip = sheet.querySelector("[data-sheetgrip]");
  if (grip) grip.addEventListener("pointerdown", (e) => down(e, H));

  // avoid stacking window listeners across renders
  if (pullMove) window.removeEventListener("pointermove", pullMove);
  if (pullUp) window.removeEventListener("pointerup", pullUp);
  pullMove = onMove; pullUp = onUp;
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);

  sheet.querySelectorAll("[data-pullclose]").forEach((b) =>
    b.addEventListener("click", () => snap(0))
  );
}

function captureName() {
  const inp = screenEl.querySelector("#nameInput");
  if (inp && inp.value.trim()) state.name = inp.value.trim();
}

function bind() {
  // quick name chips
  screenEl.querySelectorAll("[data-name]").forEach((el) =>
    el.addEventListener("click", () => {
      state.name = el.dataset.name;
      const inp = screenEl.querySelector("#nameInput");
      if (inp) inp.value = el.dataset.name;
    })
  );

  // shuffle recommendations in place
  screenEl.querySelectorAll("[data-shuffle]").forEach((el) =>
    el.addEventListener("click", () => { state.shuffle = true; render("recommend"); })
  );

  // navigation
  screenEl.querySelectorAll("[data-go]").forEach((el) => {
    el.addEventListener("click", () => {
      if (current === "ask_name") captureName();
      if (el.dataset.lang) state.lang = el.dataset.lang;
      if (el.dataset.purpose) state.purpose = el.dataset.purpose;
      if (el.dataset.scenario) state.scenario = el.dataset.scenario;
      render(el.dataset.go);
    });
  });

  // suggested replies in chat -> finish to summary (demo)
  screenEl.querySelectorAll("[data-suggest]").forEach((el) =>
    el.addEventListener("click", () => render("summary"))
  );
}

if (jumpEl) {
  jumpEl.innerHTML = SCREENS.map((s) => `<option value="${s.id}">${s.group} — ${s.title}</option>`).join("");
  jumpEl.addEventListener("change", () => render(jumpEl.value));
}
const restartBtn = document.getElementById("restart");
if (restartBtn) restartBtn.addEventListener("click", () => { state.name = "Alex"; state.lang = "en"; render("welcome"); });

const start = location.hash.slice(1);
render(SCREEN_MAP[start] ? start : "welcome");
