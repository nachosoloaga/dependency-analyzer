const worker = {};

worker.getJsDependencies = (scripts) => {
  const dependencies = [];
  scripts.forEach((script) => {
    if (script.indexOf('.js') !== -1) {
      const dependency = /\w*\.js/i.exec(script);

      if (dependency != null && !dependencies.includes(dependency[0])) {
        dependencies.push(dependency[0]);
      }
    }
  });

  return dependencies;
};

worker.processWebsite = async (site, browser) => {
  const page = await browser.newPage();

  const result = {};

  await page.goto(site.url);

  result.title = site.title;

  /* Se calcula el peso */
  const content = await page.content();
  result.contentLength = Buffer.byteLength(content, 'utf8');

  /* Se agarran tags script */
  const scriptTags = await page.evaluate(() => {
    const scripts = document.querySelectorAll('script');
    return Array.from(scripts).map((v) => v.src);
  });

  result.dependencies = worker.getJsDependencies(scriptTags);

  return result;
};

module.exports = worker;
