const { Client, Guild, GuildMember, MessageEmbed } = require('discord.js');
const moment = require('moment');
const tasks = require("../models/tasks")
const odb = require("../models/owo")

module.exports = async function (client) {


    GuildMember.prototype.updateTask = async function (guild, type, data, channel = null) {
          const task = await tasks.find({ guild, user: this.user.id, type, active: true });
          const gorevinfodatabase = await tasks.find({guild, user: this.user.id})
          if(!task) return;
          task.forEach(async (x) => {
              if (channel && x.channels && x.channels.some((x) => x !== channel.id)) return;
              x.miktar += data;
              if (x.miktar >= x.count) {
                  x.active = false;
                  x.completed = true;
                  await odb.findOneAndUpdate({ guild: guild, user: this.user.id }, { $inc: { coin: x.zort } }, { upsert: true });
channel.send({content: `
Tebrikler ${this.user.username}, ${x.taskmessage} görevini tamamladın bu görevle ${x.zort} coin kazandın! \`(${gorevinfodatabase.filter((x) => x.completed).length + 1}/${gorevinfodatabase.length})\`
`});
              }
              await x.save();
          });
      };

      client.taskMessage = async (type, count) => {
          let message;
          let tasks = [ "hunt", "battle", "owo", "slot", "cf", "bj" ]
          if(tasks.includes(type)) {
              message = `**${count} kere ${type} yaz!**`
          }
          return message
      }
  
  
  }