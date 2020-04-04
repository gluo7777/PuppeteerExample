'use strict';

const puppeteer = require('puppeteer');

async function takeScreenshot() {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www.amazon.com');
        console.log(`Title: ${await page.title()}`);
        await page.screenshot({ path: 'screenshots/amazon.png' });
        await page.pdf({ path: 'documents/amazon.pdf' });
        await browser.close()
    } catch (error) {
        console.error(`Failed to take screenshot: ${error}`)
    }
}

async function deals(categories) {
    const browser = await puppeteer.launch({
        ignoreDefaultArgs:['--headless']
    });
    try {
        const page = await browser.newPage();
        await page.goto('https://www.amazon.com/gp/goldbox');

        await page.waitForXPath("//div[contains(.,'Amazon Devices')]", {timeout: 30000});
        let [div] = await page.$x("//div[contains(.,'Amazon Devices')]")
        if(div){
            let check = await div.$('label input');
            await check.click();
            await page.waitForNavigation({timeout: 30000});
            console.log(page.url())
        }

        await page.waitForXPath("//a[contains(.,'Lightning Deals')]", {timeout: 30000});
        let [a] = await page.$x("//a[contains(.,'Lightning Deals')]");
        if(a){
            await a.click();
            await page.waitForNavigation({timeout: 30000});
            console.log(page.url())
        }

    } catch (error) {
        console.error(error);
    } finally {
        await browser.close()
    }
}

async function isMatchingCategory(checkbox, categories) {
    try {
        let span = await checkbox.$('label span');
        let text = await span.evaluate(node => node.textContent) || '';
        text = text.trim();
        console.log(`Found category ${text}`);
        return categories.indexOf(text) !== -1;
    } catch (e) { console.error(e); return false; }
}

// takeScreenshot();
deals("Computers and Accessories");