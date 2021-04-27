const updateInit = require('./updateinit.js');

module.exports = {
    name: 'editemoji',
    description: 'Updates emoji for a role',
    execute(message, args, client, guildPronouns, initMessages) {
        const pronouns = guildPronouns.get(message.guild.id);
        const pronounsString = args[0];
        const emoji = args[1];

        for (let pronoun of pronouns) {
            if (pronoun.pronouns === pronounsString && pronoun.emoji !== emoji) {
                pronoun.emoji = emoji;
                message.channel.send(`Emoji updated for ${pronounsString}`);
                console.log(`Guild ${message.guild.id} "${message.guild.name}" - editemoji: emoji updated`);
                updateInit.execute(message, args, client, guildPronouns, initMessages);
                return;
            }
        }
    }
}
