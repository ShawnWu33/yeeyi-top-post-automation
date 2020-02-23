const puppeteer = require("puppeteer");
const { username, password, links } = require("./account");
const cron = require('node-cron')



const elevate = async () => {
  console.log('Fire at', Date());
  const browser = await puppeteer.launch();
  const loginPage = await browser.newPage();
  await loginPage.goto(
    "http://www.yeeyi.com/forum/index.php?app=member&act=login"
  );
  console.log("==Input Username and Password==");
  await loginPage.type("#telTxtLogin", username);
  await loginPage.type("#passShow", password);
  console.log("==Click Button ==");
  loginPage.on("dialog", async dialog => {
    if (dialog.message() === "Login success") {
      console.log("== Login Success ==");
      promiseArray = [];
      links.forEach(link => {
        console.log(`== Elevate thread link: == ${link}`);
        const task = browser
          .newPage()
          .then(async page => {
            await page.goto(`http://${link}`);
            await page.click('a[title="提升帖子"]');
            console.log(`Page ${link} elevated.`)
          }).catch(e =>
              console.error(e)
          )
        promiseArray.push(task);
      });
      console.log("All task are distributed")
      await Promise.all(promiseArray);
      browser.close();
    } else {
        console.error('Account incorrect')
    }
  });
  await loginPage.click("#postBtn");
}
cron.schedule('0 0,1,10,11,12,13,14,15,16,17,18,19,20,21,22,23 * * *', elevate);