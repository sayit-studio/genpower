# 極限章魚燒王 圖片資產管理規格書

📋 assets-management.md v1.0
品牌：明仁二代目章魚燒
建立日期：2025-05-15
資料來源：業主提供素材 + 規劃需求
完整度：30%（LOGO已提供，其餘為佔位規劃）

---

## 資料夾結構

```
/assets/
  /logo/
    logo-circle.png          ✅ 已提供（品牌圓形LOGO）
    logo-square.png          ✅ 已提供（品牌方形LOGO）
    event-logo-full.png      ✅ 已提供（活動主視覺全圖）
    event-logo-text.png      ✅ 已提供（純字體版活動LOGO）

  /hero/
    hero-bg.jpg              ⬜ 需生成（Hero全寬背景）
    hero-mascot.png          ⬜ 需生成（章魚吉祥物去背）
    hero-battle-logo.png     → 使用 event-logo-full.png 即可

  /event/
    event-intro-bg.jpg       ⬜ 需生成（活動介紹區背景）
    event-venue-photo.jpg    ⬜ 待業主提供（活動現場照）

  /stages/
    stage-01.jpg             ⬜ 待業主確認關卡後生成
    stage-02.jpg             ⬜ 待業主確認關卡後生成
    stage-03.jpg             ⬜ 待業主確認關卡後生成
    stage-04.jpg             ⬜ 待業主確認關卡後生成

  /prizes/
    prize-champion.png       ⬜ 需生成（冠軍獎盃）
    prize-runner-up.png      ⬜ 需生成（亞軍獎項）
    prize-third.png          ⬜ 需生成（季軍獎項）
    prize-special.png        ⬜ 需生成（特別獎）

  /merchandise/
    merch-tshirt.jpg         ✅ 已提供（黑底活動T-shirt）
    merch-headband.jpg       ✅ 已提供（必勝頭巾）
    merch-towel.jpg          ✅ 已提供（全彩熱昇華毛巾）
    merch-fan.jpg            ✅ 已提供（荷葉扇雙面）

  /sponsors/
    sponsor-main-01.png      ⬜ 待業主提供
    sponsor-main-02.png      ⬜ 待業主提供
    sponsor-sub-01.png       ⬜ 待業主提供

  /players/
    player-placeholder.jpg   ⬜ 需生成（賽前蒙版佔位）
    player-01.jpg            ⬜ 待業主提供
    player-02.jpg            ⬜ 待業主提供
    （依選手人數補充）

  /icons/
    icon-fire.svg            ⬜ 需製作（火焰icon）
    icon-octopus.svg         ⬜ 需製作（章魚icon）
    icon-trophy.svg          ⬜ 需製作（獎盃icon）
    icon-timer.svg           ⬜ 需製作（倒數計時icon）
    icon-crown.svg           ⬜ 需製作（王冠icon）
    icon-line.svg            ⬜ 需製作（LINE登入icon）

  /textures/
    bg-noise.png             ⬜ 需生成（全站背景噪點紋理）
    bg-japanese-wave.png     ⬜ 需生成（日式波浪紋路）
    bg-explosion.png         ⬜ 需生成（爆炸放射線紋路）
```

---

## 圖片生成 Prompt 清單

> 使用工具：Midjourney / Adobe Firefly / Stable Diffusion
> 風格基準：日本職人 × 熱血漫畫爆炸感 × 極限競技

---

### `hero/hero-bg.jpg`
**用途**：首頁 Hero 全寬背景
**尺寸建議**：1920×1080px
```
Dark dramatic background for a Japanese takoyaki battle competition event. Deep black base (#0D0D0D) with bold red radial burst lines from center, scattered fire sparks and golden embers floating, ink splatter texture overlay, extreme sports manga energy. No text, no characters, no logos. Cinematic widescreen composition. --ar 16:9 --style raw
```

---

### `hero/hero-mascot.png`
**用途**：首頁 Hero 主角圖（去背）
**尺寸建議**：800×1000px，PNG 去背
```
Cute but fierce red octopus takoyaki mascot character, wearing a white sumo shimenawa rope headband, fire-flame eyes, surrounded by golden crispy takoyaki balls, explosive battle pose, radiating energy speed lines behind, Japanese manga comic illustration style, bold black outlines, high contrast red and gold color scheme, white background for easy extraction, full body visible. --ar 4:5 --style raw
```

