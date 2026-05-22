# Notion / n8n 串接規格

本專案前端只呼叫 webhook，不直接呼叫 Notion API，避免 Notion token 暴露在瀏覽器。

## 環境變數

在部署平台設定：

```env
VITE_LIFF_ID=你的 LIFF ID
VITE_LINE_OA_URL=https://lin.ee/你的官方帳號連結
VITE_REGISTER_WEBHOOK_URL=https://你的-n8n/webhook/register
VITE_VOTE_WEBHOOK_URL=https://你的-n8n/webhook/vote
VITE_VOTE_RESULTS_WEBHOOK_URL=https://你的-n8n/webhook/vote-results
```

本機開發可複製 `.env.example` 成 `.env.local` 後填入。

## 報名資料庫

建議 Notion database 欄位：

| Notion 欄位 | 型別 | 前端 payload |
| --- | --- | --- |
| 名稱 | Title | `name` |
| LINE 名稱 | Rich text | `line_name` |
| 性別 | Select | `gender` |
| 生日 | Date | `birthday` |
| 電話 | Phone | `phone` |
| Email | Email | `email` |
| 緊急聯絡人 | Rich text | `emergency_name` |
| 緊急聯絡人電話 | Phone | `emergency_phone` |
| 同意條款 | Checkbox | `agree` |
| 狀態 | Select | 預設 `待審核` |
| 來源 | Select | `source` |
| 頁面網址 | URL | `pageUrl` |
| 送出時間 | Date | `timestamp` |

前端送出的 JSON：

```json
{
  "name": "王小明",
  "line_name": "LINE 顯示名稱",
  "gender": "男",
  "birthday": "1990-01-01",
  "phone": "0912345678",
  "email": "user@example.com",
  "emergency_name": "王大明",
  "emergency_phone": "0987654321",
  "agree": true,
  "pageUrl": "https://example.com/#/register",
  "source": "website-register",
  "timestamp": "2026-05-19T00:00:00.000Z"
}
```

## 投票資料庫

建議 Notion database 欄位：

| Notion 欄位 | 型別 | 前端 payload |
| --- | --- | --- |
| LINE User ID | Title | `userId` |
| 顯示名稱 | Rich text | `displayName` |
| 頭像 | URL | `pictureUrl` |
| 投票選手 | Select 或 Number | `candidateId` |
| LINE OA 好友 | Checkbox | `lineOAFriend` |
| 頁面網址 | URL | `pageUrl` |
| 投票時間 | Date | `timestamp` |

前端送出的 JSON：

```json
{
  "userId": "Uxxxxxxxx",
  "displayName": "王小明",
  "pictureUrl": "https://profile.line-scdn.net/...",
  "candidateId": "12",
  "lineOAFriend": true,
  "pageUrl": "https://example.com/#/vote",
  "timestamp": "2026-05-19T00:00:00.000Z"
}
```

## n8n 工作流

報名：

1. `Webhook` node 接收 `POST /register`。
2. `Notion` node 建立 database page，照上表 mapping。
3. 可選：用 phone 或 email 查重，重複時回傳 `409`。
4. 成功回傳 `200` JSON：`{ "ok": true }`。

投票：

1. `Webhook` node 接收 `POST /vote`。
2. 用 `userId` 查投票 database。
3. 若已投票，回傳 `409`，前端會顯示失敗訊息。
4. 若尚未投票，建立 Notion page。
5. 成功回傳 `200` JSON：`{ "ok": true }`。

## LINE LIFF 設定

投票頁會要求：

1. 使用者已登入 LINE。
2. LIFF 可透過 `getFriendship()` 確認使用者是 LINE 官方帳號好友。

LINE Developers 需確認：

1. LIFF App 已設定正確 Endpoint URL。
2. LIFF App 所屬 Channel 已綁定 LINE 官方帳號。
3. LIFF 權限包含 profile 與好友狀態檢查所需設定。
