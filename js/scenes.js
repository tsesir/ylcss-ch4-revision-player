function dom(html) {
  var tpl = document.createElement("template");
  tpl.innerHTML = html.trim();
  return tpl.content.firstElementChild;
}

function must(root, sel) {
  var node = root.querySelector(sel);
  if (!node) throw new Error("Missing " + sel + " in " + (root.id || "scene"));
  return node;
}

function all(root, sel) {
  var list = root.querySelectorAll(sel);
  if (!list.length) throw new Error("Missing " + sel + " in " + (root.id || "scene"));
  return list;
}

function sinePath(w, h, cycles, ampRatio) {
  var mid = h / 2;
  var amp = h * (ampRatio || 0.34);
  var steps = 72;
  var parts = [];
  for (var i = 0; i <= steps; i++) {
    var x = (i / steps) * w;
    var y = mid + Math.sin((i / steps) * cycles * Math.PI * 2) * amp;
    parts.push((i === 0 ? "M" : "L") + x.toFixed(1) + " " + y.toFixed(1));
  }
  return parts.join(" ");
}

function yOnWave(x, w, h, cycles) {
  return h / 2 + Math.sin((x / w) * cycles * Math.PI * 2) * (h * 0.34);
}

function enter(tl, target, at, fromVars, toVars) {
  tl.fromTo(
    target,
    Object.assign({ autoAlpha: 0, immediateRender: true }, fromVars || {}),
    Object.assign({ autoAlpha: 1, duration: 0.38, ease: "back.out(1.6)" }, toVars || {}),
    at
  );
}

function drawPath(tl, path, at, dur) {
  var len = path.getTotalLength();
  if (!len) return 0;
  path.style.strokeDasharray = String(len);
  path.style.strokeDashoffset = String(len);
  tl.to(path, { strokeDashoffset: 0, duration: dur, ease: "power2.inOut" }, at);
  return len;
}

function lightTerms(tl, nodes, at) {
  tl.to(nodes, {
    backgroundColor: "#D6FF3F",
    duration: 0.22,
    stagger: 0.22,
    ease: "power2.out"
  }, at);
}

var SCENE_BUILDERS = {
  B01: buildB01,
  B02: buildB02,
  B03: buildB03,
  B04: buildB04,
  B05: buildB05,
  B06: buildB06,
  B07: buildB07,
  B08: buildB08,
  B09: buildB09,
  B10: buildB10,
  B11: buildB11,
  B12: buildB12,
  B13: buildB13,
  B14: buildB14,
  B15: buildB15
};

var SCENE_TWEENS = {
  B01: tweensB01,
  B02: tweensB02,
  B03: tweensB03,
  B04: tweensB04,
  B05: tweensB05,
  B06: tweensB06,
  B07: tweensB07,
  B08: tweensB08,
  B09: tweensB09,
  B10: tweensB10,
  B11: tweensB11,
  B12: tweensB12,
  B13: tweensB13,
  B14: tweensB14,
  B15: tweensB15
};

function buildScene(beat) {
  var fn = SCENE_BUILDERS[beat.id];
  if (!fn) throw new Error("No scene builder for " + beat.id);
  var node = fn(beat);
  node.classList.add("scene");
  node.id = "scene-" + beat.id;
  node.dataset.beat = beat.id;
  return node;
}

function addSceneTweens(tl, beat, root, start) {
  var fn = SCENE_TWEENS[beat.id];
  if (!fn) throw new Error("No scene tweens for " + beat.id);
  fn(tl, root, start);
}

function mountScenes(stack) {
  stack.innerHTML = "";
  CH4_BEATS.forEach(function (beat) {
    if (!SCENE_BUILDERS[beat.id] || !SCENE_TWEENS[beat.id]) {
      throw new Error("Missing scene " + beat.id);
    }
    stack.appendChild(buildScene(beat));
  });
}

