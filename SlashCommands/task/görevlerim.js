const { Client, CommandInteraction,MessageSelectMenu, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require("discord.js");
const tasks = require("../../models/tasks")
const moment = require("moment")
moment.locale("tr")
const { Modal, TextInputComponent, showModal } = require('discord-modals')
const odb = require("../../models/owo")

module.exports = {
    name: "görevlerim",
    description: 'Aldığınız görevleri gösterir',


    run: async (client, interaction) => {
        await interaction.deferReply()
        let embed = new MessageEmbed().setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL() })

        let task = await tasks.findOne({ guild: interaction.guild.id, user: interaction.user.id })
        if(!task) return interaction.followUp({ embeds: [embed.setDescription(`Hiç bir görev bulunmadı.`)] })

                let page = 1;

                const nextbtn = new MessageButton()
                .setCustomId('next')
                .setLabel("➡️")
                .setStyle('PRIMARY')

                const backbtn = new MessageButton()
                .setCustomId('back')
                .setLabel("⬅️")
                .setStyle('PRIMARY')

                const row = new MessageActionRow()
                .addComponents(backbtn, nextbtn);

                let gorevinfodatabase = await tasks.find({ guild: interaction.guild.id, user: interaction.user.id })
                let database = await tasks.find({ guild: interaction.guild.id, user: interaction.user.id, active: true, completed: false })
                let list = database.map((x) => `\`#${x.id}\` ${x.taskmessage}\n${progressBar(x.miktar, x.count, 5)} \`${parseInt(x.miktar)} / ${parseInt(x.count)}\`\nGörevin bitiş tarihi: <t:${moment(x.finishDate).unix()}:f> (<t:${moment(x.finishDate).unix()}:R>)`, true)

                    let kinoembed = new MessageEmbed().setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.avatarURL() }).setDescription(`Toplam Görev Sayısı: \`${gorevinfodatabase.length} (${gorevinfodatabase.filter((x) => x.completed).length}/${gorevinfodatabase.length})\`\nAktif Görev Sayısı: \`${gorevinfodatabase.filter((x) => x.active).length}\`\n\n${list.slice(page == 1 ? 0 : page * 5 - 5, page * 5).join("\n─────────────────\n") || "Aktif görev bulunmamaktadır."}`)
                    if(list.length <= 6) {
                       await interaction.followUp({ embeds: [kinoembed]});
                        return
                    } else if(list.length > 6) {
                        let msg = await interaction.followUp({ embeds: [kinoembed], components: [ row ]});

                    const filter = i => i.user.id === interaction.member.id;
                    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

            
                    collector.on('collect', async b => {
                        if(b.isButton()) {
                            if(b.customId === "next") {
                                if (list.slice((page + 1) * 5 - 5, (page + 1) * 5).length <= 0) return;
                                page += 1;
                                let liste = list.slice(page == 1 ? 0 : page * 5 - 5, page * 5).join("\n─────────────────\n");
                                msg.edit({ embeds: [kinoembed.setDescription(liste)] });
                                await b.deferUpdate()
                            } else if(b.customId === "back") {
                                if (list.slice((page - 1) * 5 - 5, (page - 1) * 5).length <= 0) return;
                                page -= 1;
                                let liste = list.slice(page == 1 ? 0 : page * 5 - 5, page * 5).join("\n─────────────────\n");
                                msg.edit({ embeds: [kinoembed.setDescription(liste)] });
                                await b.deferUpdate()
                            }
                        }
                    })
                    }

                    


               
    },
};

function progressBar (value, maxValue, size) {
    const progress = Math.round(size * (value / maxValue > 1 ? 1 : value / maxValue));
    const emptyProgress = size - progress > 0 ? size - progress : 0;

    const progressText = "<a:ortabar:921729867685449768>".repeat(progress);
    const emptyProgressText = "<:empty:921729874132074497>".repeat(emptyProgress);

    return emptyProgress > 0 ? progress === 0 ? "<:emptystart:921729841504583691>" + progressText + emptyProgressText + "<:emptyend:921729866481672222>" : "<a:solbar:921729868759191583>" + progressText + emptyProgressText + "<:emptyend:921729866481672222>" : "<a:solbar:921729868759191583>" + progressText + emptyProgressText + "<a:bitisbar:921729873037377536";
};