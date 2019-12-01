const puppeteer = require("puppeteer");
const { username, password, links } = require("./account");

(async () => {
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
    }
  });
  await loginPage.click("#postBtn");
})();
