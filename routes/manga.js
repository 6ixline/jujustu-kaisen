const express = require('express');
const chapertlist = require("../utils/chapters");
const chapterdetails = require("../utils/chapterdetails");
const Category = require("../models/category");
const Manga = require("../models/manga");

const router = new express.Router();



router.get("/jujutsu/chapters", async (req, res) => {
   try {
      const data = await chapertlist("https://readkaisen.com/", ".maniac_posts .chap_tab tr", "a");
      res.status(200).send(data);
   } catch (e) {
      res.status(400).send(e);
   }
})
router.get("/bc/chapters", async (req, res) => {
   try {
      const data = await chapertlist("https://bcmanga.org/", ".entry-content .su-post", "a");
      res.status(200).send(data);
   } catch (e) {
      res.status(400).send(e);
   }
})
router.get("/cho/chapters", async (req, res) => {
   try {
      const data = await chapertlist("https://www.choujinx.net/", ".listing-chapters_wrap li", "div div a");
      res.status(200).send(data);
   } catch (e) {
      res.status(400).send(e);
   }
})
router.get("/demon/chapters", async (req, res) => {
   try {
      const data = await chapertlist("https://demon-slayer-chapters.com/", "#Chapters_List ul li", "a");
      res.status(200).send(data);
   } catch (e) {
      res.status(400).send(e);
   }
})
router.get("/hero/chapters", async (req, res) => {
   try {
      const data = await chapertlist("https://mangaheroacademia.online/", ".ms-homepage-container li", "a");
      res.status(200).send(data);
   } catch (e) {
      res.status(400).send(e);
   }
})
router.get("/one/chapters", async (req, res) => {
   try {
      const data = await chapertlist("https://punch.ldkmanga.com/", "#ceo_latest_comics_widget-3 ul li", "a");
      res.status(200).send(data);
   } catch (e) {
      res.status(400).send(e);
   }
})
router.get("/aoi/chapters", async (req, res) => {
   try {
      const data = await chapertlist("https://aoashi.online/", ".su-posts-list-loop li", "a");
      res.status(200).send(data);
   } catch (e) {
      res.status(400).send(e);
   }
})
router.post("/jujutsu/chapterdetails", (req, res) => {
   const chapterlink = req.body.chapterlink;
   try {
      if (chapterlink != "") {
         chapterdetails(chapterlink, ".img_container", true, false).then(function (data) {
            res.status(200).send(data);
         }).catch((e) => {
            res.status(400).send({ "error": e.originalMessage })
         })
      } else {
         res.status(404).send({ "error": "Chapter link is empty" });
      }
   } catch (e) {
      res.status(400).send(e);
   }
})
router.post("/demon/chapterdetails", (req, res) => {
   const chapterlink = req.body.chapterlink;
   try {
      if (chapterlink != "") {
         chapterdetails(chapterlink, ".separator img", false, false).then(function (data) {
            res.status(200).send(data);
         }).catch((e) => {
            res.status(400).send({ "error": e.originalMessage })
         })
      } else {
         res.status(404).send({ "error": "Chapter link is empty" });
      }
   } catch (e) {
      res.status(400).send(e);
   }
})
router.post("/hero/chapterdetails", (req, res) => {
   const chapterlink = req.body.chapterlink;
   try {
      if (chapterlink != "") {
         chapterdetails(chapterlink, ".entry-content img", false, true).then(function (data) {
            res.status(200).send(data);
         }).catch((e) => {
            res.status(400).send({ "error": e.originalMessage })
         })
      } else {
         res.status(404).send({ "error": "Chapter link is empty" });
      }
   } catch (e) {
      res.status(400).send(e);
   }
})
router.post("/one/chapterdetails", (req, res) => {
   const chapterlink = req.body.chapterlink;
   try {
      if (chapterlink != "") {
         chapterdetails(chapterlink, ".entry-content img", false, false).then(function (data) {
            res.status(200).send(data);
         }).catch((e) => {
            res.status(400).send({ "error": e.originalMessage })
         })
      } else {
         res.status(404).send({ "error": "Chapter link is empty" });
      }
   } catch (e) {
      res.status(400).send(e);
   }
})
router.post("/aoi/chapterdetails", (req, res) => {
   const chapterlink = req.body.chapterlink;
   try {
      if (chapterlink != "") {
         chapterdetails(chapterlink, ".entry-content img", false, false).then(function (data) {
            res.status(200).send(data);
         }).catch((e) => {
            res.status(400).send({ "error": e.originalMessage })
         })
      } else {
         res.status(404).send({ "error": "Chapter link is empty" });
      }
   } catch (e) {
      res.status(400).send(e);
   }
})
router.post("/cho/chapterdetails", (req, res) => {
   const chapterlink = req.body.chapterlink;
   try {
      if (chapterlink != "") {
         chapterdetails(chapterlink, ".reading-content .page-break", true, false).then(function (data) {
            res.status(200).send(data);
         }).catch((e) => {
            res.status(400).send({ "error": e.originalMessage })
         })
      } else {
         res.status(404).send({ "error": "Chapter link is empty" });
      }
   } catch (e) {
      res.status(400).send(e);
   }
})
router.post("/bc/chapterdetails", (req, res) => {
   const chapterlink = req.body.chapterlink;
   try {
      if (chapterlink != "") {
         chapterdetails(chapterlink, ".entry-content img", false, false).then(function (data) {
            res.status(200).send(data);
         }).catch((e) => {
            res.status(400).send({ "error": e.originalMessage })
         })
      } else {
         res.status(404).send({ "error": "Chapter link is empty" });
      }
   } catch (e) {
      res.status(400).send(e);
   }
})

// Get All Manga data
router.get("/mangadata", async (req, res) => {
   try {
      let data = [];
      const categories = await Category.find({status: 'active'}).sort({ order: -1 });
      for (const element of categories) {
         let mangaData = await Manga.find({ category: element._id, 'status': 'active' }).sort({order: 1})
         data.push({ "title": element.title, "manga": mangaData })   
      }
      res.status(200).send(data);

   } catch (e) {
      res.status(400).send(e);
   }
})


module.exports = router;