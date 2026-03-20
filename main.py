import os
from telegram.ext import Updater, CommandHandler

TOKEN = os.environ.get("8604215027:AAFHWgWwxMjHbehlQ5A7-1rR8mIgFCvXFUA")

def start(update, context):
    update.message.reply_text("Bot ishga tushdi ✅")

updater = Updater(TOKEN)
updater.dispatcher.add_handler(CommandHandler("start", start))
updater.start_polling()
updater.idle()
