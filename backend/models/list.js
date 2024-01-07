const mongoose = require("mongoose")
const Card = require("./card")

const schema = new mongoose.Schema({
    title: String,
    cards: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Card"
        }
    ]
})

schema.set("toJSON", {
    transform: (document, returnedObject) => {
        delete returnedObject.__v
    }
})

schema.pre("findOneAndDelete", async function (next) {
    const list = this
    await Card.deleteMany({ _id: { $in: list.cards } })
    next()
})

schema.pre("deleteMany", async function (next) {
    const list = this
    await Card.deleteMany({ _id: { $in: list.cards } })
    next()
})

module.exports = mongoose.model("List", schema)