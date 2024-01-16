const mongoose = require('mongoose');
// Ensure the Category model is processed by Mongoose
require('./category.cjs');

const itemSchema = require('./itemSchema.cjs');

module.exports = mongoose.model('Item', itemSchema);