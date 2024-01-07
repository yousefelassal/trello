const mongoose = require("mongoose")
const List = require("./list")

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    saved: {
        type: Boolean,
        default: false
    },
    saved_at: {
        type: Date,
        default: null
    },
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

schema.pre("findOneAndDelete", async function (next) {
    const board = this
    await List.deleteMany({ _id: { $in: board.lists } })
    next()
})

module.exports = mongoose.model("Board", schema)