function buildB01() {
  return dom(
    '<div>' +
      '<div class="hero sticker">' +
        '<div><p class="eyebrow">YLCSS · S4 ICT · 新科研</p><h2>第4章<br>多媒體元素及數碼化</h2></div>' +
        '<div class="eyebrow">純播放複習</div>' +
      "</div>" +
      '<div class="icon-row">' +
        '<div class="icon-card sticker"><svg viewBox="0 0 86 72" aria-hidden="true"><rect x="6" y="10" width="74" height="52" rx="6" fill="#B9D6FF" stroke="#141414" stroke-width="3"/><circle cx="26" cy="28" r="7" fill="#D6FF3F" stroke="#141414" stroke-width="3"/><path d="M12 54 L32 36 L48 48 L60 40 L76 54" fill="none" stroke="#141414" stroke-width="3"/></svg>圖像</div>' +
        '<div class="icon-card sticker"><svg viewBox="0 0 86 72" aria-hidden="true"><path d="M6 36 H16 L24 16 L34 56 L44 22 L54 48 L64 36 H80" fill="none" stroke="#141414" stroke-width="4" stroke-linejoin="round"/></svg>音效</div>' +
        '<div class="icon-card sticker"><svg viewBox="0 0 86 72" aria-hidden="true"><rect x="8" y="14" width="70" height="44" rx="4" fill="#FFD0E8" stroke="#141414" stroke-width="3"/><path d="M8 24 H78 M8 48 H78 M22 14 V58 M40 14 V58 M58 14 V58" stroke="#141414" stroke-width="3"/></svg>視像</div>' +
      "</div>" +
      '<div class="sweep"><div class="sweep-arrow">模擬 → 數碼</div></div>' +
    "</div>"
  );
}

function tweensB01(tl, root, start) {
  enter(tl, all(root, ".icon-card"), start + 0.25, { x: -70 }, { x: 0, stagger: 0.1, duration: 0.42, ease: "power3.out" });
  enter(tl, must(root, ".sweep-arrow"), start + 1.15, { x: -240 }, { x: 760, duration: 1.7, ease: "power2.inOut" });
  tl.to(all(root, ".icon-card"), { y: -8, duration: 0.18, yoyo: true, repeat: 1, stagger: 0.08, ease: "power1.inOut" }, start + 3.3);
}

function buildB02() {
  return dom(
    '<div>' +
      '<div class="wave-card sticker"><svg viewBox="0 0 1100 210" aria-hidden="true"><path class="sine" d="' + sinePath(1100, 210, 2.2) + '" fill="none" stroke="#141414" stroke-width="6" stroke-linecap="round"/></svg></div>' +
      '<div class="step-row">' +
        '<div class="step sticker"><span>①</span><div><b>取樣</b><small>Sampling</small></div></div>' +
        '<div class="step sticker"><span>②</span><div><b>量化</b><small>Quantization</small></div></div>' +
      "</div>" +
    "</div>"
  );
}

function tweensB02(tl, root, start) {
  var path = must(root, ".sine");
  drawPath(tl, path, start + 0.15, 1.35);
  enter(tl, all(root, ".step"), start + 1.7, { scale: 0.4 }, { scale: 1, stagger: 0.28 });
  tl.to(must(root, ".wave-card"), { scale: 1.035, duration: 0.22, yoyo: true, repeat: 1, transformOrigin: "center" }, start + 3.5);
}

function buildB03() {
  var w = 1080;
  var h = 250;
  var cycles = 2;
  var coarse = [90, 250, 410, 570, 730, 890];
  var dense = [];
  var x;
  for (x = 50; x <= 1040; x += 40) dense.push(x);
  var ticks = coarse.map(function (px) {
    return '<i class="tick" style="left:' + px + 'px"></i>';
  }).join("");
  var dots = coarse.map(function (px) {
    return '<i class="dot coarse-dot" style="left:' + px + 'px;top:' + yOnWave(px, w, h, cycles).toFixed(1) + 'px"></i>';
  }).join("");
  var denseDots = dense.map(function (px) {
    return '<i class="dot dense-dot" style="left:' + px + 'px;top:' + yOnWave(px, w, h, cycles).toFixed(1) + 'px"></i>';
  }).join("");
  var rebuild = sinePath(w, h, cycles);
  return dom(
    '<div>' +
      '<div class="plot">' +
        '<svg class="wave" viewBox="0 0 ' + w + " " + h + '" width="' + w + '" height="' + h + '" aria-hidden="true">' +
          '<path class="base-wave" d="' + sinePath(w, h, cycles) + '" fill="none" stroke="#141414" stroke-width="5" stroke-linecap="round"/>' +
          '<path class="rebuild" d="' + rebuild + '" fill="none" stroke="#7CB800" stroke-width="5" stroke-linecap="round"/>' +
        "</svg>" +
        ticks + dots + denseDots +
      "</div>" +
      '<div class="rate-row">' +
        '<b>取樣率</b>' +
        '<div class="fake-slider"><div class="knob"></div></div>' +
        '<div class="rate-label"><span class="rate-a">例 8 kHz</span><span class="rate-b">例 44.1 kHz</span></div>' +
      "</div>" +
    "</div>"
  );
}

