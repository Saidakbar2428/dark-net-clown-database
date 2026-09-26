export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { clownName, phoneNumber, caseNumber } = req.body || {};

  if (!clownName || !phoneNumber) {
    return res.status(400).json({ error: "Missing order data" });
  }

  const message =
    `☠️━━━━━━━━━━━━━━━━━━━━☠️\n` +
    `        ⚠️ MAXFIY ISH ⚠️\n` +
    `☠️━━━━━━━━━━━━━━━━━━━━☠️\n\n` +
    `🚨 OGOHLANTIRISH: YANGI BUYURTMA ANIQLANDI\n\n` +
    `🤡 NISHON: ${clownName}\n` +
    `📞 ALOQA: ${phoneNumber}\n` +
    `📁 ISH RAQAMI: ${caseNumber || "NOMA'LUM"}\n\n` +
    `⚠️ DIQQAT:\n` +
    `Ushbu masxaraboz allaqachon so'ralgan.\n` +
    `Buyurtma qabul qilindi.\n\n` +
    `🔴 STATUS: KUZATUVDA\n` +
    `☠️ XAVF DARAJASI: ANIQLANMAGAN\n\n` +
    `...va endi u sizni kutmoqda.\n\n` +
    `☠️━━━━━━━━━━━━━━━━━━━━☠️`;

  const response = await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: "6723551547",
        text: message,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok || !data.ok) {
    return res.status(500).json({
      error: "Telegram yuborishda xato",
    });
  }

  return res.status(200).json({
    success: true,
  });
}