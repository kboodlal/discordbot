// Initialize dotenv
require('dotenv').config();

// Discord.js versions ^13.0 require us to explicitly define client intents
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates
    ]
  })

client.login("MTIwOTYzMzg5NjA5OTIxNzQ4OQ.GPb2tc.ONfiKYffjXLs7JGkHO_piuQvIRzq97q7mYGYPo");
// Log In our bot
client.on('ready', () => {
    // Get the channel from its ID
    const logChannel = client.channels.cache.get('1202750062984306720')
    // Send the message
    logChannel.send('The bot is up!')
    
  })

client.on('messageCreate', msg => {
    // You can view the msg object here with console.log(msg)
    if(msg.content.startsWith("v!")){
        const args = msg.content.slice(2).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        if(command ==='hello'){
           msg.channel.send("Hello");
        }
        if(command === 'move'){
            //const mem = msg.mentions.members.first();
            
            const logChannel = client.channels.cache.get('1203414986349609070');
           // const members = logChannel.members.
            const members = logChannel.members;
            members.forEach(element => {
                if(element.user.username === args.at(0)){
                    const vc = args.slice(1).join(" ");
                    msg.reply(`ID is ${element.id}`);
                    msg.reply(`User is ${element.user}`);
                    msg.reply(`nickname is ${element.nickname}`);
                    msg.reply(`name is ${element.user.username}`);
                    move(element, vc);
                }
            });
            
        }
        if(command === 'addrole'){
            const mem = msg.mentions.members.first();
            
            const rolName = args.slice(1).join(" ");
            let myRole = msg.guild.roles.cache.find(role => role.name === rolName);
            addRole(mem, myRole);
        }
        if(command === 'remrole'){
            const mem = msg.mentions.members.first();
            const rolName = args.slice(1).join(" ");
            let myRole = msg.guild.roles.cache.find(role => role.name === rolName);
            delRole(mem, myRole);
        }
        if(command === 'renameroom'){
            console.log("Rename Room Requested")
            const roomName = args.join(" ");
            const roomID = client.channels.cache.find(channel => channel.name === roomName);
            const newName = "Test New Name";
            roomID.setName(newName);
            console.log("Renamed Room")
        }
        if(command === 'serverinvite'){
            replyWithInvite(msg)
        }
        if(command === 'guestinvite'){
            console.log("Guest Invite Requested")
            const roomName = args.join(" ");
            const roomID = client.channels.cache.find(channel => channel.name === roomName);
            console.log(roomID.name);
            msg.reply(`discord.gg/${roomID.fetchInvites({
                maxAge: 10 * 60 * 1000,
                maxUses: 10,
              }).code}`)
            msg.reply(`discord.gg/${roomInvite(roomID)}`);
            console.log("Guest Invite Produced");
        }
    }
    
});

function serverInvite(){
    console.log("Server Invite Requested");
    const invite = client.createInvite({
        maxAge: 10 * 60 * 1000,
        maxUses: 10,
      });
    console.log("Server Invite Produced");
    return invite;
}

async function replyWithInvite(channel) {
    let invite = await channel.createInvite(
    {
      maxAge: 10 * 60 * 1000, // maximum time for the invite, in milliseconds
      maxUses: 100 // maximum times it can be used
    },
    `Requested with command by ${message.author.tag}`
  )
  .catch(console.log);
  message.reply(invite ? `Here's your invite: ${invite}` : "There has been an error during the creation of the invite.");
}

async function replyWithInvite(message) {
    let invite = await message.channel.createInvite(
    {
      maxAge: 10 * 60 * 1000, // maximum time for the invite, in milliseconds
      maxUses: 100 // maximum times it can be used
    },
    `Requested with command by ${message.author.tag}`
  )
  .catch(console.log);
  message.reply(invite ? `Here's your invite: ${invite}` : "There has been an error during the creation of the invite.");
}

function roomInvite(roomID){
    console.log(roomID);
    console.log("Room Invite Requested");
    const invite = roomID.createInvite({
        maxAge: 10 * 60 * 1000,
        maxUses: 10,
      });
    console.log("Room Invite Produced");
    return invite;
}

function addRole(mem, myRole){
    console.log("Add Role Requested");
    mem.roles.add(myRole.id, "Request");
    console.log("Role Added");
}

function delRole(mem, myRole){
    console.log("Del Role Requested");
    mem.roles.remove(myRole.id, "Request");
    console.log("Role Removed");
}

function renameRoom(roomID, newName){
    console.log("Rename Room Requested")
    roomID.setName(newName);
    console.log("Renamed Room")
}

function move(mem, vc){
    console.log("Move Requested");
    mem.voice.setChannel(client.channels.cache.find(channel => channel.name === vc).id, "Request");
    console.log("Moved");
}

