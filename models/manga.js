const mongoose = require("mongoose");

const mangaSchema = new mongoose.Schema({
    keyid:{
        type: Number,
        validate(value){
            if(value < 0){
                throw new Error('ID value should be more than 0')
            }
        }
    },
    storageKey:{
        type: String,
        required: true,
        trim: true
    },
    title:{
        type: String,
        required: true,
        trim: true
    },
    chapterTitle:{
        type: String,
        required: true,
        trim: true
    },
    comicTitle:{
        type: String,
        required: true,
        trim: true
    },
    url1:{
        type: String,
        trim: true
    },
    url2:{
        type: String,
        trim: true
    },
    coverImage:{
        type: String,
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    }

}, {
    timestamps: true
})

const Manga = mongoose.model("Manga", mangaSchema);

module.exports = Manga;

