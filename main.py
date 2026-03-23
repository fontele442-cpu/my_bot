import sqlite3
import time
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ApplicationBuilder, CommandHandler, CallbackQueryHandler, MessageHandler, filters, ContextTypes

# --- BOT SETTINGS ---
TOKEN = "8713494465:AAH0UU7rJI4G1nT8VDp6-2Nt5AyQ9FoZ8q0"
ADMIN_ID = 8487361853
CHANNEL_ID = "@Lionfreestars"

REFERRAL_BONUS = 3
BONUS_AMOUNT = 0.5

# --- DATABASE ---
conn = sqlite3.connect("bot.db", check_same_thread=False)
cursor = conn.cursor()

# ❗ MUHIM: eski jadvalni yangilash
cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY,
    username TEXT,
    balance REAL DEFAULT 0,
    refs INTEGER DEFAULT 0,
    inviter INTEGER,
    last_bonus INTEGER DEFAULT 0,
    banned INTEGER DEFAULT 0
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS promocodes (
    code TEXT PRIMARY KEY,
    value REAL,
    uses INTEGER
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS used_codes (
    user_id INTEGER,
    code TEXT
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS orders (
    order_id INTEGER PRIMARY KEY,
    user_id INTEGER,
    amount INTEGER,
    status TEXT
)
""")

conn.commit()

# --- KEYBOARDS ---
def main_menu():
    return InlineKeyboardMarkup([
        [InlineKeyboardButton("🌟 Заработать", callback_data="earn"),
         InlineKeyboardButton("📤 Вывести", callback_data="withdraw")],
        [InlineKeyboardButton("👤 Профиль", callback_data="profile"),
         InlineKeyboardButton("🎁 Бонус", callback_data="bonus")],
        [InlineKeyboardButton("🎁 Промокод", callback_data="promo"),
         InlineKeyboardButton("🏆 Топ", callback_data="top")]
    ])

def back_button():
    return InlineKeyboardMarkup([[InlineKeyboardButton("⬅️ Назад", callback_data="back")]])

def withdraw_buttons():
    return InlineKeyboardMarkup([
        [InlineKeyboardButton("15 ⭐️", callback_data="w_15"),
         InlineKeyboardButton("25 ⭐️", callback_data="w_25")],
        [InlineKeyboardButton("50 ⭐️", callback_data="w_50"),
         InlineKeyboardButton("100 ⭐️", callback_data="w_100")],
        [InlineKeyboardButton("Telegram Premium (350⭐️)", callback_data="w_350")],
        [InlineKeyboardButton("⬅️ Назад", callback_data="back")]
    ])

# --- START ---
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user = update.effective_user
    args = context.args

    inviter = None
    if args:
        try:
            inviter = int(args[0])
        except:
            pass

    username = user.username if user.username else "NoName"

    cursor.execute("SELECT * FROM users WHERE user_id=?", (user.id,))
    if not cursor.fetchone():
        cursor.execute(
            "INSERT INTO users (user_id, username, inviter) VALUES (?, ?, ?)",
            (user.id, username, inviter)
        )
        conn.commit()

        # referral bonus
        if inviter and inviter != user.id:
            cursor.execute(
                "UPDATE users SET refs = refs + 1, balance = balance + ? WHERE user_id=?",
                (REFERRAL_BONUS, inviter)
            )
            conn.commit()

    referral_link = f"https://t.me/Lionfreestarsbot?start={user.id}"

    await update.message.reply_text(
        f"✨ Добро пожаловать!\n\n🔗 Ваша ссылка:\n{referral_link}",
        reply_markup=main_menu()
    )

# --- CALLBACK ---
async def buttons(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    user_id = query.from_user.id
    await query.answer()

    if query.data == "back":
        await query.message.edit_text("Главное меню", reply_markup=main_menu())

    elif query.data == "earn":
        link = f"https://t.me/YOUR_BOT?start={user_id}"
        await query.message.edit_text(
            f"Приглашай друзей:\n\n{link}\n\n+{REFERRAL_BONUS}⭐️",
            reply_markup=back_button()
        )

    elif query.data == "withdraw":
        await query.message.edit_text("Выберите сумму:", reply_markup=withdraw_buttons())

    elif query.data.startswith("w_"):
        amount = int(query.data.split("_")[1])

        cursor.execute("SELECT balance FROM users WHERE user_id=?", (user_id,))
        data = cursor.fetchone()

        if not data:
            return

        bal = data[0]

        if bal < amount:
            await query.message.edit_text("❌ Недостаточно средств", reply_markup=back_button())
            return

        cursor.execute("UPDATE users SET balance = balance - ? WHERE user_id=?", (amount, user_id))
        conn.commit()

        cursor.execute("SELECT MAX(order_id) FROM orders")
        last = cursor.fetchone()[0]
        order_id = 1 if last is None else last + 1

        cursor.execute(
            "INSERT INTO orders VALUES (?, ?, ?, ?)",
            (order_id, user_id, amount, "pending")
        )
        conn.commit()

        await context.bot.send_message(
            chat_id=CHANNEL_ID,
            text=f"🆕 Заявка #{order_id}\nID: {user_id}\nСумма: {amount}⭐️"
        )

        await query.message.edit_text("✅ Заявка отправлена!", reply_markup=back_button())

    elif query.data == "profile":
        cursor.execute("SELECT balance, refs, username FROM users WHERE user_id=?", (user_id,))
        data = cursor.fetchone()

        if not data:
            return

        bal, refs, username = data

        await query.message.edit_text(
            f"👤 @{username}\n💰 {bal}⭐️\n👥 {refs} рефералов",
            reply_markup=back_button()
        )

    elif query.data == "bonus":
        cursor.execute("SELECT last_bonus FROM users WHERE user_id=?", (user_id,))
        data = cursor.fetchone()

        if not data:
            return

        last = data[0]
        now = int(time.time())

        if now - last >= 3600:
            cursor.execute(
                "UPDATE users SET balance = balance + ?, last_bonus=? WHERE user_id=?",
                (BONUS_AMOUNT, now, user_id)
            )
            conn.commit()
            text = f"✅ +{BONUS_AMOUNT}⭐️"
        else:
            text = "❌ Уже получали"

        await query.message.edit_text(text, reply_markup=back_button())

    elif query.data == "promo":
        context.user_data["promo"] = True
        await query.message.edit_text("Введите промокод:")

    elif query.data == "top":
        cursor.execute("SELECT username, refs FROM users ORDER BY refs DESC LIMIT 5")
        rows = cursor.fetchall()

        text = "🏆 ТОП:\n\n"
        for i, row in enumerate(rows):
            name = row[0] if row[0] else "NoName"
            text += f"{i+1}. @{name} — {row[1]}\n"

        await query.message.edit_text(text, reply_markup=back_button())

# --- PROMO ---
async def handle_text(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if context.user_data.get("promo"):
        user_id = update.effective_user.id
        code = update.message.text

        cursor.execute("SELECT value, uses FROM promocodes WHERE code=?", (code,))
        data = cursor.fetchone()

        if not data:
            await update.message.reply_text("❌ Неверный код")
            return

        value, uses = data

        if uses <= 0:
            await update.message.reply_text("❌ Закончился")
            return

        cursor.execute("SELECT * FROM used_codes WHERE user_id=? AND code=?", (user_id, code))
        if cursor.fetchone():
            await update.message.reply_text("❌ Уже использован")
            return

        cursor.execute("UPDATE users SET balance = balance + ? WHERE user_id=?", (value, user_id))
        cursor.execute("UPDATE promocodes SET uses = uses - 1 WHERE code=?", (code,))
        cursor.execute("INSERT INTO used_codes VALUES (?,?)", (user_id, code))
        conn.commit()

        await update.message.reply_text(f"✅ +{value}⭐️")
        context.user_data["promo"] = False

# --- RUN ---
app = ApplicationBuilder().token(TOKEN).build()

app.add_handler(CommandHandler("start", start))
app.add_handler(CallbackQueryHandler(buttons))
app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_text))

app.run_polling()
