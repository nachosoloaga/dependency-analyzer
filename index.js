require('dotenv').config();

const puppeteer = require('puppeteer');
const reader = require('./lib/reader');
const worker = require('./lib/worker');

const cli = {};

cli.processWebsites = async () => {
  const websites = await reader.readCsv(process.env.EXAMPLE_CSV_PATH);
  const browser = await puppeteer.launch({ headless: true });

  const result = await Promise.all(websites.map((site) => worker.processWebsite(site, browser)));

  await browser.close();

  return result;
};

cli.dependencies = (results) => {
  results.map((site) => {
    site.dependencies.map((d) => console.log(`${site.title} , ${d}`));
    return null;
  });
};

cli.contentLength = (results) => {
  results.map((site) => {
    console.log(`${site.title}, ${site.content_length}`);
    return null;
  });
};

cli.totalDependencies = (results) => {
  const counter = {};
  results.forEach((result) => {
    result.dependencies.forEach((d) => {
      if (d in counter) {
        counter[d] += 1;
      } else {
        counter[d] = 1;
      }
    });
  });

  Object.keys(counter).forEach((key) => {
    console.log(`${key}, ${counter[key]}`);
  });
};

cli.start = async () => {
  if (!process.argv[2]) {
    console.log(
      'Please indicate a task (--dependencies, --contentLength, --totalDependencies, --all)'
    );

    return;
  }

  const results = await cli.processWebsites();

  switch (process.argv[2]) {
    case '--dependencies':
      cli.dependencies(results);
      break;
    case '--contentLength':
      cli.contentLength(results);
      break;
    case '--totalDependencies':
      cli.totalDependencies(results);
      break;
    default:
      console.log('Unknown parameter');
  }
};

cli.start();
