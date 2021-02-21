const reader = require('../lib/reader');

test('Read a CSV with websites and return title', async () => {
  const realResult = await reader.readCsv('./test/test.csv');

  expect(realResult[0].title).toBe('La Nacion');
});

test('Read a CSV with websites and return url', async () => {
  const realResult = await reader.readCsv('./test/test.csv');

  expect(realResult[1].url).toBe('https://www.youtube.com/');
});
