module.exports = {
    name: 'help',
    description: 'Sends instructions',
    execute(message, args, client, guildPronouns, initMessages) {
        const help = `GenderBot instructions

        These commands are only available for server's admin!

        !genderbot init
            Creates a message that will be used to add roles for users
        
        !genderbot deleteinit
            Deletes previous init message
        
        !genderbot updateinit
            Updates init message
        
        !genderbot add [emoji] [pronouns]
            Creates a new pronoun and role for that pronoun
        
        !genderbot delete [pronouns]
            Deletes specified pronoun and role for that pronoun
        
        !genderbot editpronoun [pronouns] [newpronouns]
            Updates specified pronouns' name

        !genderbot editemoji [pronouns] [emoji]
            Updates specified pronouns' emoji

        !genderbot editcolor [pronouns] [color]
            Updates specified pronouns' role's color. See color options here: https://discord.js.org/#/docs/main/master/typedef/ColorResolvable
        `

        message.channel.send(help);
    }
}
