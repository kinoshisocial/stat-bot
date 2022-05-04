const { Client, CommandInteraction,MessageSelectMenu, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require("discord.js");
const tasks = require("../../models/tasks")
const moment = require("moment")
moment.locale("tr")
const { Modal, TextInputComponent, showModal } = require('discord-modals')

module.exports = {
    name: "görev",
    description: 'Görev almanıza yardımcı olur',

    run: async (client, interaction) => {

        const modal = new Modal()
        .setCustomId('task')
        .setTitle('Görev')
        .addComponents(
          new TextInputComponent()
          .setCustomId('type')
          .setLabel('Görev türü (owo hunt battle bj coinflip slot)')
          .setStyle('SHORT')
          .setMinLength(1)
          .setMaxLength(32)
          .setPlaceholder('Görev türünü giriniz')
          .setRequired(true),
          new TextInputComponent()
          .setCustomId('count')
          .setLabel('Miktar (Örn: 1, 2, 3)')
          .setStyle('SHORT')
          .setMinLength(1)
          .setMaxLength(4000)
          .setPlaceholder('Buraya giriniz.')
          .setRequired(true),
          new TextInputComponent()
          .setCustomId('finishDate')
          .setLabel('Süre (Örn: 1d, 2h, 3m, 4s)')
          .setStyle('SHORT')
          .setMinLength(1)
          .setMaxLength(4000)
          .setPlaceholder('Buraya giriniz.')
          .setRequired(true),
        );
        showModal(modal, { client, interaction });

    },
};