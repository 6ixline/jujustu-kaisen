const express = require("express");
const Category = require('../models/category');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/category_view', auth, async (req,res)=>{
    const category = await Category.find({});
    res.render('category_view',{
        title: 'Categories',
        category
    })
})
router.get('/category_form', auth, async (req,res)=>{
    res.render('category_form',{
        title: 'Add Category',
    })
})
router.post('/category_form_inter', auth, async (req,res)=>{
    if(req.body.title){
        try{
            const category = new Category({
                ...req.body
            });
            await category.save();
            res.redirect("/category_view")
        }catch(e){
            res.redirect("/category_view")
        }
    }else{
        res.redirect("/category_view")
    }
})
router.post('/category_form_inter/:id', auth, async (req,res)=>{

    if(req.body.title){
        const category = await Category.findByIdAndUpdate(req.params.id, { ...req.body });
    }
    
    res.redirect('/category_view')
})
router.get('/category/:id', auth, async (req,res)=>{
    const category = await Category.findById(req.params.id)
    res.render('category_form',{
        title: 'Update Category',
        category
    })
})
router.get('/categoryDelete/:id', auth, async (req,res)=>{
    try{
        const category = await Category.findByIdAndDelete(req.params.id)
        res.redirect('/category_view')
    }catch(e){
        res.redirect('/category_view')
    }
    
})


module.exports = router;
