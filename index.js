const { Client, Collection } = require("discord.js");

const client = new Client({ 
    intents: [
          1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384,
      ]
  }); 
require('discord-modals')(client)
module.exports = client;

client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");
client.guild = "sunucu id"
client.godperm = "allah permi yaw"
client.owners = ["kurucu id"]
client.perm = async function (user, guild, type) {
    let member = client.guilds.cache.get(guild).members.cache.get(user);
    let yt = member.permissions.has(8) && client.owners.includes(user) && member.roles.cache.has(client.godperm);
    let durum;
    if(type == "god") {
        durum = yt
    }
    return durum;
  };

require("./handler")(client);
require("./taskfunction/task")(client)



client.login(client.config.token);
