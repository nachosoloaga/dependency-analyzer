import csv from 'csv-parser';
import fs from 'fs';

const reader = {};

reader.readCsv = () =>
  new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream('websites.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results);
      })
      .on('error', reject);
  });

export default reader;
