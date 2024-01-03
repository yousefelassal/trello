const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    title: String,
    description: String,
    position: Number
})

schema.set("toJSON", {
    transform: (document, returnedObject) => {
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Card", schema)