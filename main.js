const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const prefix = '!genderbot';

// Fetches and configures variables from .env file
const dotenv = require('dotenv');
dotenv.config();

const guildPronouns = new Discord.Collection();
const initMessages = new Discord.Collection();

// For testing purposes
guildPronouns.set('810525153506361384', [
    {emoji: '👨', pronouns: 'he/him', roleId: '836291558206078976'},
    {emoji: '👩', pronouns: 'she/her', roleId: '836291559104053289'},
    {emoji: '🧑', pronouns: 'they/them', roleId: '836291560328003636'}
]);

client.on('ready', () => {
    console.log('GenderBot is ready for action!');
});

const handlerFiles = fs.readdirSync('./handlers/');

for (const handlerFile of handlerFiles) {
    require('./handlers/' + handlerFile)(Discord, client, prefix, guildPronouns, initMessages);
}

client.login(process.env.TOKEN);