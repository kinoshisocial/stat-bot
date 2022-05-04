const client = require("../index");
const odb = require("../models/owo")

client.on("messageCreate", async (message) => {
    let data = await odb.findOne({guild: message.guild.id});
    if(data.prefix) {
        if(message.content.toLowerCase().includes(`${data.prefix} hunt` && `${data.prefix}h`)) {
            await odb.findOneAndUpdate({ guild: message.guild.id, user: message.author.id }, { $inc: { hunt: 1, huntdaily: 1 } }, { upsert: true });
            message.member.updateTask(message.guild.id, "hunt", 1, message.channel)
        }  else if(message.content.toLowerCase().includes(`${data.prefix} battle` && `${data.prefix} b`)) {
            message.member.updateTask(message.guild.id, "battle", 1, message.channel)
            await odb.findOneAndUpdate({ guild: message.guild.id, user: message.author.id }, { $inc: { battle: 1, battledaily: 1 } }, { upsert: true });
        } else if(message.content.toLowerCase().includes(`${data.prefix}hunt` && `${data.prefix}h`)) {
            message.member.updateTask(message.guild.id, "hunt", 1, message.channel)
            await odb.findOneAndUpdate({ guild: message.guild.id, user: message.author.id }, { $inc: { hunt: 1, huntdaily: 1 } }, { upsert: true });
        }  else if(message.content.toLowerCase().includes(`${data.prefix}battle` && `${data.prefix}b`)) {
            message.member.updateTask(message.guild.id, "battle", 1, message.channel)
            await odb.findOneAndUpdate({ guild: message.guild.id, user: message.author.id }, { $inc: { battle: 1, battledaily: 1 } }, { upsert: true });
        }
    } else if(!data.prefix) {
        if(message.content.toLowerCase().includes("owo hunt" && "owo h")) {
            message.member.updateTask(message.guild.id, "hunt", 1, message.channel)
            await odb.findOneAndUpdate({ guild: message.guild.id, user: message.author.id }, { $inc: { hunt: 1, huntdaily: 1 } }, { upsert: true });
        } else if(message.content.toLowerCase().includes("owo battle" && "owo b")) {
            message.member.updateTask(message.guild.id, "battle", 1, message.channel)
            await odb.findOneAndUpdate({ guild: message.guild.id, user: message.author.id }, { $inc: { battle: 1, battledaily: 1 } }, { upsert: true });
        } else if(message.content.toLowerCase().includes("owohunt" && "owoh")) {
            message.member.updateTask(message.guild.id, "hunt", 1, message.channel)
            await odb.findOneAndUpdate({ guild: message.guild.id, user: message.author.id }, { $inc: { hunt: 1, huntdaily: 1 } }, { upsert: true });
        } else if(message.content.toLowerCase().includes("owobattle" && "owob")) {
            message.member.updateTask(message.guild.id, "battle", 1, message.channel)
            await odb.findOneAndUpdate({ guild: message.guild.id, user: message.author.id }, { $inc: { battle: 1, battledaily: 1 } }, { upsert: true });
        }
    }

    if(data.prefix) {
        if(message.content.toLowerCase().includes(`${data.prefix} cf` && `${data.prefix}coinflip` && `${data.prefix}cf` && `${data.prefix} coinflip`)) {
            await odb.findOneAndUpdate({ guild: message.guild.id, user: message.author.id }, { $inc: { cf: 1, game: 1, gamedaily: 1 } }, { upsert: true });
        }  else if(message.content.toLowerCase().includes(`${data.prefix} s` && `${data.prefix} slot` && `${data.prefix}slot` && `${data.prefix}s`)) {
            await odb.findOneAndUpdate({ guild: message.guild.id, user: message.author.id }, { $inc: { slot: 1, game: 1, gamedaily: 1 } }, { upsert: true });
        } else if(message.content.toLowerCase().includes(`${data.prefix}bj` && `${data.prefix}blackjack` && `${data.prefix} blackjack` && `${data.prefix} bj`)) {
            await odb.findOneAndUpdate({ guild: message.guild.id, user: message.author.id }, { $inc: { bj: 1, game: 1, gamedaily: 1 } }, { upsert: true });
        } 
    }

    if(message.content.toLowerCase().includes("owo")) {
        message.member.updateTask(message.guild.id, "owo", 1, message.channel)
        await odb.findOneAndUpdate({ guild: message.guild.id, user: message.author.id }, { $inc: { owo: 1, owodaily: 1 } }, { upsert: true });
    }
    
    
});
