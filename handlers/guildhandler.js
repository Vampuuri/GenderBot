module.exports = (Discord, client, prefix, guildPronouns, initMessages) => {
    const defaultPronouns = [
        {emoji: '👨', pronouns: 'he/him', roleId: ''},
        {emoji: '👩', pronouns: 'she/her', roleId: ''},
        {emoji: '🧑', pronouns: 'they/them', roleId: ''}
    ];

    // Uusi palvelin liittynyt, lisätään oletuspronominit
    client.on('guildCreate', guild => {
        guildPronouns.set(guild.id, defaultPronouns);
        console.log(`New guild ${guild.id} "${guild.name}" joined!`);

        const pronouns = guildPronouns.get(guild.id);

        for (let pronoun of pronouns) {
            guild.roles.create({data: {name: pronoun.pronouns}})
                .then(role => {
                    pronoun.roleId = role.id;
                })
        }
    });

    // Palvelin poistunut, poistetaan pronominilistalta palvelimen pronominit
    client.on('guildDelete', guild => {
        guildPronouns.delete(guild.id);
        console.log(`Guild ${guild.id} "${guild.name}" left!`);
    });
}