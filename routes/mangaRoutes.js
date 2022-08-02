const express = require('express');
const chapertlist = require("../utils/chapters");
const chapterdetails = require("../utils/chapterdetails");

const router = new express.Router();



router.get("/jujutsu/chapters", async (req, res) =>{
    try{ 
      const data =  await chapertlist("https://readkaisen.com/", ".maniac_posts .chap_tab tr", "a");
      res.status(200).send(data);
    }catch(e){
       res.status(400).send(e);
    }
 })
 router.get("/demon/chapters", async (req, res) =>{
    try{ 
      const data =  await chapertlist("https://demon-slayer-chapters.com/", "#Chapters_List ul li", "a");
      res.status(200).send(data);
    }catch(e){
       res.status(400).send(e);
    }
 })
 router.get("/hero/chapters", async (req, res) =>{
    try{ 
      const data =  await chapertlist("https://read.myheromanga.me/", "#ceo_latest_comics_widget-3 li", "a");
      res.status(200).send(data);
    }catch(e){
       res.status(400).send(e);
    }
 })
 router.get("/one/chapters", async (req, res) =>{
    try{ 
      const data =  await chapertlist("https://punch.ldkmanga.com/", "#ceo_latest_comics_widget-3 ul li", "a");
      res.status(200).send(data);
    }catch(e){
       res.status(400).send(e);
    }
 })
 router.post("/jujutsu/chapterdetails", (req, res) =>{
    const chapterlink = req.body.chapterlink;
    try{
       if(chapterlink != ""){
          chapterdetails(chapterlink, ".img_container", true).then(function(data){
             res.status(200).send(data);
          }).catch((e)=>{
             res.status(400).send({"error": e.originalMessage})
          })
       }else{
          res.status(404).send({"error":"Chapter link is empty"});
       }
    }catch(e){
       res.status(400).send(e);
    }
 }) 
 router.post("/demon/chapterdetails", (req, res) =>{
    const chapterlink = req.body.chapterlink;
    try{
       if(chapterlink != ""){
          chapterdetails(chapterlink, ".separator img", false).then(function(data){
             res.status(200).send(data);
          }).catch((e)=>{
             res.status(400).send({"error": e.originalMessage})
          })
       }else{
          res.status(404).send({"error":"Chapter link is empty"});
       }
    }catch(e){
       res.status(400).send(e);
    }
 }) 
 router.post("/hero/chapterdetails", (req, res) =>{
    const chapterlink = req.body.chapterlink;
    try{
       if(chapterlink != ""){
          chapterdetails(chapterlink, "#showmanga-select-chapter img", false).then(function(data){
             res.status(200).send(data);
          }).catch((e)=>{
             res.status(400).send({"error": e.originalMessage})
          })
       }else{
          res.status(404).send({"error":"Chapter link is empty"});
       }
    }catch(e){
       res.status(400).send(e);
    }
 }) 
 router.post("/one/chapterdetails", (req, res) =>{
    const chapterlink = req.body.chapterlink;
    try{
       if(chapterlink != ""){
          chapterdetails(chapterlink, ".entry-content img", false).then(function(data){
             res.status(200).send(data);
          }).catch((e)=>{
             res.status(400).send({"error": e.originalMessage})
          })
       }else{
          res.status(404).send({"error":"Chapter link is empty"});
       }
    }catch(e){
       res.status(400).send(e);
    }
 }) 
 
 
 router.get("", (req,res)=>{
    res.send("Jujustu kaisen...");
 });
 
module.exports = router;