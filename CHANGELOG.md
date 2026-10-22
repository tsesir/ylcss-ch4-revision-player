# Changelog

## 另一路徑：可收合控制列與全螢幕

`/ui-collapse/` 係另一套畫面。根目錄 `/`（`index.html`、`css/player.css`、`js/player.js`）行為不變：控制列仍然一路展開，沒有全螢幕按鈕。

- 載入時控制列預設收合，舞台下只留「展開控制」同「全螢幕」。再按一下變「收合控制」，語速、聲線、字幕開關、字幕大小、播放列同旁白停頓會再出現。
- 收合狀態會記在 `localStorage` 鍵 `ch4-ui-collapse-dock`（`open` 或 `collapsed`）。第一次沒有紀錄，所以係收合。
- 「全螢幕」對播放器外殼 `#playerShell` 呼叫 Fullscreen API（含 `webkitRequestFullscreen`）。成功後按鈕變「離開全螢幕」；再按或按 Esc 退出。
- **Safari／iOS 後備：** 非 video 元素喺 iOS Safari 上，`requestFullscreen` 好多時唔存在或會拒絕；內嵌 iframe 如果冇 `allow="fullscreen"` 都會失敗。失敗時加上 `.is-fs-fallback`，外殼用 `position: fixed` 填滿視窗（`100dvh`），並顯示約 4.5 秒提示：「此瀏覽器未能使用系統全螢幕，已改為填滿畫面。」再按「離開全螢幕」或 Esc 還原。Chromium 走系統全螢幕，唔會出呢句。

## 放大動畫內容字級

手機直向先看教學內容。舞台仍是 1280×720 再縮放；這次只加大場景裡的教學文字，並收緊留白。字幕「小／中／大」、`localStorage` 鍵 `ch4-player-sub-size` 與預設「大」（40px）維持不變。

舞台座標 px，相對上一版（約 390px 寬畫面、縮放約 0.29）：

- 節標題 `.beat-title` 36 → 44（畫面上約 10 → 13）
- 關鍵詞 `.kw` 22 → 26（約 6 → 8）
- 開場大標 `.hero h2` 40 → 52（約 12 → 15）
- 卡片正文 `.fmt-card p`、`.recap-panel p`、場景基準 16 → 22（約 4.5 → 6.4）
- 四欄／重溫標題 28 → 36；公式詞 `.term` 18 → 22；算式 `.eq-live` 22 → 26
- 步驟 `.step b` 28 → 34；分欄標題 `.panel h3` 20 → 26
- 字幕 `.sub-bar` 仍跟「小／中／大」走（20／30／40），預設 40

## 字幕大小與底部字幕帶

學生純播放頁加上字幕字級，並把字幕帶拉高，填滿畫面底部原本留白的位置。字幕仍然預設開啟，沒有測驗。

- 控制列「字幕開」旁邊新增 **小／中／大**（`data-testid`：`sub-size-s`、`sub-size-m`、`sub-size-l`）。按鈕樣式跟其他 `.ctrl` 一致。
- 預設是 **大**。選擇即時生效，並寫入 `localStorage` 鍵 `ch4-player-sub-size`（值為 `s`、`m` 或 `l`）。
- 字級是舞台座標、縮放前的 px：
  - 小：20px（改動前的字幕字級）
  - 中：30px
  - 大：40px（預設）
- 字幕帶加闊、加高，行高與內距加大，最多仍然兩行，黑底白字配螢光邊。
- 頂列標題（36px）與關鍵詞（22px）略為加大。場景卡片、四欄格式卡與公式字級維持不變。
