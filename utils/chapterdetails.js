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

 

async function chapterdetails(chapterlinks){
    const brower = await pp.launch({
      headless: true,
      args:minimal_args,
      userDataDir: './my/path'
  });
    const page = await brower.newPage();
    await page.goto(chapterlinks);
    const chapterImages = await page.evaluate(function(){
       const images = document.querySelectorAll(".img_container");
       
       const array = [];

       for(i=0; i< images.length; i++){
            array.push(images[i].querySelector("img").src);
       }
       return array
    })

   return chapterImages;
};

module.exports = chapterdetails;