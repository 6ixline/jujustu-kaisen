const pp = require('puppeteer');

async function chapterList(){
    try{  
        const brower = await pp.launch({
            headless: true,
            args:['--no-sandbox']
        });
        const page = await brower.newPage();
        await page.goto('https://readkaisen.com/');
        const data = await page.evaluate(function(){
            const chapterLinks = document.querySelectorAll(".table tbody t");
            const array = [];
            let episode = chapterLinks.length;

            for(i=0; i< chapterLinks.length; i++){
                array.push('https://readkaisen.com' + chapterLinks[i].querySelectorAll("td a")['1'].getAttribute("href"));
                episode--;
            }
            return array
        })

        return data;
    }catch(e){
        console.log("Error! Something wrong")
    }
}


module.exports = chapterList;