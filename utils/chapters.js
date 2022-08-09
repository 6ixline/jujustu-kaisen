const pp = require('puppeteer');
var userAgent = require("user-agents");

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
  
async function chapterList(url, chapterroute, linkRoute){
    try{  
        const brower = await pp.launch({
            headless: true,
            args:minimal_args,
            userDataDir: './my/path'
        });
        const page = await brower.newPage();
        await page.setUserAgent(userAgent.toString());
        await page.goto(url);
        const data = await page.evaluate(function(chapterroute, linkRoute){
            const chapterLinks = document.querySelectorAll(chapterroute);
            const array = [];
            let episode = chapterLinks.length;

            console.log(chapterLinks[0].querySelector(linkRoute).getAttribute("href"))

            for(i=0; i < chapterLinks.length; i++){
                if(chapterLinks[i].querySelector(linkRoute) != null){
                    array.push(chapterLinks[i].querySelector(linkRoute).getAttribute("href"));
                }
                episode--;
            }
            return array
        }, chapterroute, linkRoute)
        brower.close();
        return data;
    }catch(e){
        console.log("Error! Something wrong", e)
    }
}


module.exports = chapterList;