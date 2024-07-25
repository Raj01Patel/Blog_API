
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unqiue: true,
    },
    mobileNo: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
        default: "-",
    },
    token: {
        type: String,
        required: false,
        default: "-"
    }
})
const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;
