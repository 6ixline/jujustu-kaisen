const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    order:{
        type: Number,
        default: 1
    }
},{
    timestamps:true
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category