const puppeteer = require("puppeteer")



const func = async () => { 
    const browser = await puppeteer.launch({ headless: false }); const page = await browser.newPage()
    await page.goto("https://www.goodcar.com")
    await page.evaluate(() => {
        const items = document.querySelectorAll(".radio-item")
        items[1].click()
    })
    await page.waitForSelector("#searchplateform-state")
    await page.type("input#search-platemain", "THG7527")
    await page.evaluate(() => {
        const stateInput = document.querySelector("#searchplateform-state")
        stateInput.value = "VA"
        const buttons = Array.from(document.querySelectorAll("button")).filter(item => item.textContent.toLocaleLowerCase().includes("search"))
        buttons[1].click()
    })
    await page.waitForNetworkIdle()
    const html = await page.evaluate(() => {
        return document.body.innerHTML
    })
    console.log(html)

}

func()