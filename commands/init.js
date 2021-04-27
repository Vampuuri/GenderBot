module.exports = {
    name: 'init',
    description: 'Initialize GenderBot message',
    execute(message, args, client, guildPronouns, initMessages) {
        if (initMessages.has(message.guild.id)) {
            console.log(`Guild ${message.guild.id} "${message.guild.name}" - init: Init message already exists.`);
            message.channel.send('Init message already exists! Please use "!genderbot deleteinit" to delete the old message.');
        } else {
            const reply = [
                'Hello! This is GenderBot.',
                'I give out roles that show your pronouns. Just react to this message with an emote shown bellow and I\'ll add the role for you.',
                'Like in real life, you can have as many pronouns as you want!',
                'If you don\'t see your preferred pronouns, ask for your server\'s admin to add them!',
                ''
            ]

            const pronouns = guildPronouns.get(message.guild.id);

            for (let pronoun of pronouns) {
                reply.push(`${pronoun.emoji} **${pronoun.pronouns}**`);
            }

            message.channel.send(reply)
                .then(message => {
                    initMessages.set(message.guild.id, message.id);
                    console.log(`Guild ${message.guild.id} "${message.guild.name}" - init: Init message created.`);
                }).catch(e => {
                    console.log(`Guild ${message.guild.id} "${message.guild.name}" - init: Something went wrong when creating init message.`);
                    console.error(e);
                });
        }
    }
}