function tweensB03(tl, root, start) {
  drawPath(tl, must(root, ".base-wave"), start + 0.1, 0.7);
  enter(tl, all(root, ".tick"), start + 0.85, { scaleY: 0 }, { scaleY: 1, stagger: 0.06, duration: 0.3, ease: "power2.out", transformOrigin: "top center" });
  enter(tl, all(root, ".coarse-dot"), start + 1.35, { y: -36 }, { y: 0, stagger: 0.07, duration: 0.32, ease: "back.out(2)" });
  tl.to(must(root, ".knob"), { left: "78%", duration: 1.15, ease: "power2.inOut" }, start + 2.7);
  tl.to(must(root, ".rate-a"), { autoAlpha: 0, duration: 0.2 }, start + 3.45);
  enter(tl, must(root, ".rate-b"), start + 3.5, {}, { duration: 0.25, ease: "power2.out" });
  enter(tl, all(root, ".dense-dot"), start + 3.7, { scale: 0 }, { scale: 0.7, stagger: 0.012, duration: 0.25 });
  drawPath(tl, must(root, ".rebuild"), start + 4.5, 1.15);
}

function buildB04() {
  var w = 1040;
  var h = 280;
  var xs = [120, 230, 340, 450, 560, 670];
  var dots = xs.map(function (x, i) {
    var y = yOnWave(x, w, h, 1.5);
    return '<i class="dot q-dot" data-i="' + i + '" style="left:' + x + "px;top:" + y.toFixed(1) + 'px"></i>';
  }).join("");
  var coarse = [40, 100, 160, 220];
  var fine = [];
  var y;
  for (y = 16; y <= 250; y += 16) fine.push(y);
  var rungs = coarse.map(function (top) {
    return '<i class="rung coarse-rung" style="top:' + top + 'px"></i>';
  }).join("") + fine.map(function (top) {
    return '<i class="rung fine" style="top:' + top + 'px"></i>';
  }).join("");
  return dom(
    '<div class="plot" style="height:340px">' +
      '<svg class="wave" viewBox="0 0 ' + w + " " + h + '" width="' + w + '" height="' + h + '" aria-hidden="true"><path class="q-wave" d="' + sinePath(w, h, 1.5) + '" fill="none" stroke="#141414" stroke-width="5"/></svg>' +
      dots +
      '<div class="ladder">' + rungs + "</div>" +
      '<div class="bit-meter"><i></i></div>' +
      '<div class="bit-readout bit-a">4-bit · 16 級</div>' +
      '<div class="bit-readout bit-b">16-bit · 65,536 級</div>' +
    "</div>"
  );
}

function tweensB04(tl, root, start) {
  drawPath(tl, must(root, ".q-wave"), start + 0.1, 0.7);
  enter(tl, all(root, ".q-dot"), start + 0.45, { scale: 0 }, { scale: 1, stagger: 0.05 });
  enter(tl, all(root, ".coarse-rung"), start + 1.05, { scaleX: 0 }, { scaleX: 1, stagger: 0.08, duration: 0.28, ease: "power2.out", transformOrigin: "left center" });
  var dots = all(root, ".q-dot");
  var levels4 = [40, 100, 160, 220, 160, 100];
  dots.forEach(function (dot, i) {
    tl.to(dot, { left: 1000, top: levels4[i], duration: 0.7, ease: "power2.inOut" }, start + 1.7 + i * 0.05);
  });
  tl.to(must(root, ".bit-meter i"), { height: "42%", duration: 0.6, ease: "power2.out" }, start + 1.7);
  tl.to(must(root, ".bit-a"), { autoAlpha: 0, duration: 0.2 }, start + 3.4);
  enter(tl, must(root, ".bit-b"), start + 3.5, {}, { duration: 0.25, ease: "power2.out" });
  enter(tl, all(root, ".rung.fine"), start + 3.5, { scaleX: 0 }, { scaleX: 1, stagger: 0.02, duration: 0.25, ease: "power2.out", transformOrigin: "left center" });
  tl.to(must(root, ".bit-meter i"), { height: "92%", duration: 0.7, ease: "power2.out" }, start + 3.55);
  var levels16 = [32, 80, 128, 176, 144, 96];
  dots.forEach(function (dot, i) {
    tl.to(dot, { top: levels16[i], duration: 0.45, ease: "power2.out" }, start + 4.3 + i * 0.04);
  });
}

