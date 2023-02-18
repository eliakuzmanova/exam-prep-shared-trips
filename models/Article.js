const mongoose = require('mongoose')

const articleSchmema = new mongoose.Schema({});

const Article = mongoose.model('Article', articleSchmema);

module.exports = Article;