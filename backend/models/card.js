const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    title: String,
    description: String,
})

schema.set("toJSON", {
    transform: (document, returnedObject) => {
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Card", schema)