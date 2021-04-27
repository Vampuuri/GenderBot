GenderBot

Discord bot that gives roles to users that react to bot's message

The bot can be changed to a generic role-bot by changing the command tag (prefix in main.js) and emptying the default role list (defaultPronouns in handlers/guildhandler.js)

Used libraries
- discord.js
- dotenv

Usage
1. Create .env-file following the example of .env.example. Add your bot's token to TOKEN-variable
2. Run the bot using command node main.js
3. Add bot to a server only after running it so that server's role list is initialized properly

Commands

Commands are usable only by servers admin

!genderbot init - Creates a message that will be used to add roles for users
        
!genderbot deleteinit - Deletes previous init message
        
!genderbot updateinit - Updates init message
        
!genderbot add [emoji] [pronouns] - Creates a new pronoun and role for that pronoun
        
!genderbot delete [pronouns] - Deletes specified pronoun and role for that pronoun
        
!genderbot editpronoun [pronouns] [newpronouns] - Updates specified pronouns' name

!genderbot editemoji [pronouns] [emoji] - Updates specified pronouns' emoji

!genderbot editcolor [pronouns] [color] - Updates specified pronouns' role's color. See color options here: https://discord.js.org/#/docs/main/master/typedef/ColorResolvable
