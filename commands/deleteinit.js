module.exports = {
    name: 'deleteinit',
    description: 'Deletes Genderbot\'s init message',
    execute(message, args, client, guildPronouns, initMessages) {
        if (initMessages.has(message.guild.id)) {
            message.channel.messages.delete(initMessages.get(message.guild.id))
                .then(deletedMessage => {
                    initMessages.delete(message.guild.id);
                    console.log(`Guild ${message.guild.id} "${message.guild.name}" - deleteinit: Init message deleted.`);
                }).catch(e => {
                    console.log(`Guild ${message.guild.id} "${message.guild.name}" - deleteinit: Init message could not be deleted.`);
                    initMessages.delete(message.guild.id);
                    console.error(e);
                    message.channel.send('Init message could not be deleted.');
                })
        }
    }
}
