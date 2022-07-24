const express = require('express');
const chapertlist = require("./utils/chapters");

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())




app.get("/chapters", (req, res) =>{
   chapertlist().then(function(data){
      res.send(data);
   });
})
app.post("/chapterdetails", (req, res) =>{
   res.send(req);
})


app.get("", (req,res)=>{
   res.send("Jujustu kaisen...");
});

app.listen(port, ()=>{
   console.log(`Server is running on : 3000`)
});
