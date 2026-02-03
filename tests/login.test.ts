// import{chromium, test} from "@playwright/test"
import{test, expect} from "@playwright/test"

test("Login test demo", async({page})=>{

    // const browser = await chromium.launch({
    //     headless: false
    // });
    // const context = await browser.newContext();
    // const page = await context.newPage();

    await page.goto("https://ecommerce-playground.lambdatest.io/");
    await page.hover("//a[@data-toggle='dropdown']//span[contains(text(),'My account')]");
    // await page.click("//span[text()[normalize-space()='Login']]");
    // await page.click("text=Login");
    await page.click("'Login'");

    await page.fill("input[name='email']","koushik350@gmail.com")
    await page.fill("input[name='password']", "Pass123$")
    await page.click("input[value='Login']")

    await page.waitForTimeout(5000)

    // //cached new page on existing session
    // const newPage = await context.newPage()
    // await newPage.goto("https://ecommerce-playground.lambdatest.io/");

    // await page.waitForTimeout(5000)

    // //without cashed and session

    // const newBrowser = await browser.newContext()
    // const newPage1 = await newBrowser.newPage()
    // await newPage1.goto("https://ecommerce-playground.lambdatest.io/");
    // await page.waitForTimeout(5000)


})