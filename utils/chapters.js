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
            const chapterLinks = document.querySelectorAll(".maniac_posts .chap_tab tr");
            const array = [];
            let episode = chapterLinks.length;

            for(i=0; i< chapterLinks.length; i++){
                array.push(chapterLinks[i].querySelector("a").getAttribute("href"));
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