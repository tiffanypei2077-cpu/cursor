/* ============================================================
   BizChinese — overview gallery builder (index.html)
   Renders every screen as a scaled, static phone mockup,
   grouped by flow stage. Each tile links into the live
   interactive prototype at that exact screen.
   ============================================================ */

const wrap = document.getElementById("gallery");

// group screens preserving order
const groups = [];
SCREENS.forEach((s) => {
  let g = groups.find((x) => x.name === s.group);
  if (!g) { g = { name: s.group, items: [] }; groups.push(g); }
  g.items.push(s);
});

wrap.innerHTML = groups.map((g) => `
  <section class="g-group">
    <h2 class="g-group__title">${g.name}</h2>
    <div class="g-grid">
      ${g.items.map((s) => `
        <a class="g-tile" href="prototype.html#${s.id}">
          <div class="g-phone-scale">
            <div class="phone">
              <div class="phone__notch"></div>
              <div class="phone__screen">${s.render(DEMO_STATE)}</div>
            </div>
          </div>
          <div class="g-meta">
            <b>${s.title}</b>
            <p>${s.desc}</p>
            <span class="g-open">交互体验 →</span>
          </div>
        </a>`).join("")}
    </div>
  </section>`).join("");
