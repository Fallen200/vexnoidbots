var Discord = require('discord.js');
var bot = new Discord.Client();
var fs = require ('fs'); 

function userInfo(user) {
    var finalString = '';

    finalString += '**User Name: ** ***' + user.username + '*** \n**Id: ** ***' + user.id + '***';

    var userCreated = user.createdAt.toString().split(' ');
    finalString += '\n**Date Created: ** ***' + userCreated + '***';

    return finalString;
}

var userData = JSON.parse(fs.readFileSync('Sec2/userData.json', 'utf8'));
var commandsList = fs.readFileSync('Sec2/commands.txt', 'utf8');

bot.on('message', message => {

    var sender = message.author;
    var msg = message.content.toUpperCase();
    var prefix = '!'
    let cont = message.content.slice(prefix.length).split(" ");
    let args = cont.slice(1);

    if (sender.id === '434842741718122518') {
        return;
    }
    
    if (msg === prefix + 'PURGE') {
        async function purge() {
            message.delete();

            if (!message.member.roles.find("name", "Mod")) {
                message.channel.send('You must have the `Mod` role to use this command!')
                return;
            }

            if (isNaN(args[0])) {

            message.channel.send('Please use a number! **Ex: !Purge 20**')
            return;
            }

            const fetched = await message.channel.fetchMessage({liment: args[0]})

            message.channel.bulkDelete(fetched)
                .catch(error => message.channel.send(`Error ${error}`))

        }

        purge();

    }

    if (msg === prefix + 'VEXNOID') {
        let embed = new Discord.RichEmbed()
        .setTitle('VexNoid Info')
        .addField('CEO\'s', 'Ethan B & Jack H', true)
        .addField('Date Created', message.guild.createdAt, true)
        .addField('Members', 'Lore Ipsum', true)
        .addField('ID', message.guild.id, true)
        .addField('Region', message.guild.region, true)
        .addField('Verification Level', message.guild.verificationLevel, true)
        .setThumbnail(message.guild.iconURL, true)
        .setColor(0xFF0000)
        .setFooter("Made By VexNoid | Jack H")
        message.channel.send(embed)
    }

    if (msg === prefix + 'HELP') {
        message.channel.send(commandsList)
    }

    if (msg === prefix + 'TEST') {
        message.channel.send('Members: ' + bot.guilds.membercount)
    }

    if (msg === prefix + 'CREATOR') {
        message.channel.send("**I was created by Shaded#9211**")
    }

    if (msg === prefix + 'EthanShadedSafeRole1') {
        message.member.addRole(message.guild.roles.find("name", "Star"));
    }

    if (message.channel.id === '434847813608669205') {
        if (isNaN(message.content)) {
            message.delete()
            message.author.send('This channel is only ment for numbers! Any text posted in this channel will be deleted.')
        }
    }

    if (msg.includes('FUCK')) {
        message.delete();
        message.author.send("Please do not say that!")
    }

    if (msg.includes('NIGGER')) {
        message.delete();
        message.author.send("Please do not say that!")
    }

    if (msg.includes('SHIT')) {
        message.delete();
        message.author.send("Please do not say that!")
    }

    if (msg.includes('DICK')) {
        message.delete();
        message.author.send("Please do not say that!")
    }

    if (msg.includes('RETARD')) {
        message.delete();
        message.author.send("Please do not say that!")
    }

    if (msg.includes('ASS')) {
        message.delete();
        message.author.send("Please do not say that!")
    }

    if (msg.includes('BITCH')) {
        message.delete();
        message.author.send("Please do not say that!")
    }

    if (msg.includes('HELL')) {
        message.delete();
        message.author.send("Please do not say that!")
    }

    if (msg.includes('PUSSY')) {
        message.delete();
        message.author.send("Please do not say that!")
    }

    if (msg.startsWith(prefix + 'USERINFO')) {
        if (msg === prefix + 'USERINFO') {
            message.channel.send(userInfo(sender));
        }
    }

    if (msg === prefix + 'MESSAGES') {
        message.channel.send('You have sent **' + userData[sender.id].messagesSent + '** messages!')
    }

    if (msg === prefix + 'PING') {
        module.exports.run = async (bot, message, args) => {
            message.channel.send(`Pong! \`${bot.ping}ms\``);
          }
    }

    if (!userData[sender.id]) userData[sender.id] = {
        messagesSent: 0

    }

    userData[sender.id].messagesSent++;

    fs.writeFile('Sec2/userData.json', JSON.stringify(userData), (err) => {
        if (err) console.error(err);
    });

});

bot.on('ready', () => {
    console.log('Bot Online...')

    var prefix = '!'

    bot.user.setStatus('dnd')

    bot.user.setActivity('Prefix ' + prefix + ' | Alpha V1 | Made By VexNoid')
});

bot.on('guildMemberAdd', member => {

    var role = member.guild.roles.find('name', 'Guest')

    member.addRole(role)

    member.guild.channels.get('424375148636930059').send('**' + member.user.username + '** just joined the Discord!')

});

bot.on('guildMemberRemove', member => {

    member.guild.channels.get('424375148636930059').send('**' + member.user.username + '** just left the Discord!')

});

bot.login(process.env.LOGIN)
