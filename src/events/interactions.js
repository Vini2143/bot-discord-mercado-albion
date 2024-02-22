module.exports = {
	name: "interactionCreate",
	execute: async (interaction, client) => {
		// se a interação for um comando de chat, continuamos
		if (interaction.isChatInputCommand()) {
			// pegamos o comando pelo nome
			const command = client.commands.get(interaction.commandName)

			// invocamos a função execute do comando, passando algumas informações úteis
			command.execute({
				interaction,
				client,
				member: interaction.member,
				guild: interaction.guild,
				user: interaction.user,
				channel: interaction.channel,
			})
		}
	},
}
