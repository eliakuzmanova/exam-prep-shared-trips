const Trip = require("../models/Trip");

exports.getAll = () => Trip.find({}).lean();

exports.getById = (id) => Trip.findById(id).lean();

exports.create = (data, userId) => Trip.create({...data, owner: userId}); // <---- check owner

exports.update = (data, id) => Trip.findByIdAndUpdate(id, {...data});

exports.delete = (id) => Trip.findByIdAndRemove(id)