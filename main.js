// imports
import dotenv from 'dotenv'
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js'
import { LoadCommandsIn } from './src/functions.js'


// carregando config
dotenv.config()

// variaveis e instancias
const token = process.env.TOKEN
const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.commands = new Collection


// executado ao iniciar
client.once(Events.ClientReady, async readyClient => {
	console.log(`${readyClient.user.tag} foi iniciado...`)

	try {
		await LoadCommandsIn(client)

	} catch (error) {
		console.log(error)
	}
	
	console.log('Todos os comandos foram carregados.')
})

// interações
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return

	const command = interaction.client.commands.get(interaction.commandName);
	
	if (!command) {
		console.log(`O comando ${interaction.commandName} não existe!`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.log(error)
	}

});

// logando client
client.login(token);
