const express = require('express');
const chapertlist = require("./utils/chapters");
const chapterdetails = require("./utils/chapterdetails");

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())


app.get("/chapters", async (req, res) =>{
   res.setHeader("Content-Type", "text/html; charset=utf-8")
   res.setHeader("Transfer-Encoding", "chunked")
   try{ 
     const data =  await chapertlist();
     res.status(200).send(data);
   }catch(e){
      res.status(400).send(e);
   }
})
app.post("/chapterdetails", (req, res) =>{
   const chapterlink = req.body.chapterlink;
   try{
      if(chapterlink != ""){
         chapterdetails(chapterlink).then(function(data){
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
