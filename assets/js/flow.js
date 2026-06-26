/* ============================================================
   BizChinese — interactive prototype controller
   Renders one screen at a time inside the phone frame and
   handles clickable navigation between screens.
   ============================================================ */

const state = {
  avatar: "yuyu",
  branch: "new",
  pain: "travel",
  industry: "manufacturing",
  scenario: "taxi",
};

const screenEl = document.getElementById("screen");
const crumbEl = document.getElementById("crumb");
const jumpEl = document.getElementById("jump");
let current = "welcome";

function render(id) {
  const scr = SCREEN_MAP[id];
  if (!scr) return;
  current = id;
  screenEl.innerHTML = scr.render(state);
  screenEl.scrollTop = 0;
  if (crumbEl) crumbEl.textContent = `${scr.group} · ${scr.title}`;
  if (jumpEl) jumpEl.value = id;
  if (location.hash.slice(1) !== id) history.replaceState(null, "", "#" + id);
  bind();
}

function bind() {
  // capture preference selections, then navigate if data-go present
  screenEl.querySelectorAll("[data-avatar]").forEach((el) =>
    el.addEventListener("click", () => { state.avatar = el.dataset.avatar; render(current); })
  );

  screenEl.querySelectorAll("[data-go]").forEach((el) => {
    el.addEventListener("click", () => {
      if (el.dataset.branch) state.branch = el.dataset.branch;
      if (el.dataset.pain) state.pain = el.dataset.pain;
      if (el.dataset.industry) state.industry = el.dataset.industry;
      if (el.dataset.scenario) state.scenario = el.dataset.scenario;
      render(el.dataset.go);
    });
  });

  // suggested replies in chat -> jump to summary (demo)
  screenEl.querySelectorAll("[data-suggest]").forEach((el) =>
    el.addEventListener("click", () => render("summary"))
  );
}

// build the jump-to dropdown
if (jumpEl) {
  jumpEl.innerHTML = SCREENS.map((s) => `<option value="${s.id}">${s.group} — ${s.title}</option>`).join("");
  jumpEl.addEventListener("change", () => render(jumpEl.value));
}

// restart button
const restartBtn = document.getElementById("restart");
if (restartBtn) restartBtn.addEventListener("click", () => render("welcome"));

// boot from hash or welcome
const start = location.hash.slice(1);
render(SCREEN_MAP[start] ? start : "welcome");
