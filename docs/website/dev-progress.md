# 極限章魚燒王 開發進度表

📋 dev-progress.md v1.0
建立日期：2026-05-17
更新方式：每次完成區塊優化後，在對應區塊標記完成並記錄摘要

---

## 整體進度

| 類別 | 完成 | 總計 | 進度 |
|------|------|------|------|
| 架構 / 技術基礎 | 7 | 7 | ✅ 100% |
| 頁面 Section 開發 | 9 | 11 | 🔄 82% |
| 區塊設計優化 | 4 | 11 | 🔄 36% |
| 後端串接 | 0 | 3 | ⬜ 0% |
| 素材（圖片）| 6 | 12 | 🔄 50% |

---

## 一、架構 / 技術基礎

| 項目 | 狀態 | 備注 |
|------|------|------|
| React 18 + Vite 專案初始化 | ✅ | |
| Tailwind CSS 設定 | ✅ | |
| Framer Motion 整合 | ✅ | |
| React Router（HashRouter）| ✅ | 3頁路由 |
| 全域 CSS 基礎（字型、色系、Scrollbar）| ✅ | index.css |
| ReactBits 元件庫導入 | ✅ | 19個元件 |
| 頁面切換動畫（AnimatePresence）| ✅ | |

---

## 二、頁面 Section 開發狀態

### 全站固定層

| 元件 | 開發 | 備注 |
|------|------|------|
| Header | ✅ | 含 scroll 效果、漢堡選單、錨點滾動 |
| Footer | ✅ | |
| IntroAnimation | ✅ | 頁面初次載入 |
| TakoyakiFloat | ✅ | 右下角浮動裝飾 |
| Particles | ✅ | 金色粒子 count=50 |

### HomePage

| Section | 開發 | 備注 |
|---------|------|------|
| HeroSection | ✅ | 背景圖、主副標、CTA |
| AboutSection | ✅ | Logo、標題、3統計數字 |
| StagesSection | ✅ | 3關卡片、hover effect |
| PrizesSection | ✅ | 三欄獎金展示，無背景圖 |
| ProcessSection | ✅ | 5步驟流程、流光動畫 |
| MerchSection | ✅ | 2×2 商品網格 |
| PlayersSection | ✅ | 30格選手 + 投票 CTA |

### RegisterPage

| 區塊 | 開發 | 備注 |
|------|------|------|
| 表單 8 欄位 | ✅ | |
| Webhook POST | ⬜ | 待補 Webhook URL |
| 成功/錯誤狀態 | ✅ | |

### VotePage

| 區塊 | 開發 | 備注 |
|------|------|------|
| 選手卡投票 UI | ✅ | |
| LINE LIFF 登入 | ⬜ | 待補 LIFF ID |
| Webhook POST | ⬜ | 待補 Webhook URL |

---

## 三、區塊設計優化進度
> 此為與 Claude Chat 協作的逐步優化紀錄
> 每次針對一個區塊進行，不大幅移動

### 全站設計基礎（優先定案）

| 項目 | 狀態 | 日期 | 摘要 |
|------|------|------|------|
| 背景系統 | ✅ 定案 | 2026-05-17 | site-bg.png fixed + hero-bg.png；section 透明；hero 底部溶入 |
| 主色系 | ✅ 定案 | 2026-05-17 | Dark / Red / Gold，不更動 |
| 無邊框設計 | ✅ 定案 | 2026-05-17 | `* { border: none !important }` |
| Section 間無分隔線 | ✅ 定案 | 2026-05-17 | FlamesDivider 已移除 |
| 滑鼠特效移除 | ✅ 定案 | 2026-05-17 | SplashCursor 移除 |

### Header

| 項目 | 狀態 | 日期 | 摘要 |
|------|------|------|------|
| Logo 磁力特效移除 | ✅ | 2026-05-17 | Magnet 元件移除 |
| 整體設計審查 | ⬜ 待優化 | — | |

### HeroSection

| 項目 | 狀態 | 日期 | 摘要 |
|------|------|------|------|
| 英文小標移除 | ✅ | 2026-05-17 | TAKOYAKI BATTLE 文字移除 |
| 文字位置調整 | ✅ | 2026-05-17 | 8vw → calc(50%-320px)，偏中置左 |
| 手機底部調整 | ✅ | 2026-05-17 | bottom 15vh → 8vh |
| 底部溶入效果 | ✅ | 2026-05-17 | fade to #0D0D0D，marginBottom: -80px |
| 整體設計審查 | ⬜ 待優化 | — | |

### AboutSection

