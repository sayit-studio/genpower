# 極限章魚燒王 活動網站架構規格書

📋 website-architecture.md v2.0
最後更新：2025-05-16
變更：移除贊助商Section、Hero改靠左RWD、Stages改三格圖片卡、Prizes改下戰帖單張背景

---

## 網站類型
多頁式 — 3頁（React + Vite + TypeScript）

| 頁面 | 路徑 |
|------|------|
| 首頁 | `/#/` |
| 報名頁 | `/#/register` |
| 投票頁 | `/#/vote` |

## 部署
GitHub + Cloudflare Pages（HashRouter）

---

## 全站設計系統

| 項目 | 規格 |
|------|------|
| 主色 | `#CC1200` 熱血紅 |
| 金色 | `#D4A017` 爆炸金 |
| 橘色 | `#FF6B00` 章魚燒橘 |
| 深黑 | `#0D0D0D` |
| 深藍 | `#1A2A6C` |
| 白字 | `#FFFFFF` |
| 灰字 | `rgba(255,255,255,0.55)` |
| 標題字型 | Noto Serif TC 900/700 |
| 內文字型 | Noto Sans TC 400/500 |
| 按鈕圓角 | 4px |
| 框線原則 | **全站零框線** |
| 動畫 | Intersection Observer 淡入 + ReactBits |

---

## 首頁 Section 順序（固定）

```
Header（Sticky）
↓
01 HeroSection
↓
02 AboutSection
↓
03 StagesSection
↓
04 PrizesSection
↓
05 ProcessSection
↓
06 MerchSection（參賽者物資）
↓
07 PlayersSection
↓
Footer
```

---

## Header

```
position: sticky; top: 0; z-index: 50
background: rgba(10,10,10,0.88)
backdrop-filter: blur(14px)
box-shadow: 0 1px 40px rgba(0,0,0,0.7)
border: none

左：logo-circle.png（height: 40px）
中：錨點導覽（活動介紹/關卡/獎金/選手/周邊）
    color: rgba(255,255,255,0.7); hover: #D4A017
右：「立即報名」
    background: #CC1200; color: #D4A017
    font-family: Noto Serif TC; padding: 10px 24px
    border-radius: 2px; border: none
    box-shadow: 0 2px 20px rgba(204,18,0,0.4)

Mobile：漢堡選單，全版黑底展開
```

---

## 01 HeroSection

```
min-height: 100vh; position: relative; overflow: hidden

━━ 背景 ━━
<img src="/assets/hero/hero-bg.png"
  style="position:absolute; inset:0; width:100%; height:100%;
         object-fit:cover; object-position:center; z-index:0">

━━ 遮罩（雙層，不過度遮圖）━━
左側漸層（桌機）：
  position:absolute; inset:0; z-index:1
  background: linear-gradient(
    to right,
    rgba(0,0,0,0.75) 0%,
    rgba(0,0,0,0.45) 45%,
    rgba(0,0,0,0.0) 75%
  )

底部漸層（桌機+手機）：
  background: linear-gradient(
    to top,
    rgba(0,0,0,0.55) 0%,
    transparent 50%
  )

━━ 內容（桌機，靠左）━━
position: absolute; z-index: 2
left: 8vw; bottom: 12vh
max-width: 520px

  小標「TAKOYAKI BATTLE」
    font-size: 11px; letter-spacing: 8px; color: #CC1200
    font-family: Noto Sans TC

  主標「極限章魚燒王」
    font-family: Noto Serif TC 900
    font-size: clamp(48px, 6vw, 88px)
    color: #FFFFFF; letter-spacing: 4px
    text-shadow: 0 0 60px rgba(204,18,0,0.6), 0 2px 8px rgba(0,0,0,0.9)
    margin-top: 8px

  副標「滾燙章魚燒 等你來挑戰」
    font-family: Noto Sans TC 400
    font-size: clamp(15px, 2vw, 22px)
    color: rgba(255,255,255,0.85); letter-spacing: 3px
    margin-top: 12px

  CTA 按鈕「立即報名」→ /#/register
    margin-top: 36px
    display: inline-block; position: relative
    background: linear-gradient(135deg, #FF6B00 0%, #CC1200 50%, #8B0000 100%)
    color: #FFFFFF; font-family: Noto Serif TC 700; font-size: 18px
    padding: 18px 56px; border-radius: 4px; border: none
    cursor: pointer

    燃燒光暈 ::before：
      position:absolute; inset:-6px; border-radius:8px
      background: inherit; filter: blur(14px)
      opacity: 0.65; z-index:-1
      animation: burnPulse 2s ease-in-out infinite

    @keyframes burnPulse {
      0%,100% { opacity:0.5; transform:scale(0.98) }
      50%      { opacity:0.85; transform:scale(1.03) }
    }

    hover: translateY(-3px); filter:brightness(1.15)
    hover ::before: opacity→1

━━ 手機版（≤768px）━━
object-position: 65% center（圖片主體偏右，文字在左）
內容：padding: 0 24px; position:absolute; bottom:15vh; left:0; right:0
主標 font-size: clamp(36px,9vw,52px)
副標 font-size: 14px; letter-spacing: 2px
按鈕 padding: 14px 40px; font-size: 16px
左側漸層加強：rgba(0,0,0,0.82) 0% → rgba(0,0,0,0.0) 70%

━━ Hero 背景圖 AI Prompt ━━
極限章魚燒大胃王競技現場，電影感構圖，
熱騰騰的章魚燒黑色鐵盤在黑色木紋桌面上，
蒸氣瀰漫，金黃火光，烈焰從四周竄起，
日式祭典紅色燈籠懸掛背景，
畫面右側為視覺主體，左側35%留暗色空間給文字，
色調：深黑、暗紅、金黃，電影感強烈打光，
無人物、無文字、無Logo
--ar 16:9 --style raw --v 6 --q 2
```

