const csv = require('csv-parser');
const fs = require('fs');

const readCsv = (csvPath) =>
  new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results);
      })
      .on('error', reject);
  });

module.exports = {
  readCsv,
};
