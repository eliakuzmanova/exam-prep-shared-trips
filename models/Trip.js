const mongoose = require('mongoose')

const tripSchmema = new mongoose.Schema({

    start: {
        type: String,
        required: [true, "Start point is required"],
        minLength: [4, "Start point is too short"]
    },
    end: {
        type: String,
        required: [true, "End point is required"],
        minLength: [4, "End point is too short"]
    },
    date: {
        type: String,
        required: [true, "Date is required"],
    },
    time: {
        type: String,
        required: [true, "Time is required"],
    },
    image: {
        type: String,
        required: [true, "Image is required"],
        validate: {
            validator: function(value) {
                return value.startsWith("http://") || value.startsWith("https://")
            },
            message: "URL is invalid"
        }
    },
    brand: {
        type: String,
        required: [true, "Brand is required"],
        minLength: [4, "Brand is too short"]
    },
    seats: {
        type: Number,
        required: true,
        enum: {
            values: [1, 2, 3, 4],
            message: "Seats is invalid"
        }
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [1, "Invalid price"],
        max: [50, "Invalid price"]
    },
    description:  {
        type: String,
        required: [true, "Description is required"],
        minLength: [10, "Too short description"],
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    buddies: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }]
});

const Trip = mongoose.model('Trip', tripSchmema);

module.exports = Trip;