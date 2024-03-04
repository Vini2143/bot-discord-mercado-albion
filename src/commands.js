import { SlashCommandBuilder, EmbedBuilder, time } from "discord.js"
import { readFileSync } from 'fs'

const test = {
    data: new SlashCommandBuilder()
        .setName('teste')
        .setDescription('teste descrição')
        .addStringOption(option => {
            return option
                .setName("input")
                .setDescription("uma string qualquer")
                .setRequired(true)
        })
        .addUserOption(option => {
            return option
                .setName("user")
                .setDescription("um usuário")
                .setRequired(true)
        }),

    execute: async (interaction) => {
        console.log(interaction.options)
        await interaction.reply('testado!')
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

        await interaction.reply({ embeds: [embed] })
    },
}
const price = {
    data: new SlashCommandBuilder()
        .setName('price')
        .setDescription('retorna uma lista de registros do item')
        .addStringOption(option => {
            return option
                .setName("busca")
                .setDescription("nome do item")
                .setRequired(true)
        }),

    execute: async (interaction) => {
        //const busca = interaction.options.getMember('busca')
    
        const fields = []


        const embed = new EmbedBuilder()
            .addFields(
                {
                    name: 'item',
                    value: 'registros',
                    inline: true,
                }
            )

        await interaction.reply({ embeds: [embed] })
    },
}


export { test, user, price }

