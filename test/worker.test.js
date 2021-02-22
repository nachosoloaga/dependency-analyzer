const puppeteer = require('puppeteer');
const worker = require('../lib/worker');

describe('Worker tests', () => {
  let browser = {};
  let mockSite = {};
  let result = {};

  jest.setTimeout(100000);

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    mockSite = { title: 'Trello', url: 'https://www.trello.com/' };
    result = await worker.processWebsite(mockSite, browser);
    await browser.close();
  });

  test('Process HTML and return JS dependencies', () => {
    expect(result.dependencies).toContain('munchkin.js');
  });

  test('Process HTML and return title', () => {
    expect(result.title).toEqual('Trello');
  });

  test('Process HTML and return content length', () => {
    contentLength = parseInt(result.contentLength, 10);

    expect(contentLength).toBeGreaterThan(20000);
  });
});
