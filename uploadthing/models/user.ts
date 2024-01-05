import mongoose from 'mongoose';

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

export default mongoose.model("User", schema)