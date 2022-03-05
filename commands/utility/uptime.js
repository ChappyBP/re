const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "uptime",
        description: "Shows Uptime of bot",
        aliases: ["up"],
        category: "utility",
        usage: " ",
    },
    run: async(bot, message, args) => {
        let days = Math.floor(bot.uptime / 86400000);
        let hours = Math.floor(bot.uptime / 3600000) % 24;
        let minutes = Math.floor(bot.uptime / 60000) % 60;
        let seconds = Math.floor(bot.uptime / 1000) % 60;

        const embed = new MessageEmbed()
            .setTitle("Онлайн")
            .setColor("RANDOM")
            .setDescription(`Я в сети  **${days}** дни
, **${hours}** часы, **${minutes}** минуты, **${seconds}** секунды`)
    .setFooter(`✏ Вызвал: ${message.author.username}`, bot.user.displayAvatarURL())
    .setTimestamp();
    }
}