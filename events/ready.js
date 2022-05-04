const client = require("../index");
const odb = require("../models/owo")
const CronJob = require("cron").CronJob;
const tasks = require("../models/tasks")
const { MessageEmbed } = require("discord.js");
const moment = require("moment")
moment.locale("tr")

client.on("ready", async() => {
    client.user.setPresence({ activity: { name: "Sherwood ❤️ Kinoshi", type: "WATCHING" }, status: "dnd" });
    console.log(`${client.user.tag} is up and ready to go!`)
    let data = await odb.findOne({guild: client.guild});
    if (!data) console.log('Database ready!')
    await odb.updateOne({guild: client.guild}, {upsert: true, setDefaultsOnInsert: true}).exec();
    const daily = new CronJob("00 00 00 * * *", () => {
        client.guilds.cache.forEach(async (guild) => {
          await odb.findOneAndUpdate({ guild: guild.id }, { $set: { dailyStat: 0 } });
        });
      }, null, true, "Europe/Istanbul");
      daily.start();

      const dailyowo = new CronJob("00 00 00 * * *", () => {
        client.guilds.cache.forEach(async (guild) => {
          await odb.findOneAndUpdate({ guild: guild.id }, { $set: { owodaily: 0 } });
        });
      }, null, true, "Europe/Istanbul");
      dailyowo.start();

      const dailyhunt = new CronJob("00 00 00 * * *", () => {
        client.guilds.cache.forEach(async (guild) => {
          await odb.findOneAndUpdate({ guild: guild.id }, { $set: { huntdaily: 0 } });
        });
      }, null, true, "Europe/Istanbul");
      dailyhunt.start();

      const dailybattle = new CronJob("00 00 00 * * *", () => {
        client.guilds.cache.forEach(async (guild) => {
          await odb.findOneAndUpdate({ guild: guild.id }, { $set: { battledaily: 0 } });
        });
      }, null, true, "Europe/Istanbul");
      dailybattle.start();

      const dailygame = new CronJob("00 00 00 * * *", () => {
        client.guilds.cache.forEach(async (guild) => {
          await odb.findOneAndUpdate({ guild: guild.id }, { $set: { gamedaily: 0 } });
        });
      }, null, true, "Europe/Istanbul");
      dailygame.start();

      setInterval(async () => { 
        const guild = client.guilds.cache.get(client.guild);
        if (!guild) return;
        var task = await tasks.find({ guild: guild.id, active: true, finishDate: { $lte: Date.now() } });
        if(!task) return
        task.forEach(async (x) => {
          const member = guild.members.cache.get(x.user);
          if (!member) return;
          let usertask = await tasks.find({guild: guild.id, user: member.id })

            x.active = false;
            await x.save();

            const embed = new MessageEmbed()
            .setAuthor({ name: member.user.tag, iconURL: member.user.avatarURL() })
            .setColor("DARK")
            .setDescription(`${member} \`${member.user.tag}\` görev süresi doldu!`)
            .addField(`__**Görev Bilgileri**__`,`\`ID:\` ${x.id || "Bulunamadı."}\n\`Görev Türü:\` ${x.type}\n\`Miktar:\` ${x.count}\n\`Görev Bitiş Tarihi:\` <t:${moment(x.finishDate).unix()}:d>\n\`Görev Başlangıç Tarihi:\` <t:${moment(x.date).unix()}:d>\n(<t:${moment(x.date).unix()}:R>)`, true)
            .addField(`__**Kullanıcı Bilgileri**__`, `\`Aldığı görev sayısı:\` ${usertask.length || 0}\n\`Aktif görev sayısı:\` ${usertask.filter((x) => x.active).length || 0}\n\`Bitirmiş görev sayısı:\` ${usertask.filter((x) => x.completed).length || 0} `, true)


            client.channels.cache.get("kanal id yaw").send({ embeds: [embed] })
        });
      
      }, 750);

});
