const mongoose = require("mongoose")

const owoinformation = mongoose.Schema({
    guild: { type: String, default: "" },
    user: { type: String, default: "" },

    coin: { type: Number, default: 0 },
    dailyStat: { type: Number, default: 0 },

    owo: { type: Number, default: 0 },
    owodaily: { type: Number, default: 0 },

    hunt: { type: Number, default: 0 },
    huntdaily: { type: Number, default: 0 },
    
    battle: { type: Number, default: 0 },
    battledaily: { type: Number, default: 0 },
    
    prefix: { type: Array, default: [] },

    game: { type: Number, default: 0 },
    gamedaily: { type: Number, default: 0 },

    cf: { type: Number, default: 0 },
    bj: { type: Number, default: 0 },
    slot: { type: Number, default: 0 },
})

module.exports = mongoose.model("owoinformation", owoinformation)