| 項目 | 狀態 | 日期 | 摘要 |
|------|------|------|------|
| 背景移除 | ✅ | 2026-05-17 | 改為透明 |
| 整體設計審查 | ⬜ 待優化 | — | |

### StagesSection

| 項目 | 狀態 | 日期 | 摘要 |
|------|------|------|------|
| 背景色移除 | ✅ | 2026-05-17 | #0D0D0D 移除 |
| 整體設計審查 | ⬜ 待優化 | — | |

### PrizesSection

| 項目 | 狀態 | 日期 | 摘要 |
|------|------|------|------|
| 背景圖移除、重構版面 | ✅ | 2026-05-17 | 改為普通文件流 |
| 整體設計審查 | ⬜ 待優化 | — | |

### ProcessSection

| 項目 | 狀態 | 日期 | 摘要 |
|------|------|------|------|
| 背景圖移除 | ✅ | 2026-05-17 | 透明化 |
| 整體設計審查 | ⬜ 待優化 | — | |

### MerchSection

| 項目 | 狀態 | 日期 | 摘要 |
|------|------|------|------|
| 背景色移除 | ✅ | 2026-05-17 | #0A0A14 移除 |
| 整體設計審查 | ⬜ 待優化 | — | |

### PlayersSection

| 項目 | 狀態 | 日期 | 摘要 |
|------|------|------|------|
| 背景色移除 | ✅ | 2026-05-17 | bg-brand-dark 移除 |
| 整體設計審查 | ⬜ 待優化 | — | |

### Footer

| 項目 | 狀態 | 日期 | 摘要 |
|------|------|------|------|
| 整體設計審查 | ⬜ 待優化 | — | |

### RegisterPage

| 項目 | 狀態 | 日期 | 摘要 |
|------|------|------|------|
| 整體設計審查 | ⬜ 待優化 | — | |

### VotePage

| 項目 | 狀態 | 日期 | 摘要 |
|------|------|------|------|
| 整體設計審查 | ⬜ 待優化 | — | |

---

## 四、後端串接

| 項目 | 狀態 | 備注 |
|------|------|------|
| 報名 Webhook URL（n8n）| ⬜ 待補 | 業主提供 |
| 投票 Webhook URL（n8n）| ⬜ 待補 | 業主提供 |
| LINE LIFF ID | ⬜ 待補 | 業主提供 |

---

## 五、素材狀態

| 素材 | 路徑 | 狀態 |
|------|------|------|
| 品牌圓形 Logo | `/assets/logo/logo-circle.png` | ✅ |
| 品牌方形 Logo | `/assets/logo/logo-square.png` | ✅ |
| Hero 背景圖 | `/assets/hero/hero-bg.png` | ✅ |
| 全站底層背景圖 | `/assets/bg/site-bg.png` | ✅ |
| T-shirt | `/assets/merchandise/merch-tshirt.png` | ✅ |
| 毛巾 | `/assets/merchandise/merch-towel.png` | ✅ |
| 頭巾 | `/assets/merchandise/merch-headband.png` | ✅ |
| 扇子 | `/assets/merchandise/merch-fan.png` | ✅ |
| 關卡圖 Stage 01 | `/assets/stages/stage-01-speed.png` | ⬜ 待生成 |
| 關卡圖 Stage 02 | `/assets/stages/stage-02-chaos.png` | ⬜ 待生成 |
| 關卡圖 Stage 03 | `/assets/stages/stage-03-limit.png` | ⬜ 待生成 |
| About 背景圖 | `/assets/about/about-bg.png` | ⬜ 已移除（不需要）|

---

## 六、待完成清單（優先順序）

### 高優先

- [ ] 生成三張關卡圖（Stage 01 / 02 / 03）
- [ ] 補充 Webhook URL（報名 + 投票）
- [ ] 補充 LINE LIFF ID

### 中優先（區塊設計優化）

- [ ] Header 整體設計審查
- [ ] HeroSection 整體設計審查
- [ ] AboutSection 整體設計審查
- [ ] StagesSection 整體設計審查
- [ ] PrizesSection 整體設計審查
- [ ] ProcessSection 整體設計審查
- [ ] MerchSection 整體設計審查
- [ ] PlayersSection 整體設計審查
- [ ] Footer 整體設計審查
- [ ] RegisterPage 整體設計審查
- [ ] VotePage 整體設計審查

### 低優先

- [ ] 確認域名
- [ ] 贊助商版位設計
- [ ] 投票抽獎獎品確認
- [ ] 部署至 Cloudflare Pages
