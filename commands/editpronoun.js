const updateInit = require('./updateinit.js');

module.exports = {
    name: 'editpronoun',
    description: 'Updates pronouns for a role',
    execute(message, args, client, guildPronouns, initMessages) {
        const pronouns = guildPronouns.get(message.guild.id);
        const oldName = args[0];
        const newName = args[1];

        for (let pronoun of pronouns) {
            if (pronoun.pronouns === oldName) {
                pronoun.pronouns = newName;

                message.guild.roles.fetch(pronoun.roleId)
                    .then(role => {
                        role.edit({name: newName})
                            .then(updatedRole => {
                                message.channel.send(`Pronouns updated for ${newName}`);
                                console.log(`Guild ${message.guild.id} "${message.guild.name}" - editpronoun: pronoun updated`);
                                updateInit.execute(message, args, client, guildPronouns, initMessages);
                            }).catch(e => {
                                console.log(`Guild ${message.guild.id} "${message.guild.name}" - editpronoun: couldn't edit role`);
                                console.error(e);
                            })
                    }).catch(e => {
                        console.log(`Guild ${message.guild.id} "${message.guild.name}" - editpronoun: couldn't find role`);
                        console.error(e);
                    })
                return;
            }
        }
    }
}
