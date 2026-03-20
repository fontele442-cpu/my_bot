import threading
from flask import Flask
from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes

# --- Telegram bot ---
TOKEN = "8604215027:AAFHWgWwxMjHbehlQ5A7-1rR8mIgFCvXFUA"
bot_app = ApplicationBuilder().token(TOKEN).build()

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Bot ishga tushdi ✅")

bot_app.add_handler(CommandHandler("start", start))

# --- Flask server ---
web_app = Flask('')

@web_app.route('/')
def home():
    return "Bot ishlayapti!"

def run():
    web_app.run(host='0.0.0.0', port=8080)

threading.Thread(target=run).start()

# --- Botni ishga tushirish ---
print("Bot ishga tushdi...")
bot_app.run_polling()
