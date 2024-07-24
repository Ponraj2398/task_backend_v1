var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, default: 0.0 },
    description: { type: String, required: true },
    image: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);