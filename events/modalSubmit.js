const client = require("../index");
const odb = require("../models/owo")
const tasks = require("../models/tasks")
const ms = require("ms")
const { MessageEmbed } = require("discord.js")
const moment = require("moment")
moment.locale("tr")
const { Kinoshi } = require("../function/Kinoshi")

client.on("modalSubmit", async (modal) => {
    let data = await odb.findOne({guild: modal.guild.id, user: modal.user.id});
    await modal.deferReply({ ephemeral: true })
    const send = async (log, options) => modal.guild.channels.cache.get(log).send(options);
    const user = client.users.cache.get(modal.user.id)
    if(modal.customId === 'task') {
        let arr = [
            "hunt",
            "battle",
            "owo",
            "slot",
            "cf",
            "bj"
        ]
        if(isNaN(modal.getTextInputValue("count")) || !Number(modal.getTextInputValue("count"))) return await modal.followUp({ content: `Miktar geçersiz olduğu için görev alınamadı \`${modal.getTextInputValue("count")}\``, ephemeral: true });
        if(isNaN(ms(modal.getTextInputValue("finishDate")) || !Number(ms(modal.getTextInputValue("finishDate")))) || !ms(modal.getTextInputValue("finishDate"))) return await modal.followUp({ content: `Süre geçersiz olduğu için görev alınamadı \`${modal.getTextInputValue("finishDate")}\``, ephemeral: true });

        if(arr.includes(modal.getTextInputValue("type").toLowerCase())) {

            let task = await tasks.find({guild: modal.guild.id, user: modal.user.id}) || 0
            let activetask = await tasks.find({guild: modal.guild.id, user: modal.user.id, active: true}) || 0
            let endtask = await tasks.find({guild: modal.guild.id, user: modal.user.id, completed: true}) || 0
            let database = await Kinoshi.task(modal.guild.id, modal.user.id, modal.getTextInputValue("type").toLowerCase(), modal.getTextInputValue("count"), parseInt(modal.getTextInputValue("count") / 2), true, parseInt(Date.now() + ms(modal.getTextInputValue("finishDate"))), Date.now(), false, 0, client.taskMessage(modal.getTextInputValue("type"), modal.getTextInputValue("count")))


            const embed = new MessageEmbed()
            .setAuthor({ name: user.tag, iconURL: user.avatarURL() })
            .setColor("DARK")
            .setDescription(`${modal.getTextInputValue("type").toUpperCase()} Türünde bir görev başlatıldı!`)
            .addField(`__**Görev Bilgileri**__`,`\`ID:\` ${database.id || "Bulunamadı."}\n\`Görev Türü:\` ${modal.getTextInputValue("type")}\n\`Miktar:\` ${modal.getTextInputValue("count")}\n\`Görev Bitiş Tarihi:\` <t:${moment(Date.now() + ms(modal.getTextInputValue("finishDate"))).unix()}:d>\n(<t:${moment(Date.now() + ms(modal.getTextInputValue("finishDate"))).unix()}:R>)\n\`Görev Başlangıç Tarihi:\` <t:${moment(Date.now()).unix()}:d>\n(<t:${moment(Date.now()).unix()}:R>)`, true)
            .addField(`__**Kullanıcı Bilgileri**__`, `\`Aldığı görev sayısı:\` ${task.length || 0}\n\`Aktif görev sayısı:\` ${activetask.length || 0}\n\`Bitirmiş görev sayısı:\` ${endtask.length || 0} `, true)

            send("kanal id yaw", {embeds: [embed]})

            await modal.followUp({ content: `${modal.getTextInputValue("type")} Görevi başarıyla alındı /görevlerim yazarak görevlere bakabilirsin`, ephemeral: true });





        } else {
            return await modal.followUp({ content: `Görev türü geçersiz olduğu için görev alınamadı \`${modal.getTextInputValue("type")}\``, ephemeral: true });
        }
    }
});