function buildB05() {
  var bits = "010110".split("").map(function (b) { return "<b>" + b + "</b>"; }).join("");
  var cells = "";
  for (var i = 0; i < 32; i++) cells += "<i></i>";
  return dom(
    '<div class="hw">' +
      '<div class="hw-card sticker">' +
        "<h3>聲卡</h3>" +
        '<div class="flow">' +
          '<svg class="mini-wave in-wave" viewBox="0 0 120 46" aria-hidden="true"><path class="in-path" d="' + sinePath(120, 46, 2) + '" fill="none" stroke="#141414" stroke-width="3"/></svg>' +
          '<div class="chip-box sticker">ADC</div>' +
          '<div class="bits">' + bits + "</div>" +
          '<div class="chip-box sticker">DAC</div>' +
          '<svg class="mini-wave out-wave" viewBox="0 0 120 46" aria-hidden="true"><path class="out-path" d="' + sinePath(120, 46, 2, 0.28) + '" fill="none" stroke="#141414" stroke-width="3"/></svg>' +
        "</div>" +
      "</div>" +
      '<div class="hw-card sticker">' +
        "<h3>相機感光</h3>" +
        '<div class="sensor">' + cells + "</div>" +
        '<div class="sensor-labels"><span>CCD</span><span>CMOS</span></div>' +
      "</div>" +
    "</div>"
  );
}

function tweensB05(tl, root, start) {
  enter(tl, all(root, ".hw-card"), start + 0.1, { y: 24 }, { y: 0, stagger: 0.12, ease: "power3.out", duration: 0.4 });
  drawPath(tl, must(root, ".in-path"), start + 0.45, 0.55);
  enter(tl, all(root, ".chip-box"), start + 1.05, { scale: 0.5 }, { scale: 1, stagger: 0.35 });
  enter(tl, all(root, ".bits b"), start + 1.7, { y: -16 }, { y: 0, stagger: 0.06, duration: 0.25, ease: "power2.out" });
  drawPath(tl, must(root, ".out-path"), start + 2.8, 0.6);
  var colors = ["#8EC5FF", "#D6FF3F", "#FFD0E8", "#141414", "#B8F2D0", "#FFE14A"];
  all(root, ".sensor i").forEach(function (cell, i) {
    tl.to(cell, { backgroundColor: colors[i % colors.length], duration: 0.2 }, start + 3.6 + (i % 8) * 0.05 + Math.floor(i / 8) * 0.08);
  });
  enter(tl, all(root, ".sensor-labels span"), start + 5.1, { scale: 0.6 }, { scale: 1, stagger: 0.12 });
}

function buildB06() {
  var smooth = sinePath(520, 230, 2);
  var stepped = "";
  var steps = 10;
  var w = 520;
  var h = 230;
  for (var i = 0; i < steps; i++) {
    var x1 = (i / steps) * w;
    var x2 = ((i + 1) / steps) * w;
    var y = yOnWave(x1 + 10, w, h, 2);
    stepped += (i === 0 ? "M" : "L") + x1.toFixed(1) + " " + y.toFixed(1) + " L" + x2.toFixed(1) + " " + y.toFixed(1) + " ";
  }
  var particles = "";
  for (var p = 0; p < 8; p++) {
    particles += '<i class="particle" style="left:' + (12 + p * 11) + "%;top:" + (20 + (p % 3) * 22) + '%"></i>';
  }
  return dom(
    '<div>' +
      '<div class="split">' +
        '<div class="panel sticker"><h3>模擬 · 連續</h3><svg viewBox="0 0 520 230" aria-hidden="true"><path class="smooth" d="' + smooth + '" fill="none" stroke="#141414" stroke-width="5"/></svg></div>' +
        '<div class="panel sticker"><h3>數碼 · 階梯</h3><svg viewBox="0 0 520 230" aria-hidden="true"><path class="stepped" d="' + stepped + '" fill="none" stroke="#141414" stroke-width="5"/></svg><div class="particles">' + particles + '<span class="loss-tag">資訊損耗</span></div></div>' +
      "</div>" +
      '<div class="stamp-wrap"><div class="stamp">離散近似值 → 必有資訊損耗</div></div>' +
    "</div>"
  );
}

function tweensB06(tl, root, start) {
  enter(tl, all(root, ".panel"), start + 0.1, { y: 20 }, { y: 0, stagger: 0.1, ease: "power3.out", duration: 0.36 });
  drawPath(tl, must(root, ".smooth"), start + 0.35, 0.8);
  drawPath(tl, must(root, ".stepped"), start + 1.15, 0.8);
  tl.to(all(root, ".particle"), { y: -28, autoAlpha: 0, duration: 0.8, stagger: 0.06, ease: "power1.in" }, start + 2.2);
  enter(tl, must(root, ".loss-tag"), start + 2.15, { scale: 0.6 }, { scale: 1, duration: 0.3 });
  tl.to(must(root, ".loss-tag"), { autoAlpha: 0, duration: 0.4 }, start + 3.3);
  enter(tl, must(root, ".stamp"), start + 3.55, { scale: 1.4, rotation: -14 }, { scale: 1, rotation: -6, duration: 0.45, ease: "back.out(1.8)" });
}

