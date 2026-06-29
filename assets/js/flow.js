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
