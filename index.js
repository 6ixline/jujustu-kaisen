const express = require('express');
const chapertlist = require("./utils/chapters");
const chapterdetails = require("./utils/chapterdetails");

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())


app.get("/jujutsu/chapters", async (req, res) =>{
   try{ 
     const data =  await chapertlist("https://readkaisen.com/", ".maniac_posts .chap_tab tr", "a");
     res.status(200).send(data);
   }catch(e){
      res.status(400).send(e);
   }
})
app.get("/demon/chapters", async (req, res) =>{
   try{ 
     const data =  await chapertlist("https://demon-slayer-chapters.com/", "#Chapters_List ul li", "a");
     res.status(200).send(data);
   }catch(e){
      res.status(400).send(e);
   }
})
app.get("/hero/chapters", async (req, res) =>{
   try{ 
     const data =  await chapertlist("https://heroacademia-manga.com/", ".su-posts-list-loop li", "a");
     res.status(200).send(data);
   }catch(e){
      res.status(400).send(e);
   }
})
app.get("/one/chapters", async (req, res) =>{
   try{ 
     const data =  await chapertlist("https://punch.ldkmanga.com/", "#ceo_latest_comics_widget-3 ul li", "a");
     res.status(200).send(data);
   }catch(e){
      res.status(400).send(e);
   }
})
app.post("/jujutsu/chapterdetails", (req, res) =>{
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
app.post("/demon/chapterdetails", (req, res) =>{
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
app.post("/hero/chapterdetails", (req, res) =>{
   const chapterlink = req.body.chapterlink;
   try{
      if(chapterlink != ""){
         chapterdetails(chapterlink, ".entry-content center img", false).then(function(data){
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
app.post("/one/chapterdetails", (req, res) =>{
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


app.get("", (req,res)=>{
   res.send("Jujustu kaisen...");
});

app.listen(port, ()=>{
   console.log(`Server is running on : 3000`)
});
