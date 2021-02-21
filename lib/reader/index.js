const csv = require('csv-parser');
const fs = require('fs');

const reader = {};

reader.readCsv = () =>
  new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream('./lib/reader/websites.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results);
      })
      .on('error', reject);
  });

module.exports = reader;
