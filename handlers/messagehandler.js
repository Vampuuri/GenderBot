const { Permissions } = require('discord.js');
const fs = require('fs');

module.exports = (Discord, client, prefix, guildPronouns, initMessages) => {
    const commands = new Discord.Collection();
    const commandFiles = fs.readdirSync('./commands/');

    for (const commandFile of commandFiles) {
        const command = require('../commands/' + commandFile);
        commands.set(command.name, command);
    }

    client.on('message', message => {
        if (!message.content.startsWith(prefix) || !message.member.hasPermission(Permissions.FLAGS.ADMINISTRATOR)) {
            return;
        }

        const command = message.content.split(' ')[1];
        const args = message.content.split(' ').slice(2);

        if (!command) {
            message.channel.send('Present!');
            return;
        }

        if (commands.has(command)) {
            commands.get(command).execute(message, args, client, guildPronouns, initMessages);
            return;
        } else {
            message.channel.send(`Command  not recognized. Send message "!genderbot help" to see all commands.`);
        }
    });
}