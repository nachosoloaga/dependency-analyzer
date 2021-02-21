import puppeteer from 'puppeteer';

const worker = {};

worker.getJsDependencies = (scripts) => {
  const dependencies = [];
  scripts.forEach((script) => {
    if (script.indexOf('.js') !== -1) {
      const dependency = /\/\w*\.js/i.exec(script);

      if (dependency != null && !dependencies.includes(dependency[0])) {
        dependencies.push(dependency[0]);
      }
    }
  });

  return dependencies;
};

worker.processWebsite = async (site) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const result = {};

  await page.goto(site.url);

  result.title = site.title;

  /* Se calcula el peso */
  result.content_length = await page
    .content()
    .then((response) => Buffer.byteLength(response, 'utf8'));

  /* Se agarran tags script */
  const scriptTags = await page.evaluate(() => {
    const scripts = document.querySelectorAll('script');
    const sources = Array.from(scripts).map((v) => v.src);

    return sources;
  });

  result.dependencies = app.getJsDependencies(scriptTags);

  await browser.close();

  return result;
};

export default worker;
