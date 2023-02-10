const { Builder, By, Key, until, Keys } = require('selenium-webdriver');
const assert = require('assert');

(async function runTest() {
    let driver = await new Builder().forBrowser("chrome").build();
    driver.manage().setTimeouts( { implicit: 10000 })

    try {
        await driver.get("https://search.yahoo.com/");
        let title = await driver.getTitle()
        assert.equal(title, "Yahoo Search - Web Search")

        let element = await driver.findElement(By.id('yschsp'))
        await element.sendKeys("Soundcloud Astroplant The Lightning", Key.ENTER);
        await driver.findElement(By.xpath('//*[@id="web"]/ol/li[1]/div/div[1]/h3/a')).click();

        let handles = await driver.getAllWindowHandles();
        await driver.switchTo().window(handles[1]);

        await driver.findElement(By.id('onetrust-pc-btn-handler')).click()
        await driver.findElement(By.className('save-preference-btn-handler onetrust-close-btn-handler')).click();

        title = await driver.getTitle();
        // assert.equal(title, 'The Lightning by ▲ Astroplant ▽');

        element = driver.findElement(By.xpath('//*[@id="content"]/div/div[3]/div[2]/div[1]/article[7]/div[2]/div/a[1]'));
        await driver.executeScript('arguments[0].scrollIntoView()', element)
        assert(element.isDisplayed());
        await element.click();

        handles = await driver.getAllWindowHandles();
        await driver.switchTo().window(handles[2]);
        
        element = driver.findElement(By.id('globalnav-menubutton-link-search'));
        await element.click()
        element = await driver.findElement(By.className("globalnav-searchfield-input"))
        await element.sendKeys("Searching box to check");
        assert.equal(await element.getAttribute("value"), "Searching box to check");
        
    } catch (error) {
        console.log(error);
    }
    finally {
        // await driver.quit();
    }
})();