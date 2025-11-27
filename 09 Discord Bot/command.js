const { REST, Routes } = require('discord.js')

const commands = [
    {
        // name: 'ping',
        // description: 'Replies With Pong!'
        name: 'create',
        description: 'Create a new short URL'
    }
]

const TOKEN = 'MTQ0MzE1NDk0NjY4NTAxNDA5Nw.G7H8tz.206IcGdl3CEiG0Gq0DnOPGWZDRsx-XHiFY1zSo'

const rest = new REST({ version: '10' }).setToken(TOKEN);


(async () => {
    const CLIENT_ID = '1443154946685014097'
    try {

        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

        console.log('Successfully reloaded application (/) commands.');

    } catch (error) {
        console.error(error);
    }

})()

