const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    saved: Boolean,
    bg: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

schema.set("toJSON", {
    transform: (document, returnedObject) => {
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Board", schema)