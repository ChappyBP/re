const db = require('quick.db');
const discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
	config: {
		name: 'autorole',
		aliases: ['set-autorole', 'greet-role'],
		category: 'admin',
		description: 'Adds or Removes the selected role in autorole database',
		usage: 'autorole'
	},
	run: async (bot, message, args) => {
		if (!message.member.hasPermission('ADMINISTRATOR'))
			return message.channel.send(
				new MessageEmbed()
					.setTitle('Ошибка')
					.setDescription(
						':x: Извините, но у вас нет прав на использование этой команды!'
					)
					.setColor('#FF0000')
    .setFooter(`✏ Вызвал: ${message.author.username}`, bot.user.displayAvatarURL())
    .setTimestamp()
			);

		let rrembed = new MessageEmbed()
			.setColor('RANDOM')
			.setTitle('Что ты хочешь делать?')
			.setDescription(
				`
**1.** \`Добавить роль\` - *
Добавляет роль в базу данных*
**2.** \`Удалить роль\` - *Удаляет роль из базы данных*
`
			)
    .setFooter(`✏ Вызвал: ${message.author.username}`, bot.user.displayAvatarURL())
    .setTimestamp();

		message.channel.send(rrembed).then(msg => {
			msg.channel
				.awaitMessages(m => m.author.id === message.author.id, {
					max: 1,
					time: 60000,
					errors: ['TIME']
				})
				.then(collected => {
					switch (collected.first().content.toString()) {
						case '1':
							message.channel.send('Упомините свою роль сейчас!').then(msg => {
								msg.channel
									.awaitMessages(m => m.author.id === message.author.id, {
										max: 1,
										time: 60000,
										errors: ['TIME']
									})
									.then(collected => {
									const fetched = bot.setups.get(message.guild.id, "welcome.roles");
									
									if(fetched === null) {
									  bot.setups.set(message.guild.id, {
									    roles: []
									  }, "welcome")
									};
										let role = collected
											.first()
											.mentions.roles.map(role => role.id)
											.join(' ');
										if (!role)
											return message.reply(
												`Роли не найдены! Пожалуйста, повторите настройку`
											);
										let guildrole = message.guild.roles.cache.get(role);
										let botrole = message.guild.roles.cache.get(
											message.guild.me.roles.highest.id
										);

										if (guildrole.position >= botrole.position) {
											return message.channel.send(
												'Я не могу получить доступ к этой роли, поместите роль @Snowie выше всех / Повторите попытку настройки.'
											);
										}
										bot.setups.push(message.guild.id, role, 'welcome.roles');
										return message.reply(
											(`Роль успешно добавлена в настройки Autorole!`)
										);
									});
							});
							break;
						case '2':
							message.channel.send('Пожалуйста, упомините свою роль сейчас').then(msg => {
								msg.channel
									.awaitMessages(m => m.author.id === message.author.id, {
										max: 1,
										time: 60000,
										errors: ['TIME']
									})
									.then(collected => {
										let role = collected
											.first()
											.mentions.roles.map(role => role.id)
											.join(' ');
										if (!role)
											return message.reply(
												`Роли не найдены! Пожалуйста, повторите настройку`
											);
										try {
											bot.setups.remove(
												message.guild.id,
												role,
												'welcome.roles'
											);
											return message.reply(
												`Роль успешно удалена из программы настройки Autorole`
											);
										} catch (e) {
											console.log(e);
											return message.reply(`Что-то пошло не так: ${e}`);
										}
									});
							});
							break;
						default:
							message.reply(
								String(
									'Извините, такого номера не существует \n Ваш вход:\n> ' +
										collected.first().content
								).substr(0, 1999)
							);
							break;
					}
				})
				.catch(error => {
					console.log(error);
					return message.reply('Извините, но ваше время истекло ⌛!');
				});
		});
	}
};
