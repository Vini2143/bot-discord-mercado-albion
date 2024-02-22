const { SlashCommandBuilder, EmbedBuilder, time } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("user")
		.setDescription("See some information about a user")
		.setDMPermission(false)
		.addUserOption((option) =>
			option
				.setName("user")
				.setNameLocalization("pt-BR", "usuário")
				.setDescription("The user to get information")
				.setDescriptionLocalization("pt-BR", "O usuário para pegar as informações")
				.setRequired(true)
		),
    execute: async ({ interaction }) => {
        // eu sempre gosto de fazer isso para ter mais tempo para responder, fica aquela mensagem que o bot está pensando
        await interaction.deferReply().catch(() => {})

        // pegamos o usuário que foi passado como argumento
        const member = interaction.options.getMember("user")

        // pegamos informações do usuário e colocamos numa embed
        const embed = new EmbedBuilder()
            .setTitle(member.displayName)
            .setColor(member.displayColor)
            .setThumbnail(member.displayAvatarURL())
            .addFields(
                {
                    name: "Membro do Discord desde",
                    value: time(member.user.createdAt),
                    inline: true,
                },
                {
                    name: "Membro desse servidor desde",
                    value: time(member.joinedAt),
                    inline: true,
                }
            )
            .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL() })

        // temos que editar a resposta e não só responder porque deferReply() foi usado anteriormente
        interaction.editReply({ embeds: [embed] })
    },
}
    
