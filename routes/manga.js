const express = require('express')
const Manga = require('../models/manga')

const router = express.Router();

// creating endpoint for task
router.post('/manga', async (req, res) => {
    try {
        const manga = new Manga({
            ...req.body
        })
        await manga.save()
        res.status(201).send(manga)
    } catch (e) {
        res.status(400).send({ status : "Error", msg: e.message})
    }
})
router.patch('/manga/:id', async (req, res) => {
    try {
        const manga = await Manga.findByIdAndUpdate(req.params.id, { ...req.body});
        res.status(201).send(manga)
    } catch (e) {
        res.status(400).send({ status : "Error", msg: e.message})
    }
})

// Get By Category ID
router.get('/manga/:id', async (req, res) => {
    try {
        const manga = await Manga.find({ category : req.params.id });
        res.status(201).send(manga)
    } catch (e) {
        res.status(400).send({ status : "Error", msg: e.message})
    }
})

module.exports = router;