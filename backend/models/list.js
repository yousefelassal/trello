const mongoose = require("mongoose")

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

schema.pre("remove", function(next) {
    this.model("Card").deleteMany({ list: this._id }, next)
})

module.exports = mongoose.model("List", schema)