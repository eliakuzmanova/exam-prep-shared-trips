const mongoose = require('mongoose')

const tripSchmema = new mongoose.Schema({});

const Trip = mongoose.model('Trip', tripSchmema);

module.exports = Trip;