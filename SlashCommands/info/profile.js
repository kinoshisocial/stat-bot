const { Client, CommandInteraction,MessageSelectMenu, MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const { Message } = require("discord.js/src/structures/Message");
const odb = require("../../models/owo")
const moment = require("moment")
moment.locale("tr")

module.exports = {
    name: "profil",
    description: 'kullanıcının profilini gösterir',
    options: [
        {
            name: 'kullanıcı',
            description: 'bilgilerine bakmak istediğiniz kullanıcı (zorunlu değil)',
            type: 'USER',
        },
    ],
    run: async (client, interaction) => {
        await interaction.deferReply()
        let user = interaction.options.getUser("kullanıcı")
        if (!user) user = interaction.user
        let uye = interaction.guild.members.cache.get(user.id);
        
        let nick;
        if (user.username !== uye.displayName) nick = uye.displayName

        const owobilgileri = new MessageButton()
        .setCustomId('owobilgileri')
        .setLabel("Owo Bilgileri")
        .setStyle('PRIMARY')
        .setEmoji('842513464136433686');

        const oatm = new MessageSelectMenu()
            .setCustomId('select')
            .setPlaceholder("Database bilgileri (Hunt, Battle, Owo, Blackjack, Coinflip, Slot, Coin)")
            .addOptions([
                {
                    label:  "Hunt",
                    description: "Kullanıcının Hunt bilgilerini gösterir",
                    value:  'hunt',
                    emoji: "939211537611096155"
                },
                {
                    label:  "Battle",
                    description: "Kullanıcının Battle bilgilerini gösterir",
                    value:  'battle',
                    emoji: "⚔️"
                },
                {
                    label: "Owo",
                    description:  "Kullanıcısının Owo bilgilerini gösterir",
                    value:  'owo',
                    emoji: '842513464136433686'
                },
                {
                    label:  "Blackjack",
                    description: "Kullanıcının Blackjack bilgilerini gösterir",
                    value:  'bj'
                },
                {
                    label:  "Coinflip",
                    description: "Kullanıcının Coinflip bilgilerini gösterir",
                    value:  'cf',
                    emoji: "834110675718111242"
                },
                {
                    label:  "Slot",
                    description: "Kullanıcının Slot bilgilerini gösterir",
                    value:  'slot',
                    emoji: "944254609625587712"
                },
                {
                    label:  "Coin",
                    description: "Kullanıcının Coin bilgilerini gösterir",
                    value:  'coin',
                    emoji: "958453129060425768"
                }
            ])

        const row = new MessageActionRow()
            .addComponents(owobilgileri);
        const row2 = new MessageActionRow()
            .addComponents(oatm)

        let embed = new MessageEmbed()
        .setAuthor({ name: `${user.username} Kullanıcı Bilgisi`, iconURL: uye.avatarURL() })
        .addField(`__**Kullanıcı Bilgisi**__`, `\`ID:\` ${user.id}\n\`Profil:\` ${user} - \`(${user.tag})\`\n\`Oluşturulma T:\` <t:${moment(user.createdAt).unix()}:d> (<t:${moment(user.createdAt).unix()}:R>)`, true)
        .addField(`__**Sunucu Bilgisi**__`, `\`Takma adı:\` ${nick ? nick : `${uye.user.username} [Yok]`}\n\`Katılım Sırası:\` ${(interaction.guild.members.cache.filter(a => a.joinedTimestamp <= uye.joinedTimestamp).size).toLocaleString()}/${(interaction.guild.memberCount).toLocaleString()}\n\`Katılma T:\` <t:${moment(uye.joinedAt).unix()}:d> (<t:${moment(uye.joinedAt).unix()}:R>)`, true)
        .setColor("RANDOM")
        interaction.reply({ embeds: [embed], components: [row2, row] });

        const filter = i => i.user.id === interaction.member.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async b => {
            if (b.isButton()) { 
              if(b.customId == "owobilgileri") {
                let data = await odb.findOne({ guild: interaction.guild.id, user: uye.id});
                if(data) {
                    let embed = new MessageEmbed()
                        .setAuthor({ name: `${uye.username} Kullanıcısının tüm bilgileri`, iconURL: uye.avatarURL() })
                        .setDescription(`\` ••❯ \` Toplam **${data.owo} owo** yazma\n\` ••❯ \` Toplam **${data.hunt} hunt** yazma\n\` ••❯ \` Toplam **${data.battle} battle** yazma\n\n\` ••❯ \` Coin sayısı: **${data.coin}**\n\` ••❯ \` Günlük coin: **${data.dailyStat}**\n\n\` ••❯ \` Günlük owo yazma **${data.owodaily}**\n\` ••❯ \` Günlük hunt yazma: **${data.huntdaily}**\n\` ••❯ \` Günlük battle yazma: **${data.battledaily}**\n\n\` ••❯ \` Toplam oyun oynama: **${data.game}**\n\` ••❯ \` Günlük oyun oynama: **${data.gamedaily}**\n\n\` ••❯ \` Coinflip oynama: **${data.cf}**\n\` ••❯ \` Blackjack oynama: **${data.bj}**\n\` ••❯ \` Slot oynama: **${data.slot}**`)
                        .setColor("RANDOM")
                   b.reply({ embeds: [embed], ephemeral: true });
                } else {
                    let dbyok = new MessageEmbed()
                    .setAuthor({ name: `${uye.username} Kullanıcısının tüm bilgileri`, iconURL: uye.avatarURL() })
                    .setDescription(`\` ••❯ \` Toplam **0 owo** yazma\n\` ••❯ \` Toplam **0 hunt** yazma\n\` ••❯ \` Toplam **0 battle** yazma\n\n\` ••❯ \` Coin sayısı: **0**\n\` ••❯ \` Günlük coin: **0**\n\n\` ••❯ \` Günlük owo yazma **0**\n\` ••❯ \` Günlük hunt yazma: **0**\n\` ••❯ \` Günlük battle yazma: **0**\n\n\` ••❯ \` Toplam oyun oynama: **0**\n\` ••❯ \` Günlük oyun oynama: **0**\n\n\` ••❯ \` Coinflip oynama: **0**\n\` ••❯ \` Blackjack oynama: **0**\n\` ••❯ \` Slot oynama: **0**`)
                    .setColor("RANDOM")
               b.reply({ embeds: [dbyok], ephemeral: true });
                }
              }
            } 

            if(b.isSelectMenu()) {
                if(b.customId === "select") {

                    let arr = ['hunt', 'battle', 'owo', 'bj', 'cf', 'cf', 'slot', 'coin'];
                    let arrname = {
                        hunt:  "hunt",
                        battle:  "battle",
                        owo:  "owo",
                        bj:  "blackjack",
                        cf:  "coinflip",
                        slot:  "slot",
                        coin:  "coin"
                    }
                    if(arr.includes(b.values.toString())) {
                            let data = await odb.findOne({ guild: interaction.guild.id, user: uye.id});
                        if(data) {
                            await b.reply({ content: `\` ••❯ \` Toplam ${arrname[b.values.toString()]}: **${data[b.values.toString()]}**`, ephemeral: true });
                        } else {
                            await b.reply({content: "Veri tabanında kayıt bulunamadı", ephemeral: true});
                        }
                        }


                }
            }
          });

    
    },
};