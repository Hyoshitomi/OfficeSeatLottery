import { NextResponse } from "next/server"

export async function POST(request) {
  const body = await request.json()
  const { email, name, employeeNumber, inquiryType, request: inquiryRequest } = body

  const typeLabel =
    inquiryType === "passwordReset" ? "パスワードリセット" : "その他"

  const payload = {
    embeds: [
      {
        title: "【問い合わせフォーム】",
        fields: [
          { name: "名前", value: name },
          { name: "メールアドレス", value: email },
          { name: "社員番号", value: employeeNumber },
          { name: "問い合わせ種類", value: typeLabel },
          ...(inquiryRequest
            ? [{ name: "問い合わせ内容", value: inquiryRequest }]
            : []),
        ],
        color: 5814783, // 任意（青系）
        timestamp: new Date().toISOString(),
      },
    ],
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL

  if (!webhookUrl) {
    return NextResponse.json({ error: "Webhook URL未設定" }, { status: 500 })
  }

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (res.ok) {
    return NextResponse.json({ success: true })
  } else {
    return NextResponse.json({ error: "通知送信に失敗しました" }, { status: 500 })
  }
}
