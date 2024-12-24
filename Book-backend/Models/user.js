const mongoose = require("mongoose")

const user = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true,
    }
})