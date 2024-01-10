const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    title: String,
    description: String,
    cover: String,
    attachments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Attachment"
        }
    ],
    images: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Image"
        }
    ],
})

schema.set("toJSON", {
    transform: (document, returnedObject) => {
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Card", schema)