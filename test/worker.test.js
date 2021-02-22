const puppeteer = require('puppeteer');
const worker = require('../lib/worker');

describe('Worker tests', () => {
  let browser = {};
  let mockSite = {};
  let result = {};

  beforeAll(async () => {
    jest.setTimeout(100000);

    browser = await puppeteer.launch({ headless: true });
    mockSite = { title: 'Trello', url: 'https://www.trello.com/' };
    result = await worker.processWebsite(mockSite, browser);
    await browser.close();
  });

  test('Process HTML and return JS dependencies', async () => {
    expect(result.dependencies).toContain('munchkin.js');
  });

  test('Process HTML and return title', async () => {
    expect(result.title).toEqual('Trello');
  });

  test('Process HTML and return content length', async () => {
    contentLength = parseInt(result.contentLength, 10);

    expect(contentLength).toBeGreaterThan(20000);
  });
});
