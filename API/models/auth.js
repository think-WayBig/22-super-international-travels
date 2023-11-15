const mongoose = require("mongoose");

const auth = new mongoose.Schema({
    Mail: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
});

const Auth = mongoose.model("Auth", auth);
module.exports = Auth;