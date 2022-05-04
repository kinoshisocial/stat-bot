const { Client, Guild, GuildMemberRoleManager } = require('discord.js');
const moment = require('moment');
const client = require('..');
const tasks = require("../models/tasks")

class Kinoshi {

   static async task(guild, user, type, count, zort, active, finishDate, date, completed, miktar) {
    let id = await tasks.find({ guild });
    id = id ? id.length + 1 : 1;
    const task = await tasks.findOne({guild: guild, user: user})
    let taskMessage = await client.taskMessage(type, count)
    if(!task) {
      return await new tasks({ id: id, guild: guild, user: user, type: type, count: count, zort: zort, active: active, finishDate: finishDate, date: date, completed: completed, miktar: miktar, taskmessage: taskMessage}).save();
    }
    if(task) {
        return await new tasks({ id: id, guild: guild, user: user, type: type, count: count, zort: zort, active: active, finishDate: finishDate, date: date, completed: completed, miktar: miktar, taskmessage: taskMessage}).save();
    }
   }


};


module.exports = {Kinoshi}