function pictureCells() {
  var rows = [
    "SSSSSSSSSY",
    "SSSSSSSSYY",
    "SSSSSSSYYY",
    "SSSSSSSSSS",
    "SSSSSSKKSS",
    "GGGGGGGGGG",
    "GGGGGGGGGG",
    "GDGGDGGDGG"
  ];
  var pal = { S: "#8EC5FF", Y: "#FFE14A", G: "#7DDE8A", K: "#141414", D: "#3E8B45" };
  return rows.join("").split("").map(function (ch) {
    return '<i data-c="' + pal[ch] + '"></i>';
  }).join("");
}

function buildB07() {
  return dom(
    '<div class="bitmap-layout">' +
      '<div><div class="px-frame"><div class="px-grid">' + pictureCells() + "</div></div></div>" +
      '<div class="side-stack">' +
        '<div class="meter-row">' +
          '<div class="meter-col">解像度<div class="meter"><i class="res-fill"></i></div>ppi / dpi</div>' +
          '<div class="meter-col">色彩深度<div class="meter"><i class="dep-fill"></i></div>bits</div>' +
        "</div>" +
        '<div class="swatches">' +
          '<div class="swatch sticker"><i style="background:#111"></i><b>1-bit</b>2 色</div>' +
          '<div class="swatch sticker"><i style="background:linear-gradient(#111,#ddd)"></i><b>8-bit</b>256 色</div>' +
          '<div class="swatch sticker"><i style="background:linear-gradient(90deg,#e23b3b,#ffe14a,#3d6bff)"></i><b>24-bit</b>約 1670 萬色</div>' +
        "</div>" +
      "</div>" +
    "</div>"
  );
}

function tweensB07(tl, root, start) {
  var cells = all(root, ".px-grid i");
  cells.forEach(function (cell, i) {
    tl.to(cell, { backgroundColor: cell.getAttribute("data-c"), duration: 0.15 }, start + 0.15 + i * 0.025);
  });
  tl.to(must(root, ".res-fill"), { height: "78%", duration: 0.9, ease: "power2.out" }, start + 2.4);
  tl.to(must(root, ".dep-fill"), { height: "88%", duration: 0.9, ease: "power2.out" }, start + 2.7);
  enter(tl, all(root, ".swatch"), start + 3.8, { y: 16 }, { y: 0, stagger: 0.35, duration: 0.3, ease: "power2.out" });
}

function buildB08() {
  return dom(
    '<div class="bitmap-layout">' +
      '<div>' +
        '<div class="px-frame zoom-target"><div class="px-grid">' + pictureCells() + "</div></div>" +
        '<svg class="jagged" viewBox="0 0 300 80" width="300" height="70" aria-hidden="true"><path class="jag" d="M10 60 H40 V40 H70 V55 H100 V28 H130 V48 H160 V18 H190 V42 H230 V22 H280" fill="none" stroke="#E23B3B" stroke-width="5"/></svg>' +
      "</div>" +
      '<div class="formula-board sticker">' +
        '<div class="terms byte-terms">' +
          '<span class="term">闊度</span><span class="term">×</span><span class="term">高度</span><span class="term">×</span>' +
          '<span class="term">色彩深度(bits)</span><span class="term">÷</span><span class="term">8</span><span class="term">=</span><span class="term">Bytes</span>' +
        "</div>" +
        '<p class="eq-live"><span class="w-val">100</span> × 100 × 24 ÷ 8 = <span class="b-val">30,000</span> Bytes</p>' +
        '<div class="bar-track"><div class="bar byte-bar"></div><span class="bar-val">Bytes</span></div>' +
      "</div>" +
    "</div>"
  );
}

function tweensB08(tl, root, start) {
  all(root, ".px-grid i").forEach(function (cell) {
    cell.style.backgroundColor = cell.getAttribute("data-c");
  });
  tl.fromTo(must(root, ".zoom-target .px-grid"), { scale: 1 }, { scale: 2.35, duration: 1.35, ease: "power2.inOut", transformOrigin: "30% 40%" }, start + 0.35);
  drawPath(tl, must(root, ".jag"), start + 1.9, 0.7);
  lightTerms(tl, all(root, ".byte-terms .term"), start + 2.8);
  var proxy = { w: 100 };
  tl.to(proxy, {
    w: 400,
    duration: 1.5,
    ease: "power1.inOut",
    onUpdate: function () {
      var w = Math.round(proxy.w);
      var bytes = w * 100 * 24 / 8;
      must(root, ".w-val").textContent = String(w);
      must(root, ".b-val").textContent = Math.round(bytes).toLocaleString("en-US");
    }
  }, start + 5.2);
  tl.to(must(root, ".byte-bar"), { width: "82%", duration: 1.5, ease: "power1.inOut" }, start + 5.2);
}

