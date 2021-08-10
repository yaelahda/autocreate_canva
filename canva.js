const readlineSync = require('readline-sync');
const puppeteer = require('puppeteer');
var random_name = require('node-random-name');
const fs = require('async-file');
const delay = require('delay');
const { Console } = require('console');

(async () => {
    console.log("////////////////////////////////////////////////////////////////////\n")
    console.log("/////////////      Canva Autocreate by Yaelahda      ///////////////\n")
    console.log("////////////////////////////////////////////////////////////////////\n")
    var passwd = readlineSync.question('[+] Password Yang Diinginkan ? ')
    console.log('\n')
    while(true) {
    const $options = { waitUntil: 'networkidle2' };
    const browser = await puppeteer.launch({
        headless:false,
        devtools:false,
    })

    const page = await browser.newPage();
    var nama1 = random_name({
        first: true
    });
    var nama2 = random_name({
        last: true
    });
    var nama1 = nama1.toLowerCase();
    var nama2 = nama2.toLowerCase();
    var randnama = nama1+" "+nama2
    await page.goto('https://tempmailo.com/', $options)

    try {
        await page.waitForSelector('<h1 data-translate="challenge_headline">One more step</h1>')
        continue
    } catch (err) {
    }
    await page.waitForSelector('#i-email')
    process.stdout.write(`[-] Sedang mendapatkan email => `)
    const copy = await page.$('#i-email')
    await copy.click()

    await page.keyboard.down('ControlLeft');
    await page.keyboard.press('KeyA');
    await page.keyboard.up('ControlLeft');

    await page.keyboard.down('ControlLeft');
    await page.keyboard.press('KeyC');
    await page.keyboard.up('ControlLeft');

    
    const page2 = await browser.newPage();
    await page2.goto('https://www.canva.com/q/pro-signup');
    await page2.waitForSelector("iframe")
        const elementHandlea = await page2.$(
            'iframe[src="https://www.canva.com/_login_widget?origin=https%3A%2F%2Fwww.canva.com&locale=en-US&embeddableFlow=%255B%257B%2522A%253F%2522%253A%2522A%2522%252C%2522A%2522%253A%2522https%253A%252F%252Fwww.canva.com%2522%252C%2522D%2522%253Atrue%257D%252C%257B%2522A%253F%2522%253A%2522B%2522%252C%2522A%2522%253Atrue%252C%2522B%2522%253A%2522B%2522%257D%255D"]',
        );
    const frame = await elementHandlea.contentFrame();
    await frame.click('#root > div > main > div > div > div > div > div > div > div > button > span')
    await frame.type('#__a11yId10', randnama);
    await page2.keyboard.down('Tab')
    await page2.keyboard.down('ControlLeft');
    await page2.keyboard.press('KeyV');
    await page2.keyboard.up('ControlLeft');
    await page2.keyboard.down('Tab')
    await page2.keyboard.type(passwd)
    await page2.keyboard.down('Enter')
    let youremail = await frame.$eval('#__a11yId19 > span > span', el => el.innerText);
    const emaile = youremail.slice(3)
    process.stdout.write(emaile+' Success\n')
    await delay(3000)

    await page.bringToFront();
    await page.waitForSelector('#apptmo > div > div.i-box > div.primaryCommands > div:nth-child(2) > button')
    const refresh = await page.$('#apptmo > div > div.i-box > div.primaryCommands > div:nth-child(2) > button')
    await refresh.click()
    await delay(5000)
    await page.waitForSelector('#apptmo > div > div.mail-items-container > div.left > ul')
    const canva = await page.$('#apptmo > div > div.mail-items-container > div.left > ul')
    await canva.click()

    await page.waitForSelector("#apptmo > div > div.mail-items-container > div.right > div.message-wrapper > div.message-subject");
    let yourotp = await page.$eval('#apptmo > div > div.mail-items-container > div.right > div.message-wrapper > div.message-subject', el => el.innerText);
    console.log("[+] Kode otp : ", yourotp)
    await delay(3000)
    await page2.bringToFront();
    await frame.waitForSelector('#root > div > main > div > div > div > div > div > div > div > form > div.YSsG0A > div > div:nth-child(1) > input')
    await frame.type('#root > div > main > div > div > div > div > div > div > div > form > div.YSsG0A > div > div:nth-child(1) > input', yourotp.substr(0, 1), {delay:15})
    await frame.type('#root > div > main > div > div > div > div > div > div > div > form > div.YSsG0A > div > div:nth-child(2) > input', yourotp.substr(1, 1), {delay:15})
    await frame.type('#root > div > main > div > div > div > div > div > div > div > form > div.YSsG0A > div > div:nth-child(3) > input', yourotp.substr(2, 1), {delay:15})
    await frame.type('#root > div > main > div > div > div > div > div > div > div > form > div.YSsG0A > div > div:nth-child(4) > input', yourotp.substr(3, 1), {delay:15})
    await frame.type('#root > div > main > div > div > div > div > div > div > div > form > div.YSsG0A > div > div:nth-child(5) > input', yourotp.substr(4, 1), {delay:15})
    await frame.type('#root > div > main > div > div > div > div > div > div > div > form > div.YSsG0A > div > div:nth-child(6) > input', yourotp.substr(5, 1), {delay:15})
    await page2.keyboard.down('Enter')
    await page.waitForTimeout(2500)
    await fs.appendFile("acc_canva.txt", emaile+"|"+passwd+"\n", "utf-8");
    console.log('[-] sukses membuat akun\n')
  } 
})();
