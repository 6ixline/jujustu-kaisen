const Category = require("../models/category");
const Manga = require("../models/manga");

async function getAllManga(){
    let data = [];
    const categories = await Category.find({status: 'active'}).sort({ order: -1 });
    for (const element of categories) {
       let mangaData = await Manga.find({ category: element._id, 'status': 'active' }).sort({order: 1})
       data.push({ "title": element.title, "manga": mangaData })   
    }
    return data;
}

module.exports = getAllManga;