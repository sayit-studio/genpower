# 極限章魚燒王 網站設計規格書

📋 design-spec.md v1.0
建立日期：2026-05-17
適用範圍：HomePage / RegisterPage / VotePage
維護方式：每次區塊定案後更新對應章節

---

## 一、網站主題與視覺概念

| 項目 | 內容 |
|------|------|
| 主題定調 | 黑色電影感競技大賽 × 日式職人品牌 |
| 視覺語言 | 格鬥/電競賽事美學套用於美食競賽 |
| 情感目標 | 讓訪客感受到「這是一場真正的對決」 |
| 參考方向 | 深色格鬥遊戲選擇畫面、UFC 賽事官網、日系大胃王節目感 |
| 禁忌風格 | 可愛台式小吃風、過亮色系、花俏動效堆疊 |

---

## 二、主色系（Color System）

### 品牌核心色

| 色名 | Hex | 用途 |
|------|-----|------|
| Brand Dark | `#0D0D0D` | 全站底色、section 背景基準 |
| Brand Red | `#CC1200` | CTA 按鈕、強調色、Section 英文小標、重點文字 |
| Brand Gold | `#D4A017` | 冠軍/獎金文字、裝飾元素、金色粒子 |
| Brand Blue | `#1A2A6C` | Logo 底色（僅限品牌 Logo 使用，不用於頁面） |
| Brand Orange | `#FF6B00` | 限定標籤（現場限定 Badge）、緊迫感元素 |

### 文字色階

| 層次 | 色值 | 用途 |
|------|------|------|
| 主文字 | `#FFFFFF` | 標題、重要文字 |
| 次文字 | `rgba(255,255,255,0.85)` | 副標題 |
| 說明文字 | `rgba(255,255,255,0.65)` | 描述段落 |
| 輔助標籤 | `rgba(255,255,255,0.50)` | 說明標籤、Caption |
| 極淡 | `rgba(255,255,255,0.08)` | 裝飾性大字（水印效果） |

### 疊加/遮罩色

| 用途 | 色值 |
|------|------|
| Hero 左側遮罩 | `linear-gradient(to right, rgba(0,0,0,0.75), rgba(0,0,0,0.45) 45%, transparent 75%)` |
| Hero 底部溶入 | `linear-gradient(to top, #0D0D0D 0%, rgba(13,13,13,0.92) 8%, rgba(13,13,13,0.5) 22%, transparent 50%)` |
| 全站背景 overlay | `rgba(0,0,0,0.78)` 疊於 site-bg.png |
| 圖片遮罩（關卡卡片）| `linear-gradient(180deg, transparent 25%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.88) 100%)` |

---

## 三、背景系統（Background System）

### 架構說明

```
Layer 0（最底）: body background-color #0D0D0D（fallback）
Layer 1:         /assets/bg/site-bg.png — background-attachment: fixed，不隨滾動
Layer 2:         rgba(0,0,0,0.78) 全域深色 overlay（CSS background-image 堆疊）
Layer 3:         body::before — 噪點紋路 opacity 0.04（全站統一質感）
Layer 4:         各 Section 透明背景，底層背景透出
Layer 5（Hero）: /assets/hero/hero-bg.png — Hero 區塊專屬高畫質背景圖
Layer 6:         Particles — 金色漂浮粒子（全站，App.tsx 層）
```

### 規則

- **除 Hero 以外，所有 section 背景設為透明**（不設 background 屬性）
- Hero 底部使用硬性漸層 fade 至 `#0D0D0D`，`marginBottom: -80px` 讓 About section 從 Hero 下方延伸
- 不使用 section 間的分隔線（FlamesDivider 已移除）
- 手機版 `background-attachment: scroll`（iOS Safari 不支援 fixed）

---

## 四、字體系統（Typography）

### 字型

| 字型 | 用途 | 來源 |
|------|------|------|
| Noto Serif TC | 標題、品牌文字、數字展示 | Google Fonts |
| Noto Sans TC | 說明文字、標籤、Body | Google Fonts |

### 字級規範