---

## 02 AboutSection

```
position: relative; padding: 100px 0; overflow: hidden

背景：about-bg.png cover + 左側遮罩 rgba(0,0,0,0.85)→transparent

佈局（max-width:1200px，margin:0 auto，padding:0 8vw）：
左側（50%）：
  logo-circle.png（width:72px; opacity:0.9; margin-bottom:24px）
  
  主標第一行「傳承職人精神」
    Noto Serif TC 900; font-size:clamp(28px,4vw,48px); color:#CC1200
  主標第二行「舉辦台灣首場章魚燒大胃王挑戰賽」
    Noto Serif TC 700; font-size:clamp(16px,2.2vw,26px); color:#FFFFFF
    margin-top:8px
  
  說明（最多2行）：
    「明仁二代目以二代傳承的職人之心，
     首次在台灣打造極限章魚燒競技舞台。」
    Noto Sans TC; font-size:15px; color:rgba(255,255,255,0.65)
    line-height:1.8; margin-top:20px
  
  三數字橫排（gap:40px; margin-top:40px）：
    各自：flex-direction:column; align-items:flex-start
    數字：Noto Serif TC 900; font-size:32px; color:#D4A017
    標籤：Noto Sans TC; font-size:12px; color:rgba(255,255,255,0.5); margin-top:4px
    項目：30位挑戰者 ／ 3關極限考驗 ／ NT$20,000 總獎金
    間隔：1px×40px豎線 rgba(255,255,255,0.2)

右側（50%）：about-bg.png 透出，裝飾用
  可放極低透明度大字「NT$20,000」
  Noto Serif TC 900; font-size:96px; color:rgba(212,160,23,0.06)

手機版：單欄，左側內容全寬
```

---

## 03 StagesSection

