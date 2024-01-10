const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    url: String,
    name: String,
    uploaded_at: { type: Date, default: Date.now }
})

schema.set("toJSON", {
    transform: (document, returnedObject) => {
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Attachment", schema)