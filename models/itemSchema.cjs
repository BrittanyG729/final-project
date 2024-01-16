const item = require('./item.cjs');

const Schema = require('mongoose').Schema;

const itemSchema = new Schema({
  name: { type: String, required: true },
  plot: String,
  genre: String,
  img: String
}, {
  timestamps: true
});

module.exports = itemSchema;