const express = require('express')
const Category = require('../models/category')

const router = express.Router();

// creating endpoint for task
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


module.exports = router;