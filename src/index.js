// capture screenshot of a HTML, posted to an endpoint served by express
import express from 'express';
import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import bodyParser from 'body-parser';

const app = express();
const browser = await puppeteer.launch({headless: "new"});
const template = await fs.readFile('src/template.html', 'utf8');

app.use(bodyParser.text({type:"*/*"}));

app.post('/capture', async (req, res) => {
	const page = await browser.newPage();
	page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
	let selector = req.query.selector;
	if (!selector) {
		selector = 'body';
	}
	const html = req.body;
	const contentHTML = template.replace('{{__CONTENT__}}', html);
	await page.setContent(contentHTML);
	await page.waitForNetworkIdle();
	const container = await page.$(selector);

	res.setHeader('Content-Type', 'image/png');
	res.send(await container.screenshot({ encoding: 'binary', type: 'png', optimizeForSpeed: true }));
	page.close();
});

app.listen(8282);