| 元素 | 字型 | 大小 | 字重 | 用途 |
|------|------|------|------|------|
| Hero H1 | Serif | `clamp(48px, 6vw, 88px)` | 900 | 主標「極限章魚燒王」 |
| Section H2 | Serif | `clamp(28px, 4vw, 52px)` | 900 | 各 section 中文主標 |
| Section H3 | Serif | `clamp(18px, 2.5vw, 28px)` | 700 | 副標題 |
| 英文小標 | Sans | `11px`, letter-spacing: 5-8px | 400 | 已移除（Hero 已刪）|
| 數字展示 | Serif | `28–72px` | 900 | 獎金、統計數字 |
| Body | Sans | `13–15px` | 400 | 描述段落 |
| Caption/標籤 | Sans | `11–12px` | 400/500 | Badge、說明標籤 |
| 手機 Hero H1 | Serif | `clamp(36px, 9vw, 52px)` | 900 | 手機版主標 |

### Letter Spacing 規範

| 元素 | 值 |
|------|----|
| Hero 主標 | `4px` |
| Hero 副標 | `3px` |
| Section 英文小標 | `5px` |
| 品牌相關強調 | `3px` |

---

## 五、版面系統（Layout）

### 寬度規範

| 區塊 | max-width |
|------|-----------|
| About section | `max-w-6xl` (1152px) |
| Stages grid | 全寬 |
| Prizes | 全寬置中 |
| Process | `900px` |
| Merch | `900px` |
| Players | `1000px` |
| Header | `max-w-7xl` (1280px) |

### 水平留白

| 情境 | 值 |
|------|-----|
| 手機最小邊距 | `24px` |
| 桌機標準 padding | `32–64px` |
| Tailwind px-4 | 16px（小螢幕） |

### 垂直間距（Section Padding）

| Section | 上 | 下 |
|---------|----|----|
| Hero | `100vh` min-height | 負 margin `-80px`（溶入） |
| About | 96px | 96px |
| Stages | 80px | 0 |
| Prizes | 80px | 80px |
| Process | 100px | 100px |
| Merch | 96px | 96px |
| Players | 96px | 96px |

---

## 六、設計元素與元件

### 全站固定元件（App.tsx 層）

| 元件 | 說明 | 狀態 |
|------|------|------|
| Header | 固定頂部導覽列，scroll 後加陰影 | ✅ |
| Particles | 金色漂浮粒子 count=50 | ✅ |
| TakoyakiFloat | 右下角章魚燒浮動裝飾 | ✅ |
| IntroAnimation | 頁面初次載入動畫 | ✅ |
| Footer | 頁腳 | ✅ |

### 動效元件（ReactBits）

| 元件 | 用途 | 所在區塊 |
|------|------|---------|
| SplitText | 逐字展開動畫 | Hero 主標 |
| BlurText | 模糊淡入動畫 | Hero 副標 |
| CountUp | 數字累計動畫 | About 統計數字 |
| SectionWrapper | ScrollTrigger 淡入容器 | 所有主要 section |
| GrainGradient | 顆粒漸層 | Players 選手卡 |
| GradientText | 漸層文字 | Merch / Players 標題 |

### 互動元素

| 元素 | 行為 | 所在區塊 |
|------|------|---------|
| Stage 卡片 | hover 圖片 scale 1.06 | Stages |
| 投票 CTA | ripple-pulse 波紋動畫 | Players |
| LavaButton | 報名 CTA 按鈕 | Hero / Header |
| Header Logo | 純連結（已移除 Magnet 效果）| Header |

### 不使用的元素（已移除）

| 元素 | 原因 |
|------|------|
| SplashCursor | 滑鼠墨水特效，視覺干擾 |
| Magnet（Logo）| Header Logo 磁力效果 |
| FlamesDivider | section 間分隔線 |
| 英文小標（Hero）| 主標上方 TAKOYAKI BATTLE 文字 |

---

## 七、頁面架構

### 全站頁面（3 頁）

| 路由 | 頁面 | 說明 |
|------|------|------|
| `/` | HomePage | 主要 landing page |
| `/register` | RegisterPage | 報名表單頁 |
| `/vote` | VotePage | 投票預測頁 |

