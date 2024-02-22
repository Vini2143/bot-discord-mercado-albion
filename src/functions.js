const fs = require("fs")
const { promisify } = require("util")

const readdir = promisify(fs.readdir)

async function loadFiles(dirName) {
	const basePath = `${process.cwd().replace(/\\/g, "/")}/src/${dirName}`

	const files = []
	const items = await readdir(basePath)
	for (const item of items) {
		const itemPath = `${basePath}/${item}`
		if (itemPath.endsWith(".js")) {
			files.push(itemPath)
			delete require.cache[require.resolve(itemPath)]
		}
	}

	return files
}

async function loadCommands(client) {
	await client.commands.clear()

	const commandsArray = []

	const Files = await loadFiles("commands")

	Files.forEach((file) => {
		const command = require(file)
		client.commands.set(command.data.name, command)
		commandsArray.push(command.data.toJSON())

		console.log(`Comando: ${command.data.name} ✅`)
	})

	client.application.commands.set(commandsArray)
}

async function loadEvents(client) {
	await client.events.clear()

	const Files = await loadFiles("events")

	Files.forEach((file) => {
		const event = require(file)

		const execute = (...args) => event.execute(...args, client)
		client.events.set(event.name, execute)

		if (event.once) {
			client.once(event.name, execute)
		} else {
			client.on(event.name, execute)
		}

		console.log(`Evento: ${event.name} ✅`)
	})
}

module.exports = {
	loadFiles,
	loadEvents,
	loadCommands,
}
