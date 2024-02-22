// Importamos as dependências necessárias
const { Client, GatewayIntentBits, Collection } = require("discord.js")
require("dotenv").config()

// Importamos as funções que criamos
const { loadEvents, loadCommands } = require("./src/functions")

// Criamos uma instância do client
const client = new Client({
	intents: [GatewayIntentBits.Guilds],
})

// Quando o client (bot) estiver pronto, escrevemos no console
client.once("ready", () => {
	console.log("Olá mundo!")

    client.commands = new Collection()
	client.events = new Collection()

	loadEvents(client)
	loadCommands(client)
})

// Logamos o bot
client.login(process.env.TOKEN)
