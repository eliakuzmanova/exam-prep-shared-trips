const Article = require("../models/Article");

exports.getAll = () => Article.find({}).lean();

exports.getById = (id) => Article.findById(id).lean();

exports.create = (data, userId) => Article.create({...data, owner: userId}); // <---- check owner

exports.update = (data, id) => Article.findByIdAndUpdate(id, {...data});

exports.delete = (id) => Article.findByIdAndRemove(id)