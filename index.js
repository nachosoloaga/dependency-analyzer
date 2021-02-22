require('dotenv').config();

const puppeteer = require('puppeteer');
const program = require('commander');
const packageJS = require('./package.json');
const reader = require('./lib/reader');
const worker = require('./lib/worker');

program
  .version(packageJS.version)
  .option('--dependencies', 'Log all JS dependencies of each website')
  .option(
    '--total-dependencies',
    'Log the number of occurrences of each JS dependency among all websites'
  )
  .option('--content-length', 'Log the content length in bytes of each website')
  .option(
    '--csv-path <path>',
    'Indicates a path to the desired CSV. If not present, example CSV is used by default',
    process.env.EXAMPLE_CSV_PATH
  )
  .parse(process.argv);

const processWebsites = async (csvPath) => {
  const websites = await reader.readCsv(csvPath);
  const browser = await puppeteer.launch({ headless: true });

  const result = await Promise.all(websites.map((site) => worker.processWebsite(site, browser)));

  await browser.close();

  return result;
};

const dependencies = (results) => {
  results.map((site) => {
    site.dependencies.map((d) => console.log(`${site.title} , ${d}`));
    return null;
  });
};

const contentLength = (results) => {
  results.map((site) => {
    console.log(`${site.title}, ${site.content_length}`);
    return null;
  });
};

const totalDependencies = (results) => {
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

const start = async () => {
  const options = program.opts();

  let results;
  if (options.dependencies || options.totalDependencies || options.contentLength) {
    results = await processWebsites(options.csvPath);
  } else {
    console.log('Use --help command to see all available params');
  }

  console.log(options.csvPath);

  if (options.dependencies) dependencies(results);
  if (options.totalDependencies) totalDependencies(results);
  if (options.contentLength) contentLength(results);
};

start();
