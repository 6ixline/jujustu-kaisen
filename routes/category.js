const express = require('express')
const Category = require('../models/category')

const router = express.Router();

// creating endpoint for Category
router.post('/category', async (req, res) => {
    const category = new Category({
        ...req.body
    })
    try {
        await category.save()
        res.status(201).send(category)
    } catch (e) {
        res.status(400).send({ status : "Error", msg: e.message})
    }
})

// get endpoint for Category
router.get('/category', async (req, res) => {
    const category = await Category.find({});
    try {
        res.status(201).send(category)
    } catch (e) {
        res.status(400).send({ status : "Error", msg: e.message})
    }
})

// Update Category by id
router.patch('/category/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, { ...req.body});
        res.status(201).send(category)
    } catch (e) {
        res.status(400).send({ status : "Error", msg: e.message})
    }
})

module.exports = router;