function buildB09() {
  return dom(
    '<div class="fmt-row">' +
      '<article class="fmt-card sticker" data-fmt="bmp"><h3>BMP</h3><div class="fmt-ico"><div class="file-bar"></div></div><p>無壓縮 · 體積最大</p></article>' +
      '<article class="fmt-card sticker" data-fmt="jpg"><h3>JPG</h3><div class="fmt-ico"><svg class="squash" viewBox="0 0 70 54" width="70" height="54"><rect x="4" y="8" width="62" height="38" fill="#B9D6FF" stroke="#141414" stroke-width="3"/></svg></div><p>有損 · 適合相片</p></article>' +
      '<article class="fmt-card sticker" data-fmt="png"><h3>PNG</h3><div class="fmt-ico"><div class="checker"></div><div class="shield"></div></div><p>無損 · 可透明</p></article>' +
      '<article class="fmt-card sticker" data-fmt="gif"><h3>GIF</h3><div class="fmt-ico"><div class="film-dots"><i></i><i></i><i></i></div></div><p>≤256 色 · 可動畫</p></article>' +
    "</div>"
  );
}

function tweensB09(tl, root, start) {
  enter(tl, all(root, ".fmt-card"), start + 0.15, { y: 30, scale: 0.92 }, { y: 0, scale: 1, stagger: 0.08, duration: 0.36, ease: "power3.out" });
  var cards = [
    ["[data-fmt=bmp]", 1.2],
    ["[data-fmt=jpg]", 2.6],
    ["[data-fmt=png]", 4.0],
    ["[data-fmt=gif]", 5.4]
  ];
  cards.forEach(function (pair, index) {
    if (index > 0) {
      tl.to(must(root, cards[index - 1][0]), { backgroundColor: "#FFFEFB", duration: 0.2 }, start + pair[1] - 0.05);
    }
    tl.to(must(root, pair[0]), { backgroundColor: "#D6FF3F", duration: 0.25 }, start + pair[1]);
  });
  tl.to(must(root, ".file-bar"), { width: "92%", duration: 0.8, ease: "power2.out" }, start + 1.3);
  tl.to(must(root, ".squash"), { scaleY: 0.55, duration: 0.35, yoyo: true, repeat: 1, transformOrigin: "center" }, start + 2.8);
  tl.fromTo(must(root, ".shield"), { y: -10 }, { y: 0, duration: 0.3, ease: "back.out(2)" }, start + 4.2);
  var frames = all(root, ".film-dots i");
  frames.forEach(function (frame, i) {
    tl.to(frame, { backgroundColor: i === 1 ? "#D6FF3F" : "#FFD0E8", duration: 0.2 }, start + 5.6 + i * 0.25);
  });
}

function buildB10() {
  return dom(
    '<div class="vector-layout">' +
      '<div class="zoom-frame sticker">' +
        '<svg viewBox="0 0 240 240" aria-hidden="true">' +
          '<path class="logo" d="M120 28 C190 28 214 92 188 140 C168 176 150 168 150 210 L90 210 C90 168 72 176 52 140 C26 92 50 28 120 28 Z" fill="none" stroke="#141414" stroke-width="6" vector-effect="non-scaling-stroke"/>' +
          '<circle class="handle" cx="190" cy="28" r="7"/><circle class="handle" cx="214" cy="92" r="7"/><circle class="handle" cx="168" cy="176" r="7"/>' +
        "</svg>" +
      "</div>" +
      '<div class="vector-side">' +
        '<div class="file-badge sticker">檔案仍然細 · 12 KB</div>' +
        '<div class="photo-no sticker"><div class="photo-sil"></div><div class="stamp">不適合相片</div></div>' +
      "</div>" +
    "</div>"
  );
}

function tweensB10(tl, root, start) {
  drawPath(tl, must(root, ".logo"), start + 0.15, 1.2);
  enter(tl, all(root, ".handle"), start + 1.45, { scale: 0 }, { scale: 1, stagger: 0.1 });
  tl.to(must(root, ".zoom-frame svg"), { scale: 2.15, duration: 1.6, ease: "power2.inOut", transformOrigin: "center" }, start + 2.2);
  enter(tl, must(root, ".file-badge"), start + 2.4, { y: 12 }, { y: 0, duration: 0.3, ease: "power2.out" });
  enter(tl, must(root, ".photo-no"), start + 4.5, { scale: 0.8, rotation: -8 }, { scale: 1, rotation: 0, duration: 0.4 });
  enter(tl, must(root, ".photo-no .stamp"), start + 5.05, { scale: 1.3, rotation: -12 }, { scale: 1, rotation: -8, duration: 0.35, ease: "back.out(1.8)" });
}

