const pp = require('puppeteer');

const minimal_args = [
   '--autoplay-policy=user-gesture-required',
   '--disable-background-networking',
   '--disable-background-timer-throttling',
   '--disable-backgrounding-occluded-windows',
   '--disable-breakpad',
   '--disable-client-side-phishing-detection',
   '--disable-component-update',
   '--disable-default-apps',
   '--disable-dev-shm-usage',
   '--disable-domain-reliability',
   '--disable-extensions',
   '--disable-features=AudioServiceOutOfProcess',
   '--disable-hang-monitor',
   '--disable-ipc-flooding-protection',
   '--disable-notifications',
   '--disable-offer-store-unmasked-wallet-cards',
   '--disable-popup-blocking',
   '--disable-print-preview',
   '--disable-prompt-on-repost',
   '--disable-renderer-backgrounding',
   '--disable-setuid-sandbox',
   '--disable-speech-api',
   '--disable-sync',
   '--hide-scrollbars',
   '--ignore-gpu-blacklist',
   '--metrics-recording-only',
   '--mute-audio',
   '--no-default-browser-check',
   '--no-first-run',
   '--no-pings',
   '--no-sandbox',
   '--no-zygote',
   '--password-store=basic',
   '--use-gl=swiftshader',
   '--use-mock-keychain',
 ];
async function chapterdetails(chapterlinks, chapterRoute, checkReq, checkScroll){
    const brower = await pp.launch({
      headless: true ,
      args:minimal_args,
      userDataDir: './my/path'
  });
    const page = await brower.newPage();
    await page.goto(chapterlinks);
    if(checkScroll){
      await page.setViewport({
         width: 1200,
         height: 800
      });
     await autoScroll(page);
    }
   
    const chapterImages = await page.evaluate(function(chapterRoute, checkReq){
       const images = document.querySelectorAll(chapterRoute);
       
       const array = [];

       for(i=0; i< images.length; i++){
            if(checkReq){
               if(images[i].querySelector("img").src != ""){
                  array.push(images[i].querySelector("img").src);
               }
            }else{
               if(images[i].src != ""){
                  array.push(images[i].src);
               }
            }
       }
       return array
    }, chapterRoute, checkReq)
    brower.close();
   return chapterImages;
};

async function autoScroll(page){
   await page.evaluate(async () => {
       await new Promise((resolve, reject) => {
           var totalHeight = 0;
           var distance = 100;
           var timer = setInterval(() => {
               var scrollHeight = document.body.scrollHeight;
               window.scrollBy(0, distance);
               totalHeight += distance;

               if(totalHeight >= scrollHeight - window.innerHeight){
                   clearInterval(timer);
                   resolve();
               }
           }, 100);
       });
   });
}

module.exports = chapterdetails;