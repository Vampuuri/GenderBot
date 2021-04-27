module.exports = {
    name: 'updateinit',
    description: 'Updates existing init message',
    execute(message, args, client, guildPronouns, initMessages) {
        if (!initMessages.has(message.guild.id)) {
            console.log(`Guild ${message.guild.id} "${message.guild.name}" - updateinit: init message does not exist`);
        } else {
            const content = [
                'Hello! This is GenderBot.',
                'I give out roles that show your pronouns. Just react to this message with an emote shown bellow and I\'ll add the role for you.',
                'Like in real life, you can have as many pronouns as you want!',
                'If you don\'t see your preferred pronouns, ask for your server\'s admin to add them!',
                ''
            ]

            const pronouns = guildPronouns.get(message.guild.id);

            for (let pronoun of pronouns) {
                content.push(`${pronoun.emoji} **${pronoun.pronouns}**`);
            }

            message.channel.messages.fetch(initMessages.get(message.guild.id))
                .then(fetchedMessage => {
                    fetchedMessage.edit({content: content})
                        .then(editedMessage => {
                            console.log(`Guild ${message.guild.id} "${message.guild.name}" - updateinit: init message updated`);
                        }).catch(e => {
                            console.log(`Guild ${message.guild.id} "${message.guild.name}" - updateinit: init message couldn't be edited`);
                            console.error(e)
                        })
                }).catch(e => {
                    console.log(`Guild ${message.guild.id} "${message.guild.name}" - updateinit: init message couldn't be found`);
                    console.error(e)
                })
        }
    }
}
