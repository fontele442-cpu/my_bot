import sqlite3
from flask import Flask, request
from telegram import Bot, Update, InlineKeyboardMarkup, InlineKeyboardButton
from telegram.ext import Dispatcher, CommandHandler, CallbackQueryHandler, MessageHandler, filters

TOKEN = "8648891805:AAFouYZtVYHMGzJJ2dOrTX_mCvYnu53orDM"
ADMIN_ID = 8487361853

bot = Bot(token=TOKEN)
app = Flask(__name__)
dispatcher = Dispatcher(bot, None, use_context=True)

# ======================
# DATABASE
# ======================
conn = sqlite3.connect("bot.db", check_same_thread=False)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY,
    balance INTEGER DEFAULT 0,
    ref_by INTEGER
)
""")
cursor.execute("""
CREATE TABLE IF NOT EXISTS channels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT
)
""")
cursor.execute("""
CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    api_id INTEGER,
    price INTEGER,
    min INTEGER,
    max INTEGER
)
""")
cursor.execute("""
CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    link TEXT,
    count INTEGER,
    service_id INTEGER,
    status TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
""")
cursor.execute("""
CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
)
""")
conn.commit()

# ======================
# UTILITY FUNCTIONS
# ======================
def get_balance(user_id):
    cursor.execute("SELECT balance FROM users WHERE user_id=?", (user_id,))
    r = cursor.fetchone()
    return r[0] if r else 0

def update_balance(user_id, amount):
    cursor.execute("UPDATE users SET balance = balance + ? WHERE user_id=?", (amount, user_id))
    conn.commit()

def get_setting(key, default):
    cursor.execute("SELECT value FROM settings WHERE key=?", (key,))
    r = cursor.fetchone()
    return int(r[0]) if r else default

# ======================
# HANDLERS
# ======================
def start(update, context):
    user_id = update.effective_user.id
    args = context.args
    ref = int(args[0]) if args else None

    cursor.execute("SELECT * FROM users WHERE user_id=?", (user_id,))
    user = cursor.fetchone()
    if not user:
        cursor.execute("INSERT INTO users (user_id, ref_by) VALUES (?,?)", (user_id, ref))
        conn.commit()
        if ref:
            update_balance(ref, 150)  # referral bonus

    keyboard = [
        [InlineKeyboardButton("📦 Buyurtma berish", callback_data="order")],
        [InlineKeyboardButton("💎 Balans", callback_data="balance"),
         InlineKeyboardButton("💰 Balans to‘ldirish", callback_data="topup")],
        [InlineKeyboardButton("👥 Pul ishlash", callback_data="referral")]
    ]
    update.message.reply_text("🔥 Xush kelibsiz PRO VIP BOT ga!", reply_markup=InlineKeyboardMarkup(keyboard))

dispatcher.add_handler(CommandHandler("start", start, pass_args=True))

# --- ADMIN PANEL ---
def admin(update, context):
    if update.effective_user.id != ADMIN_ID:
        return
    keyboard = [
        [InlineKeyboardButton("📦 Xizmatlar", callback_data="services")],
        [InlineKeyboardButton("📊 Statistika", callback_data="stats")],
        [InlineKeyboardButton("📢 Kanallar", callback_data="channels")],
        [InlineKeyboardButton("⚙️ Sozlamalar", callback_data="settings")],
        [InlineKeyboardButton("📋 Buyurtmalar", callback_data="orders")]
    ]
    update.message.reply_text("🔐 ADMIN PANEL", reply_markup=InlineKeyboardMarkup(keyboard))

dispatcher.add_handler(CommandHandler("admin", admin))

# --- CALLBACKS ---
def callback_handler(update, context):
    query = update.callback_query
    user_id = query.from_user.id
    data = query.data

    if data == "balance":
        bal = get_balance(user_id)
        query.message.edit_text(f"💎 Sizning balans: {bal} diamond")

    elif data == "topup":
        query.message.edit_text("💰 Miqdorni kiriting (stars):")
        context.user_data["topup"] = True

    elif data == "referral":
        link = f"https://t.me/YOUR_BOT_USERNAME?start={user_id}"
        query.message.edit_text(f"👥 Taklif qiling va pul ishlang!\n\n🔗 {link}\nHar bir referral = 150 💎")

    elif data == "order":
        query.message.edit_text("📦 Buyurtma berish: Link yuboring:")
        context.user_data["order"] = "link"

dispatcher.add_handler(CallbackQueryHandler(callback_handler))

# --- MESSAGE HANDLER ---
def message_handler(update, context):
    text = update.message.text
    user_id = update.effective_user.id

    # TOPUP
    if context.user_data.get("topup"):
        stars = int(text)
        diamond = stars * 130
        update.message.reply_text(f"💳 To‘lov qilish: {stars} ⭐ = {diamond} 💎\n@seenarzonsmm571bot")
        context.user_data["topup"] = False
        return

    # BUYURTMA
    if context.user_data.get("order") == "link":
        context.user_data["link"] = text
        context.user_data["order"] = "count"
        update.message.reply_text("📊 Miqdor kiriting:")
    elif context.user_data.get("order") == "count":
        count = int(text)
        price = count * 2  # oddiy narx
        bal = get_balance(user_id)
        if bal < price:
            update.message.reply_text("❌ Balans yetarli emas")
            return
        update_balance(user_id, -price)
        update.message.reply_text(f"✅ Buyurtma qabul qilindi!\nLink: {context.user_data['link']}\nMiqdor: {count}\n💎 -{price}")
        context.user_data["order"] = None

dispatcher.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, message_handler))

# ======================
# FLASK WEBHOOK
# ======================
@app.route(f"/{TOKEN}", methods=["POST"])
def webhook():
    update = Update.de_json(request.get_json(force=True), bot)
    dispatcher.process_update(update)
    return "ok"

@app.route("/")
def index():
    webhook_url = f"https://YOUR_REPLIT_OR_HEROKU_LINK/{TOKEN}"
    bot.set_webhook(webhook_url)
    return "Webhook o‘rnatildi!"

# ======================
# RUN FLASK
# ======================
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
