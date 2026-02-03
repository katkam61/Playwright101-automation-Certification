import {expect , test} from "@playwright/test";
import { chromium } from "playwright";

// test.use ({retries: 0})
//Lambda Test Capabilities
const browsers = [
    {
        name: 'Chrome',
        capabilities: 
        {
        'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
        'browserVersion': 'latest',
        'LT:Options': 
        {
        'platform': 'Windows 10',
        'build': 'Playwright Test Build',
        'name': 'Playwright Chrome Test',
        'user': 'rajashekarkatkam61',
        'accessKey': 'LT_l9TgEDI1Ye5CEEogiChBUUJWgR5wJMjsoNHmoXI7sO0KRXw',
        'network': true,
        'video': true,
        'console': true
        }
        }
    },
        {
        name: 'Firfox',
        capabilities: 
        {
        'browserName': 'pw-firefox', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
        'browserVersion': 'latest',
        'LT:Options': 
        {
        'platform': 'macOS Catalina',
        'build': 'Playwright Test Build',
        'name': 'Playwright Firefox Test',
        'user': 'rajashekarkatkam61',
        'accessKey': 'LT_l9TgEDI1Ye5CEEogiChBUUJWgR5wJMjsoNHmoXI7sO0KRXw',
        'network': true,
        'video': true,
        'console': true
        }
        }
    },
        {
        name: 'Edge',
        capabilities: 
        {
        'browserName': 'MicrosoftEdge', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
        'browserVersion': 'latest',
        'LT:Options': 
        {
        'platform': 'Windows 11',
        'build': 'Playwright Test Build',
        'name': 'Playwright Edge Test',
        'user': 'rajashekarkatkam61',
        'accessKey': 'LT_l9TgEDI1Ye5CEEogiChBUUJWgR5wJMjsoNHmoXI7sO0KRXw',
        'network': true,
        'video': true,
        'console': true
        }
        }
    },
]

for(const browser of browsers){
    test.describe.parallel(`Playwright Assessment - ${browser.name}`, ()=>{
        test("Scenario 1", async({})=>{

            const wsEndpoint  = `wss://cdp.lambdatest.com/playwright?capabilities=` +
                encodeURIComponent(JSON.stringify(browser.capabilities))

            const remoteBrowser = await chromium.connect(wsEndpoint)
            const context = await remoteBrowser.newContext()
            const page = await context.newPage()

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
            await context.close()
            await remoteBrowser.close()
        })

        test("Scenario 2", async ({})=>{

            // const browser  = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=
            //     ${encodeURIComponent(JSON.stringify(capabilities))}`)
            
            const wsEndpoint  = `wss://cdp.lambdatest.com/playwright?capabilities=` +
                encodeURIComponent(JSON.stringify(browser.capabilities))

            const remoteBrowser = await chromium.connect(wsEndpoint)
            const context = await remoteBrowser.newContext()
            const page = await context.newPage()

            await page.goto("https://www.lambdatest.com/selenium-playground")

            const getDragAndDropSlidersLnk = page.locator("//a[text()='Drag & Drop Sliders']")
            await getDragAndDropSlidersLnk.click()
            
            await expect(page).toHaveURL(/drag-drop-range-sliders-demo/)

            const slider = page.locator("//input[@value=15]")
            await slider.fill('75')

            await expect(slider).toHaveValue('75')

            await page.close()
            await context.close()
            await remoteBrowser.close()
        })

        test("Scenario 3", async ({})=>{

            const wsEndpoint  = `wss://cdp.lambdatest.com/playwright?capabilities=` +
                encodeURIComponent(JSON.stringify(browser.capabilities))

            const remoteBrowser = await chromium.connect(wsEndpoint)
            const context = await remoteBrowser.newContext()
            const page = await context.newPage()
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
            await context.close()
            await remoteBrowser.close()

        })
    })
}