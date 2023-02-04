process.env.NODE_ENV !== 'production' ? require("dotenv").config({ path: ".env" }) : null;
const TelegramBot = require('node-telegram-bot-api');
const adminId = process.env.adminId
let bot = new TelegramBot(process.env.BOT_TOKEN, {
    polling: { interval: 300, autoStart: true, params: { timeout: 10 } }
});
bot.on('message', msg => {
    const { id } = msg.chat;
    if (!msg.reply_to_message || id != adminId) {
        if (msg.text === '/start') {
            bot.sendMessage(
                id, `Assalomu alaykum, *${msg.from.first_name}.*\n\n_Xabaringizni qoldiring, tez orada javob berishga harakat qilaman._`, { parse_mode: "Markdown" }
            ).then(() => { bot.sendMessage(id, `📝`) })
        }
        else {
            bot.forwardMessage(adminId, id, msg.message_id).then(() => { bot.sendMessage(id, "Xabaringiz qabul qilindi ✅") })
        }
    } else {
        if (msg.text) {
            bot.sendMessage(msg.reply_to_message.forward_from.id, msg.text)
        } else {
            bot.forwardMessage(msg.reply_to_message.forward_from.id, id, msg.message_id)
        }
    }
});