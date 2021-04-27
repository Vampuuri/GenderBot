const updateInit = require('./updateinit.js');

module.exports = {
    name: 'delete',
    description: 'Deletes pronoun and role associated with it',
    execute(message, args, client, guildPronouns, initMessages) {
        const pronouns = guildPronouns.get(message.guild.id);

        const pronounString = args[0];
        let deleteIndex;

        for (let index in pronouns) {
            if (pronouns[index].pronouns = pronounString) {
                deleteIndex = index;

                message.guild.roles.fetch(pronouns[index].roleId)
                    .then(role => {
                        role.delete()
                            .then(deletedRole => {
                                message.channel.send(`Pronouns ${deletedRole.name} deleted!`);
                                console.log(`Guild ${message.guild.id} "${message.guild.name}" - delete: pronoun deleted`);
                            }).catch(e => {
                                console.log(`Guild ${message.guild.id} "${message.guild.name}" - delete: couldn't delete role`);
                                console.error(e);
                            })
                    }).catch(e => {
                        console.log(`Guild ${message.guild.id} "${message.guild.name}" - delete: couldn't find role`);
                        console.error(e);
                    })

                break;
            }
        }

        if (deleteIndex) {
            pronouns.splice(deleteIndex, 1);
            updateInit.execute(message, args, client, guildPronouns, initMessages);
        }

    }
}