function buildB11() {
  return dom(
    '<div>' +
      '<svg class="path-line" viewBox="0 0 1100 120" aria-hidden="true"><path class="vpath" d="M 20 80 C 200 10, 400 110, 600 60 S 980 20, 1080 70" fill="none" stroke="#141414" stroke-width="5"/></svg>' +
      '<div class="vchip-row">' +
        '<div class="vchip sticker">SVG<small>HTML5</small></div>' +
        '<div class="vchip sticker">AI<small>Illustrator</small></div>' +
        '<div class="vchip sticker">EPS<small>封裝</small></div>' +
        '<div class="vchip sticker">WMF<small>Windows</small></div>' +
      "</div>" +
    "</div>"
  );
}

function tweensB11(tl, root, start) {
  var path = must(root, ".vpath");
  var len = drawPath(tl, path, start + 0.1, 0.7);
  enter(tl, all(root, ".vchip"), start + 0.45, { x: -50 }, { x: 0, stagger: 0.1, duration: 0.36, ease: "power3.out" });
  tl.to(must(root, ".vchip small"), { backgroundColor: "#D6FF3F", duration: 0.3 }, start + 2.1);
  if (len) {
    tl.fromTo(path, { strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.7, ease: "power1.inOut" }, start + 3.05);
  }
}

function termRow(words) {
  return words.map(function (word) {
    return '<span class="term">' + word + "</span>";
  }).join("");
}

function buildB12() {
  return dom(
    '<div class="formula-board sticker">' +
      '<div class="formula-row"><span class="kicker">未壓縮</span><div class="terms raw">' +
        termRow(["闊度", "×", "高度", "×", "色彩深度(bits)", "÷", "(8×1024×1024)", "=", "MB"]) +
      "</div></div>" +
      '<div class="bar-track"><div class="bar img-bar"></div><span class="bar-val img-a">1.37 MB</span><span class="bar-val img-b">0.14 MB · 10:1</span></div>' +
      '<p class="eq-live">例：800 × 600 × 24 ÷ (8×1024²) ≈ 1.37 MB</p>' +
      '<div class="formula-row"><span class="kicker">壓縮</span><div class="terms zip">' +
        termRow(["壓縮比率", "→", "MB 縮小"]) +
      "</div></div>" +
    "</div>"
  );
}

function tweensB12(tl, root, start) {
  lightTerms(tl, all(root, ".raw .term"), start + 0.3);
  tl.to(must(root, ".img-bar"), { width: "86%", duration: 0.9, ease: "power2.out" }, start + 2.6);
  enter(tl, must(root, ".img-a"), start + 3.2, {}, { duration: 0.25, ease: "power2.out" });
  enter(tl, all(root, ".zip .term"), start + 4.1, { x: -16 }, { x: 0, stagger: 0.12, duration: 0.3, ease: "power2.out" });
  tl.to(must(root, ".img-bar"), { width: "28%", duration: 0.8, ease: "power2.inOut" }, start + 5.0);
  tl.to(must(root, ".img-a"), { autoAlpha: 0, duration: 0.2 }, start + 5.55);
  enter(tl, must(root, ".img-b"), start + 5.65, {}, { duration: 0.25, ease: "power2.out" });
}

function buildB13() {
  var bars = "";
  for (var i = 0; i < 28; i++) {
    var h = 24 + ((i * 37) % 48);
    bars += '<i style="height:' + h + 'px"></i>';
  }
  return dom(
    '<div class="formula-board sticker">' +
      '<div class="formula-row"><span class="kicker">未壓縮</span><div class="terms raw">' +
        termRow(["聲道", "×", "位元解像度", "×", "取樣率(Hz)", "×", "時間(秒)", "÷", "(8×1024²)", "=", "MB"]) +
      "</div></div>" +
      '<p class="eq-live">例：2 × 16 × 44100 × 60 ÷ (8×1024²) ≈ 10.09 MB</p>' +
      '<div class="formula-row"><span class="kicker">壓縮</span><div class="terms zip">' +
        termRow(["位元率(kbps)", "×", "1000", "×", "時間", "÷", "(8×1024²)", "=", "MB"]) +
      "</div></div>" +
      '<p class="eq-live">例：128 kbps × 60 秒 ≈ 0.92 MB</p>' +
      '<div class="wave-bars">' + bars + "</div>" +
    "</div>"
  );
}

