// imports
import dotenv from 'dotenv'
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js'
import { LoadCommandsTo } from './src/functions.js'


// carregando config
dotenv.config()

// variaveis e instancias
const token = process.env.TOKEN
const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.commands = new Collection




// executado ao iniciar
client.once(Events.ClientReady, async readyClient => {
	console.log(`${readyClient.user.tag} is running...`)

	LoadCommandsTo(client.commands).then(commandList => {
		client.application.commands.set(commandList)
	})
})

// interações
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.log(`No command matching ${interaction.commandName} was found.`);
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
