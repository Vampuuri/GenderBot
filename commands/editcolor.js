module.exports = {
    name: 'editcolor',
    description: 'Updates color for a role',
    execute(message, args, client, guildPronouns, initMessages) {
        const pronouns = guildPronouns.get(message.guild.id);
        const pronounString = args[0];
        const color = args[1];

        for (let pronoun of pronouns) {
            if (pronoun.pronouns === pronounString) {
                message.guild.roles.fetch(pronoun.roleId)
                    .then(role => {
                        role.edit({color: color})
                            .then(updatedRole => {
                                message.channel.send(`Pronouns updated for ${pronounString}`);
                                console.log(`Guild ${message.guild.id} "${message.guild.name}" - editcolor: color updated`);
                                updateInit.execute(message, args, client, guildPronouns, initMessages);
                            }).catch(e => {
                                console.log(`Guild ${message.guild.id} "${message.guild.name}" - editcolor: couldn't edit role`);
                                console.error(e);
                            })
                    }).catch(e => {
                        console.log(`Guild ${message.guild.id} "${message.guild.name}" - editcolor: couldn't find role`);
                        console.error(e);
                    })
                return;
            }
        }
    }
}
