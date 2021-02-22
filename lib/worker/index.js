const jsFileRegex = /\w*\.js/i;

const getJsDependencies = (scripts) => {
  const dependencies = [];
  scripts.forEach((script) => {
    if (script.indexOf('.js') !== -1) {
      const dependency = jsFileRegex.exec(script);

      if (dependency != null && !dependencies.includes(dependency[0])) {
        dependencies.push(dependency[0]);
      }
    }
  });

  return dependencies;
};

const processWebsite = async (site, browser) => {
  const page = await browser.newPage();

  const result = {};

  await page.goto(site.url);

  result.title = site.title;

  /* Calculate content length of HTML content */
  const content = await page.content();
  result.contentLength = Buffer.byteLength(content, 'utf8');

  /* Get all script tags from HTML */
  const scriptTags = await page.evaluate(() => {
    const scripts = document.querySelectorAll('script');
    return Array.from(scripts).map((v) => v.src);
  });

  result.dependencies = getJsDependencies(scriptTags);

  return result;
};

module.exports = {
  getJsDependencies,
  processWebsite,
};
