const db = require('old-wio.db');

module.exports = {
    config: {
        name: "disablemodlogchannel",
        aliases: ['dmc', 'disablem', 'disablemodlog'],
        category: 'admin',
        description: 'Disables Server Modlog Channel',
        usage: '[channel name | channel mention | channel ID]',
        accessableby: 'Administrators'
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**:x: Недостаточно прав**")

        try {
            let a = db.fetch(`modlog_${message.guild.id}`)

            if (!a) {
                return message.channel.send('**Логирование не установленно**')
            } else {
                let channel = message.guild.channels.cache.get(a)
                bot.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send("**Welcome Channel Disabled!**")
                db.delete(`modlog_${message.guild.id}`)

                message.channel.send(`**Логирование в канале \`${channel.name}\` было отключенно**`)
            }
            return;
        } catch {
            return message.channel.send("**:x: Недостаточно прав бота`**")
        }
    }
}