---

### `event/event-intro-bg.jpg`
**用途**：活動介紹 Section 背景
**尺寸建議**：1920×600px
```
Traditional Japanese indigo blue background (#1A2A6C) with elegant seigaiha scale wave pattern in subtle lighter blue, gold calligraphy brushstroke accent lines, aged paper texture overlay, Japanese craftsman aesthetic. Dark, sophisticated, no people, no text. Horizontal banner format. --ar 32:10 --style raw
```

---

### `prizes/prize-champion.png`
**用途**：冠軍獎盃展示圖
**尺寸建議**：600×600px
```
Golden championship trophy with octopus tentacle relief carvings, glowing golden aura with light rays, Japanese battle competition aesthetic, crown on top with red gemstone, dramatic studio lighting, black background, isolated product shot for web display. --ar 1:1 --style raw
```

---

### `players/player-placeholder.jpg`
**用途**：選手賽前蒙版佔位圖
**尺寸建議**：400×400px
```
Dark dramatic silhouette of a food competition challenger, arms crossed, red backlight rim lighting, smoke fog effects, red and black color scheme, Japanese battle game show atmosphere, large bold question mark in red overlaid on chest area, portrait orientation. --ar 1:1 --style raw
```

---

### `textures/bg-japanese-wave.png`
**用途**：全站日式波浪背景紋路（可平鋪）
**尺寸建議**：400×400px（tileable）
```
Traditional Japanese seigaiha wave scale pattern, dark navy blue (#1A2A6C) base, subtle gold outline on each scale, flat 2D graphic design, seamless tileable texture, no gradients, vector-clean style. --ar 1:1 --style raw --tile
```

---

### `textures/bg-explosion.png`
**用途**：報名流程 Section 背景紋路
**尺寸建議**：1920×600px
```
Japanese manga explosion radial burst line pattern, black background with bold red and dark crimson radiating lines from off-center point, golden spark dots scattered, flat graphic style, no characters, no text, high energy pattern. --ar 32:10 --style raw
```

---

### `stages/stage-0X.jpg`（關卡圖通用版，套用4次）
**用途**：關卡介紹卡片圖
**尺寸建議**：600×400px
```
Japanese extreme eating challenge arena stage illustration, dramatic top-down perspective, circular competition ring with red and black markings, fire torch accents around perimeter, golden timer display, anime game show stage design, no people, intense atmosphere. --ar 3:2 --style raw
```

---

## 素材狀態總表

| 素材 | 狀態 | 來源 |
|------|------|------|
| 品牌圓形LOGO | ✅ 完成 | 業主提供 |
| 品牌方形LOGO | ✅ 完成 | 業主提供 |
| 活動主視覺全圖 | ✅ 完成 | 業主提供 |
| 活動純字體LOGO | ✅ 完成 | 業主提供 |
| T-shirt展示 | ✅ 完成 | 業主提供 |
| 毛巾展示 | ✅ 完成 | 業主提供 |
| 頭巾展示 | ✅ 完成 | 業主提供 |
| 扇子展示 | ✅ 完成 | 業主提供 |
| Hero背景 | ⬜ 待生成 | AI生成（見Prompt）|
| 吉祥物去背 | ⬜ 待生成 | AI生成（見Prompt）|
| 關卡場景圖×4 | ⬜ 待業主確認關卡後生成 | AI生成 |
| 獎盃圖×3 | ⬜ 待生成 | AI生成 |
| 選手佔位圖 | ⬜ 待生成 | AI生成 |
| 選手照片 | ⬜ 待業主提供 | 業主提供 |
| 贊助商Logo | ⬜ 待業主提供 | 業主提供 |
| 日式波浪紋路 | ⬜ 待生成 | AI生成 |
| 爆炸放射紋路 | ⬜ 待生成 | AI生成 |
| 活動介紹背景 | ⬜ 待生成 | AI生成 |
| 獎盃圖 | ⬜ 待生成 | AI生成 |
| SVG icon ×6 | ⬜ 待製作 | 手工/AI |
