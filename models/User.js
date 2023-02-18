const mongoose = require('mongoose');

//TODO: check requires and make configurations <-----

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    gender: {
        type: String,
        enum:{
            values: ["female", "male"],
            message: "Invalid gender"
        },
        required: [true, "Gender is required"],
    },
    trips: [{
        type: mongoose.Types.ObjectId,
        ref: "Trip"
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;