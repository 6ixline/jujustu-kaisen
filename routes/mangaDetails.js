const express = require("express");
const crypto = require("crypto");
const chapertlist = require("../utils/chapters");
const chapterdetails = require("../utils/chapterdetails");
const myCache = require("../utils/cache");

const router = express.Router();
const secret = process.env.SECRET;

function getKey(val){
    const hash =  crypto.createHash("sha256");
    hash.update(val);
    val = hash.digest("hex");
    return val;
}

router.post("/chapterlists", async(req,res)=>{
    try {
        let key = getKey(req.body.mangaUrl);
        let chapterlist = myCache.get(key);
        if(chapterlist == undefined){
            const data = await chapertlist(`${req.body.mangaUrl}`, `${req.body.chapterRoute}`, `${req.body.chapterRouteEnd}`);
            myCache.set(key, data, 86400);
            chapterlist = data;
        }
        res.status(200).send(chapterlist);
     } catch (e) {
        res.status(400).send(e);
     }
});
router.post("/chapterdata", async(req,res)=>{
    const chapterlink = req.body.chapterlink;
    try {
        if (chapterlink != "") {
            let key = getKey(chapterlink);
            let chapterData = myCache.get(key);
            if(chapterData == undefined){
                chapterdetails(chapterlink, req.body.chapterImageEnd, req.body.imageDirect, req.body.scroll).then(function (data) {
                    if(data){
                        myCache.set(key, data, 86400);
                    }
                    res.status(200).send(data);
                }).catch((e) => {
                    res.status(400).send({ "error": e.originalMessage })
                })
            }else{
                res.status(200).send(chapterData);
            }
        } else {
            res.status(404).send({ "error": "Chapter link is empty" });
        }
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;