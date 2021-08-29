const mongoose = require('mongoose');
mongoose.plugin(require('meanie-mongoose-to-json'));
const Schema = mongoose.Schema;

const productSchema = new Schema({
    url: { type: String, required: true },
    data: { type: String, required: true },
}, {
  timestamps: true,
});

const Product = mongoose.model('Products', productSchema);

module.exports = Product;