```
background: #0D0D0D; padding-top: 80px; padding-bottom: 0

標題區（置中; margin-bottom:48px）：
  「BATTLE STAGES」（#CC1200; letter-spacing:5px; 11px）
  「三關極限考驗」（Noto Serif TC 900; 42px; white）

━━ 三格圖片卡（桌機：三欄並排，gap:0）━━
桌機：display:grid; grid-template-columns: 1fr 1fr 1fr; gap:0
手機：grid-template-columns: 1fr（單欄堆疊）

每一格：
  position:relative; overflow:hidden
  aspect-ratio: 16/10（桌機）/ 4/3（手機）

  背景圖（<img>）：
    position:absolute; inset:0
    width:100%; height:100%; object-fit:cover
    transition: transform 0.6s ease
    hover（桌機）: transform scale(1.06)

  遮罩層：
    position:absolute; inset:0
    background: linear-gradient(
      180deg,
      rgba(0,0,0,0.0) 25%,
      rgba(0,0,0,0.55) 60%,
      rgba(0,0,0,0.88) 100%
    )

  文字層：
    position:absolute; bottom:0; left:0; right:0
    padding:28px 32px

    關卡英文標：「STAGE 01」/「STAGE 02」/「STAGE 03」
      font-size:11px; letter-spacing:5px; color:#CC1200
      Noto Sans TC

    關卡中文名：「極速章魚燒」/「極樂章魚燒」/「極限章魚燒」
      Noto Serif TC 900; font-size:28px; color:#FFFFFF
      margin-top:6px

    關卡說明（一行）：
      Stage01：「最快吃完12顆，前18名晉級」
      Stage02：「趣味障礙卡登場，完成3盒者晉級」
      Stage03：「無限補盤，吃最多者奪冠」
      Noto Sans TC; font-size:13px; color:rgba(255,255,255,0.65)
      margin-top:8px

    時間標示：
      「⏱ 約20分鐘」/「⏱ 約20分鐘」/「⏱ 約15分鐘」
      font-size:12px; color:#D4A017; margin-top:10px

  格間分隔（桌機）：
    左右兩格各自 border-right（唯一例外）：
    改用偽元素豎線：
    position:absolute; top:10%; right:0; bottom:10%
    width:1px; background:rgba(212,160,23,0.3)

圖片路徑：
  /assets/stages/stage-01-speed.png   ✅ 已提供
  /assets/stages/stage-02-chaos.png   ✅ 已提供
  /assets/stages/stage-03-limit.png   ✅ 已提供
```

---

## 04 PrizesSection

```
position:relative; min-height:80vh; overflow:hidden

━━ 背景圖（RWD 雙版）━━
桌機背景：prize-bg-desktop.png
  position:absolute; inset:0; width:100%; height:100%; object-fit:cover; z-index:0

手機背景：prize-bg-mobile.png
  @media(max-width:768px)：切換為手機版圖片

━━ 遮罩（雙層）━━
上方遮罩：
  position:absolute; inset:0; z-index:1
  background: linear-gradient(
    180deg,
    rgba(0,0,0,0.82) 0%,
    rgba(0,0,0,0.0) 45%
  )

下方遮罩：
  background: linear-gradient(
    0deg,
    rgba(0,0,0,0.88) 0%,
    rgba(0,0,0,0.0) 55%
  )

━━ 上方文字（置中）━━
position:absolute; top:0; left:0; right:0; z-index:2
padding-top:64px; text-align:center

  「PRIZE MONEY」
    font-size:11px; letter-spacing:5px; color:#CC1200; Noto Sans TC

  「你敢來，就有機會帶走」
    Noto Serif TC 900; font-size:clamp(28px,4vw,44px); color:#FFFFFF
    margin-top:12px

━━ 下方獎金數字（置中）━━
position:absolute; bottom:0; left:0; right:0; z-index:2
padding-bottom:56px

桌機：三欄橫排 flex; justify-content:center; gap:0; align-items:flex-end

冠軍：
  小標「👑 CHAMPION」font-size:12px; letter-spacing:3px; color:#D4A017
  金額「NT$20,000」Noto Serif TC 900; font-size:clamp(40px,5vw,64px); color:#D4A017
  text-shadow: 0 0 50px rgba(212,160,23,0.7)
  margin-top:8px

亞軍：
  小標「2ND PLACE」font-size:11px; color:rgba(255,255,255,0.5)
  金額「NT$5,000」Noto Serif TC 900; font-size:clamp(28px,3.5vw,44px); color:rgba(255,255,255,0.8)

季軍：
  小標「3RD PLACE」font-size:11px; color:rgba(255,255,255,0.5)
  金額「NT$3,000」Noto Serif TC 900; font-size:clamp(28px,3.5vw,44px); color:rgba(255,255,255,0.8)

三欄分隔：1px×48px豎線 rgba(255,255,255,0.2); margin:0 40px

手機版：
  三項垂直堆疊（flex-direction:column; align-items:center; gap:24px）
  冠軍字最大，亞季軍縮小

━━ AI Prompt（桌機版 16:9）━━
日本武道決戰氛圍，黑色逆光剪影，
一位大胃王挑戰者站在競技台聚光燈正中央，
只露出體型輪廓、背影，不顯示臉部，
四周有紅色火柱從地面竄起，金色碎片飄落，
觀眾席黑暗中隱約可見，
舞台感強烈，如格鬥遊戲角色選擇畫面，
上方三分之一留黑色空間，下方三分之一留黑色空間（供文字覆蓋），
色調：深黑底、深紅逆光、金色光暈
無文字、無Logo
--ar 16:9 --style raw --v 6 --q 2

━━ AI Prompt（手機版 9:16）━━
同上概念，改為垂直構圖，
人物身影置於畫面中央偏下，
上方40%與下方30%留深色空間供文字
--ar 9:16 --style raw --v 6 --q 2
```