function tweensB13(tl, root, start) {
  lightTerms(tl, all(root, ".raw .term"), start + 0.25);
  enter(tl, all(root, ".zip .term"), start + 3.3, { y: 12 }, { y: 0, stagger: 0.08, duration: 0.28, ease: "power2.out" });
  tl.to(all(root, ".zip .term"), { backgroundColor: "#D6FF3F", duration: 0.2, stagger: 0.06 }, start + 4.3);
  tl.to(all(root, ".wave-bars i"), { scaleY: 0.42, duration: 0.7, stagger: 0.02, ease: "power2.inOut", transformOrigin: "bottom center" }, start + 5.2);
}

function buildB14() {
  var frames = "";
  for (var i = 0; i < 10; i++) frames += "<i></i>";
  return dom(
    '<div class="formula-board sticker">' +
      '<div class="formula-row"><span class="kicker">未壓縮</span><div class="terms raw">' +
        termRow(["幀闊", "×", "幀高", "×", "色彩深度(bits)", "×", "幀率(fps)", "×", "時間", "÷", "(8×1024³)", "=", "GB"]) +
      "</div></div>" +
      '<div class="unit-row"><span class="unit unit-gb">GB</span><span>未壓縮 → GB · 例：1280×720×24(bits)×30fps×60秒 ≈ 4.64 GB</span></div>' +
      '<div class="formula-row"><span class="kicker">壓縮</span><div class="terms zip">' +
        termRow(["位元率(Mbps)", "×", "10⁶", "×", "時間", "÷", "(8×1024²)", "=", "MB"]) +
      "</div></div>" +
      '<div class="unit-row"><span class="unit unit-mb">MB</span><span>壓縮 → MB · 例：8 Mbps × 60 秒 ≈ 57.2 MB</span></div>' +
      '<div class="film-strip">' + frames + "</div>" +
    "</div>"
  );
}

function tweensB14(tl, root, start) {
  lightTerms(tl, all(root, ".raw .term"), start + 0.2);
  enter(tl, must(root, ".unit-gb"), start + 2.8, { scale: 0.6 }, { scale: 1, duration: 0.3 });
  tl.to(must(root, ".unit-gb"), { backgroundColor: "#D6FF3F", duration: 0.25 }, start + 3.15);
  enter(tl, all(root, ".zip .term"), start + 3.8, { y: 10 }, { y: 0, stagger: 0.08, duration: 0.26, ease: "power2.out" });
  tl.to(all(root, ".zip .term"), { backgroundColor: "#B9D6FF", duration: 0.2, stagger: 0.05 }, start + 5.0);
  enter(tl, must(root, ".unit-mb"), start + 5.3, { scale: 0.6 }, { scale: 1, duration: 0.3 });
  tl.to(must(root, ".unit-mb"), { backgroundColor: "#D6FF3F", duration: 0.25 }, start + 5.6);
  tl.fromTo(must(root, ".film-strip"), { scaleX: 1 }, { scaleX: 0.48, duration: 0.8, ease: "power2.inOut" }, start + 6.0);
}

function buildB15() {
  return dom(
    '<div>' +
      '<div class="recap-row">' +
        '<article class="recap-panel sticker"><h3>①</h3><p>取樣 + 量化</p><p>→ 資訊損耗</p></article>' +
        '<article class="recap-panel sticker"><h3>②</h3><p>點陣圖放大起鋸齒</p><p>向量圖保持銳利</p></article>' +
        '<article class="recap-panel sticker"><h3>③</h3><p>三條檔案大小公式</p><div class="mini-row"><span>圖像</span><span>音效</span><span>視像</span></div></article>' +
      "</div>" +
      '<div class="stamp-wrap"><div class="stamp" style="border-color:#141414;color:#141414;background:#D6FF3F">純複習 · 記住公式關鍵詞</div></div>' +
    "</div>"
  );
}

function tweensB15(tl, root, start) {
  enter(tl, all(root, ".recap-panel"), start + 0.15, { y: 40 }, { y: 0, stagger: 0.16, duration: 0.42, ease: "power3.out" });
  enter(tl, all(root, ".mini-row span"), start + 2.2, { scale: 0.7 }, { scale: 1, stagger: 0.1 });
  enter(tl, must(root, ".stamp"), start + 4.4, { scale: 1.35, rotation: -10 }, { scale: 1, rotation: -3, duration: 0.45, ease: "back.out(1.7)" });
}
