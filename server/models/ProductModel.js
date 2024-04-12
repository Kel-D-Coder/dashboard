const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: [true, "Product name already exist"]
    },

    price: {
        type: Number,
        required: true
    },

    ingredients: {
        type: String,
    },

    desc: {
        type: String,
        required: true
    },

    picture: {
        type: String,
        required: true
    },

    stats: {
        type: String,
        default: 'avaliable'
    }
});

module.exports = mongoose.model("products", ProductSchema);