/* Runtime beat sheet. Mirrors beats.json. Timed captions live in js/cues.js. */
var CH4_BEATS = [
  {
    "id": "B01",
    "title": "開場｜第4章多媒體與數碼化",
    "duration_s": 5,
    "visual": "Title card fades in:「第4章 多媒體元素及數碼化」. Three media icons (image / waveform / film strip) slide in from left, then a glowing arrow labelled 模擬→數碼 sweeps across them.",
    "keyword": "數碼化 Digitisation",
    "script_refs": { "yue": "B01", "cmn": "B01", "en": "B01" },
    "notes": "Intro only; no quiz tease. Crossfade into B02."
  },
  {
    "id": "B02",
    "title": "數碼化兩部曲總覽",
    "duration_s": 6,
    "visual": "Continuous analogue sine wave draws left→right. Two numbered badges pop: ① 取樣 Sampling, ② 量化 Quantization. Wave pulses once to hint it will be discretised.",
    "keyword": "取樣 · 量化",
    "script_refs": { "yue": "B02", "cmn": "B02", "en": "B02" },
    "notes": "Set up two-step structure before detailing each."
  },
  {
    "id": "B03",
    "title": "取樣 Sampling",
    "duration_s": 7,
    "visual": "Analogue wave stays. Vertical sample ticks appear at fixed intervals; amplitude dots snap onto the wave at each tick. Slider labelled 取樣率 rises → ticks denser → reconstructed curve looks closer to original.",
    "keyword": "取樣率 Sampling rate",
    "script_refs": { "yue": "B03", "cmn": "B03", "en": "B03" },
    "notes": "Action: wave→sample dots; higher rate→more fidelity. Spell Hz if spoken."
  },
  {
    "id": "B04",
    "title": "量化 Quantization",
    "duration_s": 7,
    "visual": "Sample dots slide horizontally onto a ladder of discrete amplitude levels. Bit-depth meter steps from 4-bit (few coarse steps) to 16-bit (many fine steps); dots snap to nearest level.",
    "keyword": "位元解像度 Bit depth",
    "script_refs": { "yue": "B04", "cmn": "B04", "en": "B04" },
    "notes": "Action: continuous amplitude→discrete binary levels. Higher bit depth→finer range."
  },
  {
    "id": "B05",
    "title": "硬體 ADC DAC CCD CMOS",
    "duration_s": 7,
    "visual": "Sound-card icon: analogue wave enters ADC chip → binary stream exits; reverse path through DAC back to speaker wave. Camera icon: light hits CCD/CMOS sensor grid → pixel values light up.",
    "keyword": "A D C · D A C",
    "script_refs": { "yue": "B05", "cmn": "B05", "en": "B05" },
    "notes": "TTS pause cue for A D C / D A C / C C D / C M O S. Brief hardware map only."
  },
  {
    "id": "B06",
    "title": "核心理念｜資訊損耗",
    "duration_s": 6,
    "visual": "Side-by-side: smooth analogue curve vs stepped digital reconstruction. Missing detail between samples fades out as red particles labelled 資訊損耗. Banner:「離散近似值 → 必有資訊損耗」.",
    "keyword": "資訊損耗",
    "script_refs": { "yue": "B06", "cmn": "B06", "en": "B06" },
    "notes": "Core exam idea: digitisation = discrete approximation → always information loss."
  },
  {
    "id": "B07",
    "title": "點陣圖結構與畫質",
    "duration_s": 7,
    "visual": "Blank rectangle fills cell-by-cell into a pixel grid. Two meters rise: 解像度 (ppi/dpi) and 色彩深度 (bits). Sample pixels flash different colour depths (1-bit→8-bit→24-bit).",
    "keyword": "點陣圖 Bitmap",
    "script_refs": { "yue": "B07", "cmn": "B07", "en": "B07" },
    "notes": "Quality = resolution + colour depth. Structure = rectangular pixel grid."
  },
  {
    "id": "B08",
    "title": "點陣圖縮放與位元組公式",
    "duration_s": 8,
    "visual": "Small sharp bitmap zooms in → pixels enlarge → jagged edges appear. Formula terms light up one by one: 闊度 × 高度 × 色彩深度(bits) ÷ 8 = Bytes. Result counter ticks up as W/H/depth increase.",
    "keyword": "檔案大小 Bytes",
    "script_refs": { "yue": "B08", "cmn": "B08", "en": "B08" },
    "notes": "Dense formula beat — may need >8s after TTS retime. Scales poorly (jagged)."
  },
  {
    "id": "B09",
    "title": "點陣圖常見格式",
    "duration_s": 8,
    "visual": "Four format cards flip in sequence: BMP (huge uncompressed), JPG (lossy photo), PNG (lossless + transparency), GIF (256 colours + animation). Icons animate: squash=lossy, shield=lossless, checkerboard=transparency, film=animation.",
    "keyword": "BMP JPG PNG GIF",
    "script_refs": { "yue": "B09", "cmn": "B09", "en": "B09" },
    "notes": "Brief contrast only as in Notion. Spell acronyms with pauses for TTS."
  },
  {
    "id": "B10",
    "title": "向量圖結構與縮放",
    "duration_s": 7,
    "visual": "Bezier path draws a logo from math control points. Zoom lens expands hugely — edges stay razor-sharp. Tiny file-size badge stays small while zoom grows. Contrast flash: photo silhouette stamped「不適合」.",
    "keyword": "向量圖 Vector",
    "script_refs": { "yue": "B10", "cmn": "B10", "en": "B10" },
    "notes": "Resolution-independent; scales sharp; small files; not for photos."
  },
  {
    "id": "B11",
    "title": "向量圖常見格式",
    "duration_s": 5,
    "visual": "Four format chips slide onto a path: SVG, AI, EPS, WMF. SVG chip glows with HTML5 badge. Path redraws once to reinforce math definition.",
    "keyword": "SVG AI EPS WMF",
    "script_refs": { "yue": "B11", "cmn": "B11", "en": "B11" },
    "notes": "Keep brief; SVG noted as HTML5-supported per Notion."
  },
  {
    "id": "B12",
    "title": "公式｜圖像檔案大小",
    "duration_s": 8,
    "visual": "Formula board: Image card. Uncompressed line terms light left→right: 闊度×高度×色彩深度(bits)÷(8×1024×1024)=MB. Then compressed branch: 壓縮比率 arrow shrinks the MB bar.",
    "keyword": "圖像公式 Image",
    "script_refs": { "yue": "B12", "cmn": "B12", "en": "B12" },
    "notes": "Dense; allow longer after TTS. Compressed = by compression ratio (no closed formula in Notion)."
  },
  {
    "id": "B13",
    "title": "公式｜音效檔案大小",
    "duration_s": 8,
    "visual": "Audio card. Uncompressed terms light one-by-one: 聲道×位元解像度×取樣率(Hz)×時間(秒)÷(8×1024×1024)=MB. Switch to compressed: 位元率(kbps)×1000×時間÷(8×1024×1024)=MB; waveform compresses.",
    "keyword": "音效公式 Audio",
    "script_refs": { "yue": "B13", "cmn": "B13", "en": "B13" },
    "notes": "Dense formula beat. Speak kbps as「千位元每秒」or letter-spaced K B P S for TTS review."
  },
  {
    "id": "B14",
    "title": "公式｜視像檔案大小",
    "duration_s": 8,
    "visual": "Video card. Uncompressed: 幀闊×幀高×色彩深度(bits)×幀率(fps)×時間÷(8×1024³)=GB — terms light sequentially; unit badge flips to GB. Compressed: 位元率(Mbps)×10⁶×時間÷(8×1024²)=MB; film strip shrinks.",
    "keyword": "視像公式 Video",
    "script_refs": { "yue": "B14", "cmn": "B14", "en": "B14" },
    "notes": "Approved 2026-10-22: units GB/MB as UT/Notion; colour depth shown as (bits) on screen + VO."
  },
  {
    "id": "B15",
    "title": "短重溫 Recap",
    "duration_s": 7,
    "visual": "Three recap panels fly in: (1) 取樣+量化→資訊損耗; (2) 點陣圖 jagged zoom vs 向量圖 sharp zoom; (3) 圖像/音效/視像 formula icons. Final stamp:「純複習 · 記住公式關鍵詞」. Fade out.",
    "keyword": "重溫 Recap",
    "script_refs": { "yue": "B15", "cmn": "B15", "en": "B15" },
    "notes": "No quiz / no 試一試. End of pure playback."
  }
];
