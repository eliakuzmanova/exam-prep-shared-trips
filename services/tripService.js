const Trip = require("../models/Trip");

exports.getAll = () => Trip.find({}).lean();

exports.getById = (id) => Trip.findById(id).lean();

exports.create = (data, userId) => Trip.create({...data, creator: userId}); // <---- check owner

exports.update = (data, id) => Trip.findByIdAndUpdate(id, {...data});

exports.delete = (id) => Trip.findByIdAndRemove(id)

exports.getByIdAndPop = (id) => Trip.findById(id).populate("creator").populate("buddies").lean();
 
exports.getTripsForProfile = (id) => Trip.find({creator: id}).populate("creator").lean();