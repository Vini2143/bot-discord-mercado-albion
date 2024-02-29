import { SlashCommandBuilder, EmbedBuilder, time } from "discord.js";

const test = {
    data: new SlashCommandBuilder()
        .setName('teste')
        .setDescription('teste descrição')
        .addStringOption((option) => {
            return option
                .setName("input")
                .setDescription("uma string qualquer")
                .setRequired(true)
        })
        .addUserOption((option) => {
            return option
                .setName("user")
                .setDescription("um usuário")
                .setRequired(true)
        }),

    execute: async (interaction) => {
        console.log(interaction.options)
        await interaction.reply('testado!');
    },
}


const user = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('descrição do usuário')
        .addUserOption((option) => {
            return option
                .setName("user")
                .setDescription("um usuário")
                .setRequired(true)
        }),

    execute: async (interaction) => {
        const userInfo = interaction.options.getMember('user')
        const embed = new EmbedBuilder()
            .setTitle(userInfo.displayName)
            .setColor(userInfo.displayColor)
            .setThumbnail(userInfo.displayAvatarURL())
            .addFields(
                {
                    name: "Membro do Discord desde",
                    value: time(userInfo.user.createdAt),
                    inline: true,
                },
                {
                    name: "Membro desse servidor desde",
                    value: time(userInfo.joinedAt),
                    inline: true,
                }
            )

        await interaction.reply({ embeds: [embed] });
    },
}
const emmote = {
    data: new SlashCommandBuilder()
        .setName('emmote')
        .setDescription('emmo'),

    execute: async (interaction) => {
        await interaction.reply("( ͡° ͜ʖ ͡°)");
    },
}


export { test, user, emmote }

