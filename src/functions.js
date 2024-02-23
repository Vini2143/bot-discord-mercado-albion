import * as commands from './commands.js'

export async function LoadCommandsTo(collection) {
    
    const commandList = []

    for (const command of Object.values(commands)) {
        collection.set(command.data.name, command.default)

        console.log(`Carregando o comando: ${command.data.name}`)

        commandList.push(command.data.toJSON())
    }

    console.log('Todos os comandos foram carregados')
    return commandList
} 
