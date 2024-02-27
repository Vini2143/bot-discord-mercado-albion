import * as commands from './commands.js'

export async function LoadCommandsIn(client) {
    
    const commandList = []

    for (const command of Object.values(commands)) {
        client.commands.set(command.data.name, command)

        console.log(`Comando ${command.data.name} carregado com sucesso!`)

        commandList.push(command.data.toJSON())
    }

    client.application.commands.set(commandList)
} 
