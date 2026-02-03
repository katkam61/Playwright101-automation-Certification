import {expect , test} from "@playwright/test";
import { chromium } from "playwright";

// test.use ({retries: 0})
//Lambda Test Capabilities
    const ChromeWindowsCaps = {
        'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
        'browserVersion': 'latest',
        'LT:Options': 
        {
        'platform': 'Windows 10',
        'build': 'Playwright Assessement Build',
        'name': 'Scenario 1 -> Chrom Windows 10',
        'user': 'rajashekarkatkam61',
        'accessKey': 'LT_l9TgEDI1Ye5CEEogiChBUUJWgR5wJMjsoNHmoXI7sO0KRXw',
        'network': true,
        'video': true,
        'console': true
        }
    }
    const FirfoxMacOSCaps = {
        'browserName': 'pw-firefox', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
        'browserVersion': 'latest',
        'LT:Options': 
        {
        'platform': 'macOS Catalina',
        'build': 'Playwright Assessement Build',
        'name': 'Scenario 2 -> Firefox macOS Catalina',
        'user': 'rajashekarkatkam61',
        'accessKey': 'LT_l9TgEDI1Ye5CEEogiChBUUJWgR5wJMjsoNHmoXI7sO0KRXw',
        'network': true,
        'video': true,
        'console': true
        }
    }
    const EdgeWindowsCaps = {
        'browserName': 'MicrosoftEdge', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
        'browserVersion': 'latest',
        'LT:Options': 
        {
        'platform': 'Windows 11',
        'build': 'Playwright Assessement Build',
        'name': 'Scenario 3 -> Edge Windows 11',
        'user': 'rajashekarkatkam61',
        'accessKey': 'LT_l9TgEDI1Ye5CEEogiChBUUJWgR5wJMjsoNHmoXI7sO0KRXw',
        'network': true,
        'video': true,
        'console': true
        }
        
    }

async function launchBrowser(capabilities:any) {
    const wsEndpoint  = `wss://cdp.lambdatest.com/playwright?capabilities=` +
    encodeURIComponent(JSON.stringify(capabilities))
    const browser = await chromium.connect(wsEndpoint)
    const context = await browser.newContext()
    const page = await context.newPage()

    return {browser, context, page}
}


test.describe.parallel(`Playwright Assessment - LambdaTest Parallel`, ()=>{
    test.setTimeout(120000)
    test("Scenario 1 -> Chrome Windows 10", async({})=>{

        const {browser, page} = await launchBrowser(ChromeWindowsCaps)
        await page.goto("https://www.lambdatest.com/selenium-playground")

        const getSimpleFormDemoLnk = page.locator("//a[text()='Simple Form Demo']")
        await getSimpleFormDemoLnk.click()
            
        await expect(page).toHaveURL(/simple-form-demo/)

        const msgInput = "Welcome to LambdaTest"
        await page.locator("//input[@id='user-message']").fill(msgInput)

        await page.locator("//button[@id='showInput']").click()

        const enteredMsg = await page.locator("//label[text()='Your Message: ']/..//p").textContent()
        console.log("Entered message is: "+ enteredMsg)

        expect(msgInput).toBe(enteredMsg)

        await page.close()
        await browser.close()
    })

    test("Scenario 2 -> Firefox macOS Catalina", async ({})=>{

        const {browser, page} = await launchBrowser(FirfoxMacOSCaps)
        await page.goto("https://www.lambdatest.com/selenium-playground")

        const getDragAndDropSlidersLnk = page.locator("//a[text()='Drag & Drop Sliders']")
        await getDragAndDropSlidersLnk.click()
        
        await expect(page).toHaveURL(/drag-drop-range-sliders-demo/)

        const slider = page.locator("//input[@value=15]")
        await slider.fill('75')

        await expect(slider).toHaveValue('75')

        await page.close()
        await browser.close()
    })

    test("Scenario 3 -> Edge Windows 11", async ({})=>{

        const {browser, page} = await launchBrowser(EdgeWindowsCaps)

        await page.goto("https://www.Lambdatest.com/selenium-playground")
        const getInpurFormSubmitLnk = page.locator("//a[text()='Input Form Submit']")
        await getInpurFormSubmitLnk.click()

        const submitBtn =  page.locator("//button[text()='Submit']")
        await submitBtn.click()

        const nameInput =  page.locator('#name')

        const errorMessage = await nameInput
            .evaluate(el => (el as HTMLInputElement).validationMessage)

        expect(errorMessage).toBe('Please fill out this field.')

        await nameInput.fill('Rajashekar')

        const emailInput =  page.getByLabel('Email*')
        await emailInput.fill("TestPlaywright@gmail.com")

        const passwordInput =  page.locator('[name="password"]')
        await passwordInput.fill('TestPlaywright@gmail.com')

        const companyInput =  page.locator('#company')
        await companyInput.fill('LambdaTest')

        const websiteInput =  page.locator('[name="website"]')
        await websiteInput.fill('www.DummyLambdaTest.com')

        await page.selectOption("//select[@name='country']", {label: 'United States'})
        await expect(page.locator("//select[@name='country']")).toHaveValue('US')
        
        const cityInput =  page.locator('[name="city"]')
        await cityInput.fill('New York')

        const addressLine1Input =  page.locator('[name="address_line1"]')
        await addressLine1Input.fill('1000 5th Ave')

        const addressLine2Input =  page.locator('#inputAddress2')
        await addressLine2Input.fill('E Benton Pl')

        const stateInput =  page.locator('#inputState')
        await stateInput.fill('New York')

        const zipInput =  page.locator('#inputZip')
        await zipInput.fill('10028')
        await submitBtn.click()

        const expectedSuccessMsg = "Thanks for contacting us, we will get back to you shortly."

        const actualSuccessMsg = await page.locator("//p[text()='Thanks for contacting us, we will get back to you shortly.']").textContent()
        console.log("Success message displayed as: "+ actualSuccessMsg)

        expect(actualSuccessMsg).toEqual(expectedSuccessMsg)
        await page.close()
        await browser.close()

        })
    })
