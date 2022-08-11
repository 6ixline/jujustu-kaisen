const express = require("express");
const chapertlist = require("../utils/chapters");
const chapterdetails = require("../utils/chapterdetails");

const router = express.Router();


router.post("/chapterlists", async(req,res)=>{
    try {
        const data = await chapertlist(`${req.body.mangaUrl}`, `${req.body.chapterRoute}`, `${req.body.chapterRouteEnd}`);
        res.status(200).send(data);
     } catch (e) {
        res.status(400).send(e);
     }
});
router.post("/chapterdata", async(req,res)=>{
    const chapterlink = req.body.chapterlink;
    try {
        if (chapterlink != "") {
            chapterdetails(chapterlink, req.body.chapterImageEnd, req.body.imageDirect, req.body.scroll).then(function (data) {
                res.status(200).send(data);
            }).catch((e) => {
                res.status(400).send({ "error": e.originalMessage })
            })
        } else {
            res.status(404).send({ "error": "Chapter link is empty" });
        }
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;