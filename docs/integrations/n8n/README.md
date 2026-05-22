# n8n Workflows

## Registration

Workflow file:

- `register-to-notion.workflow.json`

Target Notion database:

- `365b3ad1d1cd80f69c0de6b0f6715503`

Webhook path:

- `takoyaki-register`

Frontend env:

```env
VITE_REGISTER_WEBHOOK_URL=https://YOUR_N8N_DOMAIN/webhook/takoyaki-register
```

## Vote

Workflow file:

- `vote-to-notion.workflow.json`

Target Notion database:

- `365b3ad1d1cd80e9812cd6c84946407a`

Webhook path:

- `takoyaki-vote`

Frontend env:

```env
VITE_VOTE_WEBHOOK_URL=https://YOUR_N8N_DOMAIN/webhook/takoyaki-vote
```

## Vote Results

Workflow file:

- `vote-results.workflow.json`

Target Notion database:

- `365b3ad1d1cd80e9812cd6c84946407a`

Webhook path:

- `takoyaki-vote-results`

Response shape:

```json
{
  "ok": true,
  "totalVotes": 3,
  "votes": {
    "1": 1,
    "12": 2
  },
  "rankings": [
    { "candidateId": "12", "count": 2 },
    { "candidateId": "1", "count": 1 }
  ],
  "updatedAt": "2026-05-19T00:00:00.000Z"
}
```

The vote workflows use the n8n Notion node. After importing, select your Notion credential in each Notion node.

## Notion Fields

The registration database now has these fields:

| Field | Type |
| --- | --- |
| 名稱 | Title |
| LINE 名稱 | Rich text |
| 性別 | Select |
| 生日 | Date |
| 電話 | Phone |
| Email | Email |
| 緊急聯絡人 | Rich text |
| 緊急聯絡人電話 | Phone |
| 同意條款 | Checkbox |
| 狀態 | Select |
| 來源 | Select |
| 頁面網址 | URL |
| 送出時間 | Date |

## n8n Import Notes

After importing the workflow:

1. Open `Create Registration in Notion`.
2. Select your Notion credential.
3. Keep database ID as `365b3ad1d1cd80f69c0de6b0f6715503`.
4. Activate the workflow.
