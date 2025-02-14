const mongoose = require('../database/connection');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: { type: String, required: true },  // Matches frontend 'title'
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true }, // Linked with category
    image: { type: String, required: true },  // Matches frontend 'image'
    rating: {
        rate: { type: Number, required: true }, 
        count: { type: Number, required: true }
    }
});

const ProductModel = mongoose.model('Product', ProductSchema);
module.exports = ProductModel;
