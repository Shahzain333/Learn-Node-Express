const { Client, GatewayIntentBits } = require('discord.js')
require('dotenv').config()

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ] 
});

client.on('messageCreate', (message) => {
    //console.log(message.content)
    if(message.author.bot) return;
    if(message.content.startsWith('create')) {
        const url = message.content.split('create')[1]
        return message.reply({
            content: 'Generating Short ID' + url,
        })
    }
    message.reply({
        content: 'Hi From Bot',
    })
})

client.on('interactionCreate', (interaction) => {
    //console.log(interaction)
    interaction.reply("Pong!")
})

const token = process.env.DISCORD_BOT_TOKEN
client.login(token)

