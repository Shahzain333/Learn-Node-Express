const { REST, Routes } = require('discord.js')
require('dotenv').config()

const commands = [
    {
        // name: 'ping',
        // description: 'Replies With Pong!'
        name: 'create',
        description: 'Create a new short URL'
    }
]

const token = process.env.DISCORD_BOT_TOKEN

const rest = new REST({ version: '10' }).setToken(token);


(async () => {
    const CLIENT_ID = process.env.CLIENT_ID
    try {

        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

        console.log('Successfully reloaded application (/) commands.');

    } catch (error) {
        console.error(error);
    }

})()

