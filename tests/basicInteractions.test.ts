import { expect , test} from "@playwright/test";


test("Interaction with Inputs",async({page})=>{
    await page.goto("https://www.Lambdatest.com/selenium-playground/simple-form-demo")
    const msgInput =  page.locator("input#user-message")
    await msgInput.scrollIntoViewIfNeeded()
    console.log(await msgInput.getAttribute("placeholder"))
    expect(msgInput).toHaveAttribute("placeholder","Please enter your Message")
    console.log("Before entering data: "+await msgInput.inputValue())
    await msgInput.type("Hello Playwright")
    console.log("After entering data: "+await msgInput.inputValue())

})

test("Sum", async ({page})=>{

    await page.goto("https://www.Lambdatest.com/selenium-playground/simple-form-demo")
    const sum1Input = page.locator("#sum1")
    const sum2Input = page.locator("#sum2")

    const getValuesBtn = page.locator("//button[text()='Get Sum']")
    let num1 = 123
    let num2 = 234
    await sum1Input.fill(""+num1)
    await sum2Input.type(""+num2)
    await getValuesBtn.click()
    const result = page.locator("#addmessage")
    console.log(await result.textContent())
    let expectedResult = num1+num2
    expect(result).toHaveText(""+expectedResult)

})

test("checkbox", async ({page})=>{
    await page.goto("https://www.Lambdatest.com/selenium-playground/checkbox-demo")
    const singleChekbox =  page.locator("//label[text()='Click on check box']/.//input")
    expect(singleChekbox).not.toBeChecked()
    await singleChekbox.check()
    expect(singleChekbox).toBeChecked
})