const { Client, CommandInteraction,MessageEmbed } = require("discord.js");
const { Message } = require("discord.js/src/structures/Message");
const odb = require("../../models/owo")

module.exports = {
    name: "owo",
    description: 'seçilen işleme göre owo hakkında işlem yapar',
    options: [

        {
            name: 'info',
            description: 'owo da kayıtlı bilgilerinizi gösterir hunt/battle/owo',
            type: 'STRING',
        },
        {
            name: 'kullanıcı',
            description: 'bilgilerine bakmak istediğiniz kullanıcı (zorunlu değil)',
            type: 'USER',
        },
    ],
    run: async (client, interaction) => {
        await interaction.deferReply()
        let info = interaction.options.getString('info');
        let user = interaction.options.getUser("kullanıcı")
        if(!info) {
            if(user) {
                        let data = await odb.findOne({ guild: interaction.guild.id, user: user.id});
                    if(data) {
                        let embed = new MessageEmbed()
                            .setAuthor({ name: `${user.username} Kullanıcısının tüm bilgileri`, iconURL: user.avatarURL() })
                            .setDescription(`\` ••❯ \` Toplam **${data.owo} owo** yazma\n\` ••❯ \` Toplam **${data.hunt} hunt** yazma\n\` ••❯ \` Toplam **${data.battle} battle** yazma\n\n\` ••❯ \` Coin sayısı: **${data.coin}**\n\` ••❯ \` Günlük coin: **${data.dailyStat}**\n\n\` ••❯ \` Günlük owo yazma **${data.owodaily}**\n\` ••❯ \` Günlük hunt yazma: **${data.huntdaily}**\n\` ••❯ \` Günlük battle yazma: **${data.battledaily}**\n\n\` ••❯ \` Toplam oyun oynama: **${data.game}**\n\` ••❯ \` Günlük oyun oynama: **${data.gamedaily}**\n\n\` ••❯ \` Coinflip oynama: **${data.cf}**\n\` ••❯ \` Blackjack oynama: **${data.bj}**\n\` ••❯ \` Slot oynama: **${data.slot}**`)
                            .setColor("RANDOM")
                            .setFooter({ text: `${interaction.user.tag}` })
                        interaction.reply({ embeds: [embed] });
                    } else {
                        interaction.reply({content: "Veri tabanında kayıt bulunamadı"});
                    }
            } else {
                let data = await odb.findOne({ guild: interaction.guild.id, user: interaction.user.id});
                if(data) {
                    let embed = new MessageEmbed()
                        .setAuthor({ name: `${interaction.user.username} Kullanıcısının tüm bilgileri`, iconURL: interaction.user.avatarURL() })
                        .setDescription(`\` ••❯ \` Toplam **${data.owo} owo** yazma\n\` ••❯ \` Toplam **${data.hunt} hunt** yazma\n\` ••❯ \` Toplam **${data.battle} battle** yazma\n\n\` ••❯ \` Coin sayısı: **${data.coin}**\n\` ••❯ \` Günlük coin: **${data.dailyStat}**\n\n\` ••❯ \` Günlük owo yazma **${data.owodaily}**\n\` ••❯ \` Günlük hunt yazma: **${data.huntdaily}**\n\` ••❯ \` Günlük battle yazma: **${data.battledaily}**\n\n\` ••❯ \` Toplam oyun oynama: **${data.game}**\n\` ••❯ \` Günlük oyun oynama: **${data.gamedaily}**\n\n\` ••❯ \` Coinflip oynama: **${data.cf}**\n\` ••❯ \` Blackjack oynama: **${data.bj}**\n\` ••❯ \` Slot oynama: **${data.slot}**`)
                        .setColor(interaction.user.displayHesColor || "RANDOM")
                        .setFooter({ text: `${interaction.user.tag}` })
                    interaction.reply({ embeds: [embed] });
                } else {
                    interaction.reply({content: "Veri tabanında kayıt bulunamadı"});
                }
            }
        } else {
            if(user) {
                let arr = ['hunt', 'battle', 'owo'];
                if(arr.includes(info)) {
                    if(!user) {
                        let data = await odb.findOne({ guild: interaction.guild.id, user: user.id});
                    if(data) {
                        let embed = new MessageEmbed()
                            .setAuthor({ name: `${info[0].toUpperCase() + info.substring(1) + user.tag}`, iconURL: user.avatarURL() })
                            .setDescription(`\` ••❯ \` Toplam **${info}** yazma: **${data[info]}**`)
                            .setColor("RANDOM")
                            .setFooter({ text: `${interaction.user.tag}` })
                        interaction.reply({ embeds: [embed] });
                    } else {
                        interaction.reply({content: "Veri tabanında kayıt bulunamadı"});
                    }
                    } else {
                        let data = await odb.findOne({ guild: interaction.guild.id, user: user.id});
                    if(data) {
                        let embed = new MessageEmbed()
                            .setAuthor({ name: `${info[0].toUpperCase() + info.substring(1) + "‏‏‏‏‏‏‏‏ " + user.tag}`, iconURL: user.avatarURL() })
                            .setDescription(`\` ••❯ \` Toplam **${info}** yazma: **${data[info]}**`)
                            .setColor("RANDOM")
                            .setFooter({ text: `${interaction.user.tag}` })
                        interaction.reply({ embeds: [embed] });
                    } else {
                        interaction.reply({content: "Veri tabanında kayıt bulunamadı"});
                    }
                    }
        
                } else {
                    interaction.reply({content: "Böyle bir seçenek bulunmadı"})
                }
            } else {
                let arr = ['hunt', 'battle', 'owo'];
                if(arr.includes(info)) {
                    if(!user) {
                        let data = await odb.findOne({ guild: interaction.guild.id, user: interaction.user.id});
                    if(data) {
                        let embed = new MessageEmbed()
                            .setAuthor({ name: `${info[0].toUpperCase() + info.substring(1) + "‏‏‏‏‏‏‏‏ " + interaction.user.tag}`, iconURL: interaction.user.avatarURL() })
                            .setDescription(`\` ••❯ \` Toplam **${info}** yazma: **${data[info]}**\n\n\` ••❯ \` Coin sayısı: **${data.coin}**`)
                            .setColor(interaction.user.displayHesColor || "RANDOM")
                            .setFooter({ text: `${interaction.user.tag}` })
                        interaction.reply({ embeds: [embed] });
                    } else {
                        interaction.reply({content: "Veri tabanında kayıt bulunamadı"});
                    }
                    } else {
                        let data = await odb.findOne({ guild: interaction.guild.id, user: interaction.user.id});
                    if(data) {
                        let embed = new MessageEmbed()
                            .setAuthor({ name: `${info[0].toUpperCase() + info.substring(1)}`, iconURL: interaction.user.id.avatarURL() })
                            .setDescription(`\` ••❯ \` Toplam **${info}** yazma: **${data[info]}**\n\n\` ••❯ \` Coin sayısı: **${data.coin}**`)
                            .setColor(interaction.user.displayHesColor || "RANDOM")
                            .setFooter({ text: `${interaction.user.tag}` })
                        interaction.reply({ embeds: [embed] });
                    } else {
                        interaction.reply({content: "Veri tabanında kayıt bulunamadı"});
                    }
                    }
        
                } else {
                    interaction.reply({content: "Böyle bir seçenek bulunmadı"})
                }
            }
        }



    },
};