---

## 05 ProcessSection

```
padding: 100px 0
背景：bg-radial-burst.png + rgba(0,0,0,0.75) 遮色

標題（置中）：
  「HOW TO JOIN」（#CC1200; letter-spacing:5px）
  「報名流程」（Noto Serif TC 900; 42px; white）

5步驟橫向 Timeline（max-width:900px; margin:0 auto）：
桌機：flex; align-items:flex-start; gap:0
手機：flex-direction:column; align-items:center

每步驟：
  步驟圓圈（56px; border-radius:50%; background:rgba(204,18,0,0.15)）
  步驟數字（Noto Serif TC; 18px; #CC1200）
  IconTakoyaki × N顆（1~5，對應步驟數）
  標題（14px; white; margin-top:12px）
  描述（12px; rgba(255,255,255,0.5); text-align:center）

步驟：
  01 線上填表｜填寫報名表單，提交基本資料
  02 主辦審核｜主辦方確認報名資格後通知
  03 繳費 NT$600｜完成繳費取得報名資格
  04 收取參賽物資｜T-shirt + 毛巾 + 頭巾
  05 現場簽到｜比賽當天完成簽到及規則認同

步驟間連線：
  flex:1; height:1px
  background: linear-gradient(90deg, #CC1200, rgba(212,160,23,0.5))
  光點流動 CSS animation（3s infinite）
```

---

## 06 MerchSection（參賽者物資）

```
padding: 100px 0
背景：#0A0A14 + bg-japanese-wave.png（opacity:0.05）

標題（置中）：
  「CHALLENGER'S GEAR」（#CC1200; letter-spacing:5px）
  「參賽者物資」（Noto Serif TC 900; 42px; white）
  「報名費 NT$600 包含以下三件組」（灰色; 14px）

商品網格（2×2; gap:2px; max-width:900px; margin:0 auto）：
每格：
  background: rgba(255,255,255,0.04); aspect-ratio:4/3; overflow:hidden; position:relative
  圖片：object-fit:contain; padding:24px; hover:scale(1.06)
  底部漸層文字區（position:absolute; bottom:0）：
    background: linear-gradient(180deg, transparent, rgba(0,0,0,0.8))
    商品名（15px; white）
  標籤（左上角）：
    「費用含」→ background:#CC1200
    「現場限定」→ background:#FF6B00
    font-size:11px; color:white; padding:4px 10px; border-radius:0

圖片：
  /assets/merchandise/merch-tshirt.png ✅
  /assets/merchandise/merch-towel.png ✅
  /assets/merchandise/merch-headband.png ✅
  /assets/merchandise/merch-fan.png ✅
```

---

## 07 PlayersSection

```
padding: 100px 0; background: #0D0D0D

標題（置中）：
  「CHALLENGERS」（#CC1200; letter-spacing:5px）
  「挑戰者名單」（Noto Serif TC 900; 42px; white）
  「選手照片賽前公布，投票預測誰是王者」（灰色; 13px）

選手網格（桌機5欄×6排=30格; gap:12px; max-width:1000px; margin:48px auto 0）：
手機：3欄×10排

每格：
  background: rgba(255,255,255,0.04); border-radius:4px
  aspect-ratio:1/1; overflow:hidden; position:relative
  
  player-placeholder.png（object-fit:cover）
  
  蒙版層：
    position:absolute; inset:0
    background: rgba(0,0,0,0.6)
    GrainGradient 疊加
    大問號「?」（Noto Serif TC 900; 40px; rgba(204,18,0,0.7)）
  
  左上號碼「#001」（11px; rgba(212,160,23,0.7); position:absolute; top:8px; left:8px）

投票 CTA（margin-top:60px; text-align:center）：
  「預測你的章魚燒王，投票即抽大獎」（white; 16px）
  「前往投票預測 →」按鈕：
    background:transparent; color:white; Noto Serif TC; 18px; padding:18px 60px
    底部漸層線偽元素取代框線
    CSS ripple 脈衝（向外紅色圓圈）
    連結 /#/vote
```

