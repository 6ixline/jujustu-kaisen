const express = require('express');
const chapertlist = require("../utils/chapters");
const chapterdetails = require("../utils/chapterdetails");
const NodeCache = require( "node-cache" );
const Category = require("../models/category");
const Manga = require("../models/manga");
const myCache = new NodeCache();
const router = new express.Router();

// Get All Manga data
router.get("/mangadata", async (req, res) => {
   try {
      let mangaData = myCache.get("allmanga");
      if(mangaData == undefined){
         let data = [];
         const categories = await Category.find({status: 'active'}).sort({ order: -1 });
         for (const element of categories) {
            let mangaData = await Manga.find({ category: element._id, 'status': 'active' }).sort({order: 1})
            data.push({ "title": element.title, "manga": mangaData })   
         }
         mangaData = data;
         myCache.set("allmanga", data, 86400);
      }
      res.status(200).send(mangaData);

   } catch (e) {
      res.status(400).send(e);
   }
})


module.exports = router;