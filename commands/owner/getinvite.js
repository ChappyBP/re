const { OWNER_ID } = require("../../config");

module.exports = {
    config: {
        name: "getinvite",
        aliases: ['getinv', 'gi'],
        category: "owner",
        description: "Generates an invitation to the server in question.",
        usage: "[ID | name]",
    },
    run: async(bot, message, args) => {
        if (message.author.id === OWNER_ID) {
        let guild = null;

        if (!args[0]) return message.channel.send("Укажите айди сервера")

        if(args[0]){
            let fetched = bot.guilds.cache.find(g => g.name === args.join(" "));
            let found = bot.guilds.cache.get(args[0]);
            if(!found) {
                if(fetched) {
                    guild = fetched;
                }
            } else {
                guild = found
            }
        } else {
            return message.channel.send("Неверный айди");
        }
        if(guild){
            let tChannel = guild.channels.cache.find(ch => ch.type == "text" && ch.permissionsFor(ch.guild.me).has("CREATE_INSTANT_INVITE"));
            if(!tChannel) {
                return message.channel.send("Ошибка"); 
            }
            let invite = await tChannel.createInvite({ temporary: false, maxAge: 0 }).catch(err => {
                return message.channel.send(`${err} Ошибка`);
            });
            message.channel.send(invite.url);
        } else {
            return message.channel.send(`\`${args.join(' ')}\` - Бота нету на этом сервере`);
        }
    } else {
        return;
    }
    }

}