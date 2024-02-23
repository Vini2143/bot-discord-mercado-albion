import { SlashCommandBuilder } from "discord.js";

const test = {
    data: new SlashCommandBuilder()
    .setName('teste')
    .setDescription('teste descrição'),

    async execute(interaction) {
        await interaction.reply('testado!');
    },
}


export { test }