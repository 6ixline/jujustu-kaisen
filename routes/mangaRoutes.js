const express = require("express");
const Manga = require("../models/manga");
const Category = require("../models/category");
const auth = require("../middleware/auth");
const getAllManga = require("../services/getAllManga");
const myCache = require("../utils/cache");

const router = express.Router();

// creating endpoint for task
router.post("/manga", auth, async (req, res) => {
  try {
    const manga = new Manga({
      ...req.body,
    });
    await manga.save();
    getAllManga().then((data) => {
      myCache.set("allmanga", data);
    });
    res.status(201).send(manga);
  } catch (e) {
    res.status(400).send({ status: "Error", msg: e.message });
  }
});
router.patch("/manga/:id", auth, async (req, res) => {
  try {
    const manga = await Manga.findByIdAndUpdate(req.params.id, { ...req.body });
    getAllManga().then((data) => {
      myCache.set("allmanga", data);
    });
    res.status(201).send(manga);
  } catch (e) {
    res.status(400).send({ status: "Error", msg: e.message });
  }
});

// Get By Manga ID
router.get("/manga/:id", auth, async (req, res) => {
  try {
    const manga = await Manga.find({ category: req.params.id });
    res.status(201).send(manga);
  } catch (e) {
    res.status(400).send({ status: "Error", msg: e.message });
  }
});

// ------------------------------------------------------------------

router.get("/manga_view", auth, async (req, res) => {
  const manga = await Manga.find({});
  res.render("manga_view", {
    title: "Manga",
    manga,
  });
});
router.get("/manga_form", auth, async (req, res) => {
  const category = await Category.find({});
  res.render("manga_form", {
    title: "Add Manga",
    category,
  });
});
router.post("/manga_form_inter", auth, async (req, res) => {
  if (req.body.storageKey) {
    try {
      const manga = new Manga({
        ...req.body,
      });
      await manga.save();
      getAllManga().then((data) => {
        myCache.set("allmanga", data);
      });
      res.redirect("/manga_view");
    } catch (e) {
      console.log(e);
      res.redirect("/manga_view");
    }
  } else {
    res.redirect("/manga_view");
  }
});
router.post("/manga_form_inter/:id", auth, async (req, res) => {
  if (req.body.storageKey) {
    const manga = await Manga.findByIdAndUpdate(req.params.id, { ...req.body });
    getAllManga().then((data) => {
        myCache.set("allmanga", data);
    });
  }

  res.redirect("/manga_view");
});
router.get("/manga_form/:id", auth, async (req, res) => {
  const manga = await Manga.findById(req.params.id);
  const category = await Category.find({});
  res.render("manga_form", {
    title: "Update Category",
    manga,
    category,
  });
});
router.get("/mangaDelete/:id", auth, async (req, res) => {
  try {
    await Manga.findByIdAndDelete(req.params.id);
    res.redirect("/manga_view");
  } catch (e) {
    res.redirect("/manga_view");
  }
});

module.exports = router;
