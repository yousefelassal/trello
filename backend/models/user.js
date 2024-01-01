const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    passwordHash: String,
    boards: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Board"
        }
    ]
})

schema.set("toJSON", {
    transform: (document, returnedObject) => {
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

module.exports = mongoose.model("User", schema)