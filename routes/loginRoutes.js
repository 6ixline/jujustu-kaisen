const express = require('express');
const store = require("store2");


const router = express.Router();


router.get('/login',(req,res)=>{
    
    res.render('login',{
    })
})

router.post("/login", (req,res)=>{
    if(req.body.username != "" && req.body.password != ""){
        if(req.body.username == process.env.EMAIL && req.body.password == process.env.PASSWORD){
            const data = JSON.stringify(req.body);
            store('user', data);
        }
    }

    res.redirect("/");
})
router.get("/logout", (req,res)=>{
    store.clear();    
    res.redirect("/");
})


module.exports = router;