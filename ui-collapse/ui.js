/*
 * ui-collapse only. Does not run on the root player.
 *
 * Fullscreen: prefers Element.requestFullscreen (plus webkit prefix) on #playerShell.
 * If the call is missing or rejects — typical on iOS/Safari for a non-video element,
 * and inside an iframe without allow="fullscreen" — add .is-fs-fallback so the shell
 * fills the visual viewport, and show a short status hint. Leave with the same
 * button or Escape. Native fullscreen still leaves with Escape or the button.
 */
(function () {
  var shell = document.getElementById("playerShell");
  var dock = document.getElementById("controlDock");
  var toggle = document.getElementById("panelToggle");
  var fsBtn = document.getElementById("fsBtn");
  var hint = document.getElementById("fsHint");
  var DOCK_KEY = "ch4-ui-collapse-dock";
  var hintTimer = null;

  if (!shell || !dock || !toggle || !fsBtn) return;

  function nativeFsElement() {
    return document.fullscreenElement || document.webkitFullscreenElement || null;
  }

  function isFallback() {
    return shell.classList.contains("is-fs-fallback");
  }

  function isMaximized() {
    return nativeFsElement() === shell || isFallback();
  }

  function persistDock(open) {
    try {
      localStorage.setItem(DOCK_KEY, open ? "open" : "collapsed");
    } catch (err) {}
  }

  function applyDock(open, persist) {
    document.documentElement.classList.toggle("dock-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) dock.removeAttribute("hidden");
    else dock.setAttribute("hidden", "");
    if (persist) persistDock(open);
    refit();
  }

  function fitMaximized() {
    var slot = document.getElementById("stageSlot");
    var scaleWrap = document.getElementById("stageScale");
    var stage = document.getElementById("stage");
    var bar = document.getElementById("chromeBar");
    if (!slot || !scaleWrap || !stage || !bar) return;
    var styles = window.getComputedStyle(shell);
    var padY = (parseFloat(styles.paddingTop) || 0) + (parseFloat(styles.paddingBottom) || 0);
    var used = padY + bar.offsetHeight + 10;
    var dockOpen = document.documentElement.classList.contains("dock-open");
    if (dockOpen) used += dock.offsetHeight + 16;
    var availW = slot.clientWidth;
    var availH = shell.clientHeight - used;
    if (!(availH > 80)) availH = 80;
    var scale = Math.min(1, availW / 1280, availH / 720);
    if (!(scale > 0)) scale = 1;
    stage.style.transform = "scale(" + scale + ")";
    scaleWrap.style.width = (1280 * scale) + "px";
    scaleWrap.style.height = (720 * scale) + "px";
  }

  function refit() {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        window.dispatchEvent(new Event("resize"));
      });
    });
  }

  window.addEventListener("resize", function () {
    if (isMaximized()) fitMaximized();
  });

  function showHint(text) {
    if (!hint) return;
    hint.hidden = false;
    hint.textContent = text;
    clearTimeout(hintTimer);
    hintTimer = setTimeout(function () {
      hint.hidden = true;
    }, 4500);
  }

  function syncFsUi() {
    var on = isMaximized();
    fsBtn.setAttribute("aria-pressed", on ? "true" : "false");
    fsBtn.textContent = on ? "離開全螢幕" : "全螢幕";
  }

  function startFallback() {
    shell.classList.add("is-fs-fallback");
    document.documentElement.classList.add("fs-lock");
    syncFsUi();
    refit();
    showHint("此瀏覽器未能使用系統全螢幕，已改為填滿畫面。");
  }

  function stopFallback() {
    shell.classList.remove("is-fs-fallback");
    document.documentElement.classList.remove("fs-lock");
    if (hint) hint.hidden = true;
  }

  function requestFs(el) {
    var fn = el.requestFullscreen || el.webkitRequestFullscreen;
    if (!fn) return Promise.reject(new Error("no-fullscreen-api"));
    try {
      var result = fn.call(el);
      if (result && typeof result.then === "function") return result;
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  function exitNative() {
    var active = nativeFsElement();
    if (!active) return Promise.resolve();
    var fn = document.exitFullscreen || document.webkitExitFullscreen;
    if (!fn) return Promise.resolve();
    try {
      var result = fn.call(document);
      if (result && typeof result.then === "function") return result;
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  function enterFullscreen() {
    requestFs(shell).then(function () {
      if (nativeFsElement() === shell) {
        syncFsUi();
        refit();
        return;
      }
      startFallback();
    }).catch(function () {
      startFallback();
    });
  }

  function leaveFullscreen() {
    var pending = exitNative();
    stopFallback();
    syncFsUi();
    refit();
    if (pending && typeof pending.catch === "function") pending.catch(function () {});
  }

  toggle.addEventListener("click", function () {
    applyDock(!document.documentElement.classList.contains("dock-open"), true);
  });

  fsBtn.addEventListener("click", function () {
    if (isMaximized()) leaveFullscreen();
    else enterFullscreen();
  });

  document.addEventListener("fullscreenchange", function () {
    syncFsUi();
    refit();
  });
  document.addEventListener("webkitfullscreenchange", function () {
    syncFsUi();
    refit();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape" || !isFallback()) return;
    stopFallback();
    syncFsUi();
    refit();
  });

  if (hint) {
    hint.addEventListener("click", function () {
      hint.hidden = true;
    });
  }

  applyDock(document.documentElement.classList.contains("dock-open"), false);
  syncFsUi();
})();
