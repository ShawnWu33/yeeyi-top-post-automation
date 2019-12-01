const puppeteer = require('puppeteer');
const {username,password} = require('./account');

(async () => {
  const browser = await puppeteer.launch();
  const loginPage = await browser.newPage();
  await loginPage.goto('http://www.yeeyi.com/forum/index.php?app=member&act=login');
  console.log('==Input Username and Password==');
  await loginPage.type('#telTxtLogin', username);
  await loginPage.type('#passShow', password);
  await loginPage.screenshot({path: 'beforeClick.png'});
  console.log('==Click Button ==');
  loginPage.on('dialog', async dialog => {
    console.log(dialog.message());
    console.log('==Go to elevate thread link ==');
    const page = await browser.newPage()
    await page.goto('http://www.yeeyi.com/bbs/forum.php?mod=post&action=refresh&fid=142&id=4595329');
    await page.screenshot({path: 'afterElevated.png'});
    await browser.close();
  });
  await loginPage.click('#postBtn');
})();
