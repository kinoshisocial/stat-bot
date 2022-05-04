const client = require("../index");
const odb = require("../models/owo")

client.on("messageCreate", async (message) => {
    if(message.author.bot) return
    await odb.findOneAndUpdate({ guild: message.guild.id, user: message.author.id }, { $inc: { coin: 1, dailyStat: 1 } }, { upsert: true });
});
