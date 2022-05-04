const mongoose = require("mongoose")

const tasks = mongoose.Schema({
    guild: { type: String, default: "" },
    user: { type: String, default: "" },
    
	id: { type: Number, default: 0 },
	type: { type: String, default: "" },
	count: { type: Number, default: 0 },
	zort: { type: Number, default: 0 },
	active: { type: Boolean, default: true },
	finishDate: { type: Number, default: 0 },
	date: { type: Number, default: 0 },
	completed: { type: Boolean, default: false },
	miktar: { type: Number, default: 0 },
	taskmessage: { type: String, default: "" }

})

module.exports = mongoose.model("tasks", tasks)