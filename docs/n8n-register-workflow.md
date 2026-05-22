# n8n Workflow 說明｜章魚大胃王報名入庫

## 基本資訊
- Workflow 名稱:章魚大胃王_報名入庫
- 匯入檔:genpower-register.n8n.json(已另存於 /docs)
- 角色:Worker /api/register 與 Notion 之間的中轉層
- Webhook 路徑:/genpower-register(POST)
- 觸發來源:Cloudflare Worker 的 POST /api/register

## 為什麼要有這條 workflow(製作條件)
1. 前端與 Worker 不可直接持有 Notion Token,故報名寫入一律經 n8n。
2. n8n 在寫入前先檢查名額上限(50),額滿回 409。
3. 未來改報名流程(加通知、寄信、改欄位)只動 n8n,不動程式碼。

## 介面契約(Worker 必須遵守)
### Worker → n8n(送出)
POST {N8N_REGISTER_WEBHOOK}
Body(JSON):
{
  "name":  "string 報名者姓名",
  "phone": "string 電話(去重依據)"
  // ※ 實際欄位以本機稽核抓到的報名表單為準,
  //    若表單有 email/隊伍名等,需同步補進此契約與 n8n 節點
}

### n8n → Worker(回傳)
成功 200:{ "success": true,  "registrationId": "GPyymmdd-001" }
額滿 409:{ "success": false, "message": "報名已額滿" }

## 對接注意
- Worker 收到 success=true → 把 registrationId 回前端顯示。
- Worker 收到 409 → 前端顯示「報名已額滿」。
- Notion DB ID:365b3ad1d1cd80f69c0de6b0f6715503
- Notion 欄位 key 名稱(姓名/電話/審核狀態)須與 n8n 節點內一致,
  稽核階段若發現不符,先回報差異,勿自行修改 n8n。