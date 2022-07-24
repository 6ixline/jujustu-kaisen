const pp = require('puppeteer');

async function chapterdetails(chapterlinks){
    const brower = await pp.launch();
    const page = await brower.newPage();
    await page.goto(chapterlinks);
    const chapterImages = await page.evaluate(function(){
       const images = document.querySelectorAll(".flex picture");
       
       const array = [];

       for(i=0; i< images.length; i++){
            array.push(images[i].querySelector("img").src);
       }
       return array
    })

   return chapterImages;
};

module.exports = chapterdetails;