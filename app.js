(() => {
  const stage = document.getElementById("stage");
  const settings = document.getElementById("textureSettings");
  const handle = document.getElementById("settingsHandle");
  const toggle = document.getElementById("positionToggle");
  const xyRow = document.getElementById("xyRow");
  const moveGizmo = document.getElementById("moveGizmo");
  const selection = document.getElementById("selection");

  function fitStage() {
    const pad = 24;
    const scale = Math.min(
      (window.innerWidth - pad) / 1440,
      (window.innerHeight - pad) / 900
    );
    stage.style.transform = `scale(${Math.max(0.35, scale)})`;
  }

  fitStage();
  window.addEventListener("resize", fitStage);

  function setPositionOn(on) {
    toggle.setAttribute("aria-pressed", String(on));
    xyRow.hidden = !on;
    xyRow.setAttribute("aria-hidden", String(!on));
    xyRow.classList.toggle("is-visible", on);
    moveGizmo.hidden = !on;
    selection.classList.toggle("position-on", on);
    settings.classList.toggle("with-xy", on);
  }

  function expandSettings() {
    settings.classList.remove("collapsed");
    settings.classList.add("expanded");
    handle.setAttribute("aria-label", "Collapse texture settings");
  }

  function collapseSettings() {
    settings.classList.add("collapsed");
    settings.classList.remove("expanded", "with-xy");
    handle.setAttribute("aria-label", "Expand texture settings");
    setPositionOn(false);
  }

  handle.addEventListener("click", () => {
    if (settings.classList.contains("collapsed")) {
      expandSettings();
    } else {
      collapseSettings();
    }
  });

  settings.querySelector(".settings-head").addEventListener("click", (e) => {
    if (e.target.closest(".reset-btn")) return;
    if (settings.classList.contains("collapsed")) {
      expandSettings();
    }
  });

  toggle.addEventListener("click", () => {
    if (settings.classList.contains("collapsed")) {
      expandSettings();
    }
    const on = toggle.getAttribute("aria-pressed") !== "true";
    setPositionOn(on);
  });

  // Start: X/Y hidden until toggle is on
  setPositionOn(false);
})();
