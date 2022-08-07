const express = require('express')
const Manga = require('../models/manga')
const Category = require("../models/category");

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

// Get By Manga ID
router.get('/manga/:id', async (req, res) => {
    try {
        const manga = await Manga.find({ category : req.params.id });
        res.status(201).send(manga)
    } catch (e) {
        res.status(400).send({ status : "Error", msg: e.message})
    }
})

// ------------------------------------------------------------------

router.get('/manga_view', async (req,res)=>{
   const manga = await Manga.find({});
   res.render('manga_view',{
       title: 'Manga',
       manga
   })
})
router.get('/manga_form', async (req,res)=>{
   const category = await Category.find({});
   res.render('manga_form',{
       title: 'Add Manga',
       category
   })
})
router.post('/manga_form_inter', async (req,res)=>{
   if(req.body.storageKey){
       try{
           const manga = new Manga({
               ...req.body
           });
           await manga.save();
           res.redirect("/manga_view")
       }catch(e){
            console.log(e);
           res.redirect("/manga_view")
       }
   }else{
       res.redirect("/manga_view")
   }
})
router.post('/manga_form_inter/:id', async (req,res)=>{

   if(req.body.storageKey){
       const manga = await Manga.findByIdAndUpdate(req.params.id, { ...req.body });
   }
   
   res.redirect('/manga_view')
})
router.get('/manga_form/:id', async (req,res)=>{
   const manga = await Manga.findById(req.params.id)
   const category = await Category.find({});
   res.render('manga_form',{
       title: 'Update Category',
       manga,
       category
   })
})
router.get('/mangaDelete/:id', async (req,res)=>{
   try{
       await Manga.findByIdAndDelete(req.params.id)
       res.redirect('/manga_view')
   }catch(e){
       res.redirect('/manga_view')
   }
   
})

module.exports = router;