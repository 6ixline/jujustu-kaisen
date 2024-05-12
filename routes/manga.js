const express = require('express');
const getAllManga = require('../services/getAllManga');
const myCache = require("../utils/cache");
const router = new express.Router();

// Get All Manga data
router.get("/mangadata", async (req, res) => {
   try {
      let mangaData = myCache.get("allmanga");
      if(mangaData == undefined){
         getAllManga().then(data =>{
            myCache.set("allmanga", data);
            res.status(200).send(data);
         });
      }else{
         res.status(200).send(mangaData);
      }

   } catch (e) {
      res.status(400).send(e);
   }
})


module.exports = router;