---

## Footer

```
background: #080808; padding: 48px 0; text-align:center

logo-circle.png（height:48px; opacity:0.8; margin-bottom:16px）
「今天的我，沒有極限！」（Noto Serif TC; 18px; rgba(255,255,255,0.45)）
社群連結（margin-top:16px; gap:24px）：
  IG → https://www.instagram.com/takoyaki.tw/
  FB / LINE OA → config 有值才顯示
版權（margin-top:24px）：
  「© 2026 明仁二代目 All Rights Reserved」（12px; rgba(255,255,255,0.2)）
「立即報名」小連結 → /#/register（#CC1200; 12px）
```

---

## 報名頁 /#/register

```
頁頭小Hero：hero-bg.png + 深遮色
  event-logo-text.png 置中（height:60px）
  「報名期間：2026/06/22 — 07/10」

活動資訊條：日期／地點／費用（純文字，無框）

參賽物資三件展示（縮圖橫排）

注意事項 Accordion（4條，Framer Motion AnimateHeight）

表單欄位（8欄，底線輸入框）：
  姓名／性別單選／生日／電話／Email／緊急聯絡人姓名／緊急聯絡人電話
  同意聲明 Checkbox（SVG 打勾動畫）

聲明4條：
  1. 活動現場設有醫護人員待命
  2. 參賽前需完成現場簽到手續
  3. 參賽前需簽署並認同本次比賽規則
  4. 本人自願參加本次飲食挑戰競賽，並了解相關風險

送出按鈕（岩漿造型，同Hero CTA）：
  未填完：Framer Motion shake
  成功：ParticleExplosion + hero-mascot.png bounceIn + SplitText「報名成功！」

Webhook POST → config.WEBHOOK.register
```

---

## 投票頁 /#/vote

```
LIFF 為空時：顯示佔位頁，不白屏

未登入：LINE 登入引導（Magnet 按鈕）

登入後：
  30張選手卡（AnimatedList stagger）
  投票按鈕 → ParticleExplosion（橘金紅）→ 打勾鎖定
  排行榜（30s 刷新；第一名 IconCrown bounce）
  底部 sticky：「✓ 已取得抽獎資格」

BlobCursor（手機停用）
Webhook POST → config.WEBHOOK.vote
```

---

## 圖片清單（完整）

| 路徑 | 狀態 |
|------|------|
| `/assets/logo/logo-circle.png` | ✅ |
| `/assets/logo/logo-square.png` | ✅ |
| `/assets/logo/event-logo-full.png` | ✅ |
| `/assets/logo/event-logo-text.png` | ✅ |
| `/assets/hero/hero-bg.png` | ⬜ 待生成 |
| `/assets/about/about-bg.png` | ⬜ 待生成 |
| `/assets/stages/stage-01-speed.png` | ✅ |
| `/assets/stages/stage-02-chaos.png` | ✅ |
| `/assets/stages/stage-03-limit.png` | ✅ |
| `/assets/prizes/prize-bg-desktop.png` | ⬜ 待生成 |
| `/assets/prizes/prize-bg-mobile.png` | ⬜ 待生成 |
| `/assets/merchandise/merch-tshirt.png` | ✅ |
| `/assets/merchandise/merch-towel.png` | ✅ |
| `/assets/merchandise/merch-headband.png` | ✅ |
| `/assets/merchandise/merch-fan.png` | ✅ |
| `/assets/players/player-placeholder.png` | ⬜ 待生成 |
| `/assets/textures/bg-japanese-wave.png` | ⬜ 待生成 |
| `/assets/textures/bg-radial-burst.png` | ⬜ 待生成 |
| `/assets/effects/effect-steam.png` | ⬜ 待生成 |
