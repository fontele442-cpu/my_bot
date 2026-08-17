/* =========================================================
GALAXY COIN — Telegram Bot Server
Handles: /start button, channel-subscription checks,
admin notifications on new registrations.
Deploy this separately (Railway / Render / VPS) — it must
run continuously, unlike index.html which is static.
========================================================= */

const express = require('express');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');

/* ---- CONFIG (fill these in, or use environment variables) ---- */
const BOT_TOKEN   = process.env.BOT_TOKEN   || "YOUR_BOT_TOKEN_HERE";
const ADMIN_ID    = process.env.ADMIN_ID    || "YOUR_TELEGRAM_ID_HERE"; // numeric string
const WEBAPP_URL  = process.env.WEBAPP_URL  || "https://t.me/Tap_galaxycoinbot/Galaxy";
const PORT        = process.env.PORT        || 3000;

const bot = new TelegramBot(BOT_TOKEN, { polling: true });
const app = express();
app.use(cors());
app.use(express.json());

/* ---------- /start command ---------- */
bot.onText(//start/, (msg)=>{
const chatId = msg.chat.id;
bot.sendMessage(chatId,
"✦ Galaxy Coin'ga xush kelibsiz!\nGalaktikangizni boshqarish uchun quyidagi tugmani bosing 👇",
{
reply_markup: {
inline_keyboard: [[
{ text: "🚀 Galaxy Coin'ni ochish", web_app: { url: WEBAPP_URL } }
]]
}
}
);
});

/* ---------- Admin-only simple commands ---------- */
bot.onText(//stats/, (msg)=>{
if(String(msg.chat.id) !== String(ADMIN_ID)) return;
bot.sendMessage(msg.chat.id, "Stats: use the in-app Admin panel (Settings → Admin panel) for full user lookup, task management, and balances.");
});

/* ---------- API: check channel subscription ---------- */
app.post('/check-subscription', async (req, res)=>{
const { telegramId, channel } = req.body;
if(!telegramId || !channel) return res.status(400).json({ error: 'missing params' });
try{
const member = await bot.getChatMember('@'+channel, telegramId);
const subscribed = ['member','administrator','creator'].includes(member.status);
res.json({ subscribed });
}catch(err){
console.error(err.message);
res.json({ subscribed: false });
}
});

/* ---------- API: notify admin of new registration ---------- */
app.post('/notify-registration', async (req, res)=>{
const { name, username, code, telegramId, tgName } = req.body;
try{
await bot.sendMessage(ADMIN_ID,
🆕 Yangi ro'yxatdan o'tish\n\n +
Ism: ${name}\n +
Username: @${username}\n +
Kod: ${code}\n +
Telegram: ${tgName || '-'} (id: ${telegramId || '-'})
);
res.json({ ok: true });
}catch(err){
console.error(err.message);
res.status(500).json({ ok:false });
}
});

app.get('/', (req,res)=>res.send('Galaxy Coin bot server is running.'));

app.listen(PORT, ()=>console.log('Bot server listening on port '+PORT));

Bu kod nima 1ila oladi
