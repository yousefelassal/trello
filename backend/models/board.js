const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    saved: Boolean,
    bg: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    lists: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "List"
        }
    ],
    listsOrder: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "List"
        }
    ],
})

schema.set("toJSON", {
    transform: (document, returnedObject) => {
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Board", schema)