### HomePage Section 順序

```
1. HeroSection      — 全螢幕主視覺，立即報名 CTA
2. AboutSection     — 品牌故事 + 三項統計數字
3. StagesSection    — 三關賽制卡片
4. PrizesSection    — 獎金展示
5. ProcessSection   — 5步驟報名流程
6. MerchSection     — 周邊商品 2×2 網格
7. PlayersSection   — 30位選手格子 + 投票 CTA
```

---

## 八、各 Section 內容規格

### HeroSection
- 背景：`/assets/hero/hero-bg.png`（absoluteを全圖覆蓋）
- 主標：「極限章魚燒王」Serif 900
- 副標：「滾燙章魚燒 等你來挑戰」
- CTA：LavaButton「立即報名」→ `/register`
- 位置：`left: calc(50% - 320px), bottom: 12vh`（桌機）/ 全寬 `bottom: 8vh`（手機）
- 底部：漸層溶入 `#0D0D0D`，`marginBottom: -80px`

### AboutSection
- Logo 圖：`/assets/logo/logo-circle.png`（w-20）
- H2（紅）：「傳承職人精神」
- H3（白）：「舉辦台灣首場章魚燒大胃王挑戰賽」
- 說明段落：職人傳承文案
- 統計三項：`30 位挑戰者` / `3 關極限考驗` / `NT$20,000 總獎金`（金色數字）
- 右側（桌機）：`NT$20,000` 裝飾性大字 opacity 0.08

### StagesSection
- 三格橫排卡片（手機 1 欄）
- 每張卡：背景圖 + hover zoom + 底部漸層文字層
- 內容：code（STAGE 01）/ 名稱 / 描述 / 時間
- 圖片路徑：`/assets/stages/stage-0x-xxx.png`

### PrizesSection
- 無背景圖（純文字展示）
- H2：「你敢來，就有機會帶走」
- 三欄：亞軍（左）/ 冠軍（中，金色放大）/ 季軍（右）
- 金額顯示：NT$20,000 / NT$5,000 / NT$3,000

### ProcessSection
- 5步驟橫向流程（桌機）/ 垂直（手機）
- 每步驟：紅色圓圈數字 + 章魚燒圖示（步驟數量）+ 標題 + 描述
- 連接線：紅→金漸層橫線 + 流光動點

### MerchSection
- 2×2 網格（4件商品）
- 每件：商品圖 + 底部名稱 + 費用包含/現場限定 Badge
- 標題：「參賽者物資」（漸層文字）

### PlayersSection
- 5×6 格子（30位選手，賽前顯示問號）
- 底部：投票 CTA 按鈕（ripple 動畫）
- 標題：「挑戰者名單」（漸層文字）

---

## 九、響應式規則

| 斷點 | 值 | 主要調整 |
|------|-----|---------|
| 手機 | `max-width: 768px` | 單欄、字體縮小、Hero 位置調整 |
| 桌機 | `min-width: 769px` | 多欄、完整版面 |

| 元素 | 手機 | 桌機 |
|------|------|------|
| Hero 位置 | 全寬 bottom 8vh | calc(50%-320px) bottom 12vh |
| Stages | 1欄 4:3 | 3欄橫排 16:10 |
| About | 單欄垂直 | 左右各50% |
| Process | 垂直步驟 | 水平流程 |
| Prizes | 垂直堆疊 | 三欄橫排 |
| body background | scroll | fixed |

---

## 十、定案事項（不再更動）

以下項目已定案，後續區塊優化不觸碰：

- [x] 主色系（Dark / Red / Gold）
- [x] 字型組合（Noto Serif TC + Noto Sans TC）
- [x] 全站無邊框設計（`* { border: none !important }`）
- [x] 背景系統（site-bg.png fixed + hero-bg.png）
- [x] Section 間無分隔線
- [x] 全站不使用滑鼠特效（SplashCursor 已移除）
- [x] 全站路由架構（3頁）
- [x] 技術棧（React 18 + Vite + Tailwind + Framer Motion）
