const { MessageFlags } = require('discord.js');

module.exports = (Discord, client, prefix, guildPronouns, initMessages) => {
    client.on('messageReactionAdd', (messageReaction, user) => {
        if (messageReaction.message.id !== initMessages.get(messageReaction.message.guild.id)) {return;}

        const guild = messageReaction.message.guild;
        const pronouns = guildPronouns.get(guild.id);
        const emoji = messageReaction.emoji.name;

        for (let pronoun of pronouns) {
            if (pronoun.emoji === emoji) {
                guild.roles.fetch(pronoun.roleId)
                    .then(role => {
                        guild.members.fetch(user)
                            .then(member => {
                                member.roles.add(role).then(updatedMember => {
                                    console.log(`Guild ${guild.id} "${guild.name}" - messageReactionAdd: added role for ${updatedMember.displayName}`);
                                }).catch(e => {
                                    console.log(`Guild ${guild.id} "${guild.name}" - messageReactionAdd: couldn't add role for ${member.displayName}`);
                                    console.error(e)
                                })
                            }).catch(e => {
                                console.log(`Guild ${guild.id} "${guild.name}" - messageReactionAdd: member not found`);
                                console.error(e)
                            })
                    }).catch(e => {
                        console.log(`Guild ${guild.id} "${guild.name}" - messageReactionAdd: role not found`);
                        console.error(e)
                    })
                return;
            }
        }
    });

    client.on('messageReactionRemove', (messageReaction, user) => {
        if (messageReaction.message.id !== initMessages.get(messageReaction.message.guild.id)) {return;}

        const guild = messageReaction.message.guild;
        const pronouns = guildPronouns.get(guild.id);
        const emoji = messageReaction.emoji.name;

        for (let pronoun of pronouns) {
            if (pronoun.emoji === emoji) {
                guild.roles.fetch(pronoun.roleId)
                    .then(role => {
                        guild.members.fetch(user)
                            .then(member => {
                                member.roles.remove(role).then(updatedMember => {
                                    console.log(`Guild ${guild.id} "${guild.name}" - messageReactionRemove: removed role from ${updatedMember.displayName}`);
                                }).catch(e => {
                                    console.log(`Guild ${guild.id} "${guild.name}" - messageReactionRemove: couldn't remove role from ${member.displayName}`);
                                    console.error(e)
                                })
                            }).catch(e => {
                                console.log(`Guild ${guild.id} "${guild.name}" - messageReactionRemove: member not found`);
                                console.error(e)
                            })
                    }).catch(e => {
                        console.log(`Guild ${guild.id} "${guild.name}" - messageReactionRemove: role not found`);
                        console.error(e)
                    })
                return;
            }
        }
    });
}