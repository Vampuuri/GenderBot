const updateInit = require('./updateinit.js');

module.exports = {
    name: 'add',
    description: 'Adds new pronouns and role',
    execute(message, args, client, guildPronouns, initMessages) {
        const pronouns = guildPronouns.get(message.guild.id);

        const emoji = args[0];
        const pronounsString = args[1];

        for (let pronoun of pronouns) {
            if (pronoun.pronouns === pronounsString) {
                message.channel.send(`Role for pronouns ${pronounsString} already exists!`);
                return;
            }
            if (pronoun.emoji === emoji) {
                message.channel.send(`Emoji ${emoji} is already taken by another pronouns.`);
                return;
            }
        }

        message.guild.roles.create({data: {name: pronounsString}})
            .then(role => {
                pronouns.push({emoji: emoji, pronouns: pronounsString, roleId: role.id});
                console.log(`Guild ${message.guild.id} "${message.guild.name}" - add: New pronouns added`);
                message.channel.send(`Role for ${pronounsString} has been added!`);
                updateInit.execute(message, args, client, guildPronouns, initMessages);
            }).catch(e => {
                console.log(`Guild ${message.guild.id} "${message.guild.name}" - add: Couldn't create new role.`);
                console.error(e);
                message.channel.send(`New role could not be created.`);
            })
    }
}
