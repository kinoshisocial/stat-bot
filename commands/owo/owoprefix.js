const { Message, Client, CommandInteractionOptionResolver } = require("discord.js");
const odb = require("../../models/owo")

module.exports = {
    name: "prefix",
    aliases: ['owoprefix', "owo-prefix", "owo-pre", "owo-p", "owop", "owopre"],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if(!client.perm(message.author.id, message.guild.id, "god")) return message.channel.send(`Bu işlemi uygulayabilmen için yetkinin yüksek olması lazım`).then(m => m.delete({ timeout: 5000 }));
        let data = await odb.findOne({ guild: message.guild.id }); 
        args.map(x => x.toString()).forEach(x => {
            if (data.prefix.some(y => y === x)) return;
            data.prefix.push(x);
        });
        data.save();
        message.react(client.emojis.cache.find(res => res.name === "tic"));
    },
};
