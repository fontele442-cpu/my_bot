import sqlite3
import requests
from telegram import Update, ReplyKeyboardMarkup
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, filters, ContextTypes

TOKEN = "8648891805:AAFouYZtVYHMGzJJ2dOrTX_mCvYnu53orDM"
bot_username = "seenarzonsmm571bot"  # referral link uchun
admins = [8487361853]

# DATABASE
conn = sqlite3.connect("bot.db", check_same_thread=False)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY,
    balance INTEGER DEFAULT 0,
    orders INTEGER DEFAULT 0,
    vip INTEGER DEFAULT 0,
    ref INTEGER DEFAULT 0,
    referred_by INTEGER DEFAULT NULL
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS channels (
    username TEXT PRIMARY KEY
)
""")
conn.commit()

# API SOZLAMALARI
settings = {
    "api_url": "",
    "api_key": "",
    "services": {}  # {"❤️ Like": service_id, "👁 View": id, ...}
}

broadcast_mode = {}

# USER QO‘SHISH
def add_user(user_id, ref_id=None):
    cursor.execute("SELECT * FROM users WHERE user_id=?", (user_id,))
    if cursor.fetchone() is None:
        cursor.execute("INSERT INTO users(user_id, referred_by) VALUES(?,?)", (user_id, ref_id))
        conn.commit()
        if ref_id:
            # referral bonus
            cursor.execute("UPDATE users SET balance = balance + 500, ref = ref + 1 WHERE user_id=?", (ref_id,))
            conn.commit()

def get_balance(user_id):
    cursor.execute("SELECT balance FROM users WHERE user_id=?", (user_id,))
    return cursor.fetchone()[0]

def is_vip(user_id):
    cursor.execute("SELECT vip FROM users WHERE user_id=?", (user_id,))
    return cursor.fetchone()[0] == 1

def set_vip(user_id):
    cursor.execute("UPDATE users SET vip=1 WHERE user_id=?", (user_id,))
    conn.commit()

def add_order(user_id):
    cursor.execute("UPDATE users SET orders = orders + 1 WHERE user_id=?", (user_id,))
    conn.commit()

def get_refs(user_id):
    cursor.execute("SELECT ref FROM users WHERE user_id=?", (user_id,))
    return cursor.fetchone()[0]

def get_channels():
    cursor.execute("SELECT username FROM channels")
    return [row[0] for row in cursor.fetchall()]

def add_channel(username):
    cursor.execute("INSERT OR IGNORE INTO channels(username) VALUES(?)", (username,))
    conn.commit()

def del_channel(username):
    cursor.execute("DELETE FROM channels WHERE username=?", (username,))
    conn.commit()

# OBUNA TEKSHIRISH
async def check_sub(update, context):
    user_id = update.effective_user.id
    for ch in get_channels():
        try:
            member = await context.bot.get_chat_member(ch, user_id)
            if member.status in ["left", "kicked"]:
                return False
        except:
            return False
    return True

# SMM API BUYURTMA
def send_order(service, link, qty):
    service_id = settings["services"].get(service)
    if not service_id:
        return {"error": "Service ID yo'q"}
    data = {
        "key": settings["api_key"],
        "action": "add",
        "service": service_id,
        "link": link,
        "quantity": qty
    }
    try:
        r = requests.post(settings["api_url"], data=data)
        return r.json()
    except:
        return {"error": "API xato"}

# START
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id

    ref_id = None
    if context.args:
        try:
            ref_id = int(context.args[0])
        except:
            pass

    add_user(user_id, ref_id)

    if get_channels():
        if not await check_sub(update, context):
            text = "❗ Botdan foydalanish uchun quyidagi kanallarga obuna bo‘ling:\n"
            for ch in get_channels():
                text += f"👉 {ch}\n"
            await update.message.reply_text(text)
            return

    keyboard = [
        ["➕ Buyurtma"],
        ["💰 Balans"],
        ["👤 Referral"]
    ]
    if user_id in admins:
        keyboard.append(["🛠 Admin panel"])

    await update.message.reply_text("🚀 VIP SMM BOT", reply_markup=ReplyKeyboardMarkup(keyboard, resize_keyboard=True))

# ADMIN PANEL
async def admin_panel(update, context):
    keyboard = [
        ["⭐ VIP berish"],
        ["🌐 API sozlash"],
        ["⚙️ Service ID"],
        ["💰 Balans boshqarish"],
        ["📢 Broadcast"],
        ["🔐 Admin qo‘shish"],
        ["🔒 Majburiy obuna"],
        ["👥 Userlar"],
        ["📊 Statistika"],
        ["🔙 Orqaga"]
    ]
    await update.message.reply_text("🛠 Admin panel", reply_markup=ReplyKeyboardMarkup(keyboard, resize_keyboard=True))

# API PANEL
async def api_panel(update, context):
    keyboard = [
        ["🔗 API URL"],
        ["🔑 API KEY"],
        ["🔙 Orqaga"]
    ]
    await update.message.reply_text("🌐 API sozlash", reply_markup=ReplyKeyboardMarkup(keyboard, resize_keyboard=True))

# HANDLE
async def handle(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    text = update.message.text

    # OBUNA TEKSHIRISH
    if get_channels() and not await check_sub(update, context):
        await update.message.reply_text("❗ Avval kanallarga obuna bo‘ling")
        return

    # ADMIN PANEL
    if text == "🛠 Admin panel" and user_id in admins:
        await admin_panel(update, context)
        return

    # VIP berish
    elif text == "⭐ VIP berish" and user_id in admins:
        await update.message.reply_text("User ID yubor:")
        context.user_data["vip"] = True
        return
    elif context.user_data.get("vip"):
        set_vip(int(text))
        await update.message.reply_text("✅ VIP berildi")
        context.user_data["vip"] = False
        return

    # API sozlash
    elif text == "🌐 API sozlash" and user_id in admins:
        await api_panel(update, context)
        return
    elif context.user_data.get("api_url"):
        settings["api_url"] = text
        await update.message.reply_text("✅ API URL saqlandi")
        context.user_data["api_url"] = False
        return
    elif context.user_data.get("api_key"):
        settings["api_key"] = text
        await update.message.reply_text("✅ API KEY saqlandi")
        context.user_data["api_key"] = False
        return

    elif text == "🔗 API URL" and user_id in admins:
        await update.message.reply_text("URL yubor:")
        context.user_data["api_url"] = True
        return
    elif text == "🔑 API KEY" and user_id in admins:
        await update.message.reply_text("KEY yubor:")
        context.user_data["api_key"] = True
        return

    # Service ID boshqarish
    elif text == "⚙️ Service ID" and user_id in admins:
        await update.message.reply_text("Masalan: ❤️ Like 123")
        context.user_data["service"] = True
        return
    elif context.user_data.get("service"):
        try:
            name, sid = text.rsplit(" ",1)
            settings["services"][name] = int(sid)
            await update.message.reply_text("✅ Saqlandi")
        except:
            await update.message.reply_text("❌ Xato format")
        context.user_data["service"] = False
        return

    # Balans boshqarish
    elif text == "💰 Balans boshqarish" and user_id in admins:
        await update.message.reply_text("ID SUMMA formatida yubor:")
        context.user_data["balance"] = True
        return
    elif context.user_data.get("balance"):
        try:
            uid, amount = text.split()
            uid = int(uid)
            amount = int(amount)
            cursor.execute("UPDATE users SET balance = balance + ? WHERE user_id=?", (amount, uid))
            conn.commit()
            await update.message.reply_text("✅ Qo‘shildi")
        except:
            await update.message.reply_text("❌ Xato")
        context.user_data["balance"] = False
        return

    # Broadcast
    elif text == "📢 Broadcast" and user_id in admins:
        await update.message.reply_text("Xabar yubor:")
        broadcast_mode[user_id] = True
        return
    elif broadcast_mode.get(user_id):
        for uid, *_ in cursor.execute("SELECT user_id FROM users"):
            try:
                await context.bot.send_message(uid, text)
            except:
                pass
        await update.message.reply_text("✅ Yuborildi")
        broadcast_mode[user_id] = False
        return

    # Admin qo‘shish
    elif text == "🔐 Admin qo‘shish" and user_id in admins:
        await update.message.reply_text("Admin ID yubor:")
        context.user_data["add_admin"] = True
        return
    elif context.user_data.get("add_admin"):
        admins.append(int(text))
        await update.message.reply_text("✅ Yangi admin qo‘shildi")
        context.user_data["add_admin"] = False
        return

    # Majburiy obuna
    elif text == "🔒 Majburiy obuna" and user_id in admins:
        keyboard = [["➕ Qo‘shish"], ["➖ O‘chirish"], ["📋 Ro‘yxat"], ["🔙 Orqaga"]]
        await update.message.reply_text("Majburiy obuna:", reply_markup=ReplyKeyboardMarkup(keyboard, resize_keyboard=True))
        return
    elif text == "➕ Qo‘shish" and user_id in admins:
        await update.message.reply_text("Kanal username yubor (@username):")
        context.user_data["add_channel"] = True
        return
    elif context.user_data.get("add_channel"):
        add_channel(text)
        await update.message.reply_text("✅ Qo‘shildi")
        context.user_data["add_channel"] = False
        return
    elif text == "➖ O‘chirish" and user_id in admins:
        await update.message.reply_text("O‘chirish uchun username yubor:")
        context.user_data["del_channel"] = True
        return
    elif context.user_data.get("del_channel"):
        del_channel(text)
        await update.message.reply_text("✅ O‘chirildi")
        context.user_data["del_channel"] = False
        return
    elif text == "📋 Ro‘yxat" and user_id in admins:
        chs = get_channels()
        if chs:
            await update.message.reply_text("\n".join(chs))
        else:
            await update.message.reply_text("❌ Bo‘sh")
        return

    # Userlar
    elif text == "👥 Userlar" and user_id in admins:
        cursor.execute("SELECT COUNT(*) FROM users")
        await update.message.reply_text(f"👥 {cursor.fetchone()[0]} ta user")
        return

    # Statistika
    elif text == "📊 Statistika" and user_id in admins:
        cursor.execute("SELECT SUM(orders) FROM users")
        await update.message.reply_text(f"📊 Jami buyurtmalar: {cursor.fetchone()[0]}")
        return

    # Referral
    elif text == "👤 Referral":
        link = f"https://t.me/{bot_username}?start={user_id}"
        refs = get_refs(user_id)
        await update.message.reply_text(f"👤 Sizning linkingiz:\n{link}\nReferallar: {refs}\n💰 Har biriga: 500 so'm")
        return

    # Buyurtma
    elif text == "➕ Buyurtma":
        await update.message.reply_text("Xizmat yoz (masalan: ❤️ Like):")
        context.user_data["step"] = "service"
        return
    elif context.user_data.get("step") == "service":
        context.user_data["service"] = text
        await update.message.reply_text("Link yubor:")
        context.user_data["step"] = "link"
        return
    elif context.user_data.get("step") == "link":
        context.user_data["link"] = text
        await update.message.reply_text("Soni:")
        context.user_data["step"] = "qty"
        return
    elif context.user_data.get("step") == "qty":
        qty = int(text)
        if is_vip(user_id):
            qty = int(qty * 1.2)
        add_order(user_id)
        result = send_order(context.user_data["service"], context.user_data["link"], qty)
        await update.message.reply_text(f"✅ Buyurtma ketdi! ({qty})\n{result}")
        context.user_data.clear()
        return

    # Balans
    elif text == "💰 Balans":
        bal = get_balance(user_id)
        vip = "⭐ VIP" if is_vip(user_id) else "Oddiy"
        await update.message.reply_text(f"💰 {bal} so'm\nStatus: {vip}")
        return

    elif text == "🔙 Orqaga":
        await start(update, context)
        return

# MAIN
app = ApplicationBuilder().token(TOKEN).build()
app.add_handler(CommandHandler("start", start))
app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle))

print("🔥 FULL PRO VIP BOT ISHLADI")
app.run_polling()
