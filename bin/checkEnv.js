
// verifies that the .env file contains all the keys in .example.env

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

function getKeys(fileName) {
  try {
    return Object.keys(dotenv.parse(fs.readFileSync(fileName)));
  } catch {
    console.log(`Your ${fileName} file does not exist or is incorrectly formatted.\n`);
    process.exit(1);
  }
}

const envKeys = getKeys(path.resolve(__dirname, '../src/.env')),
  exampleKeys = getKeys(path.resolve(__dirname, '../src/.example.env')),
  missingKeys = exampleKeys.filter(key => !envKeys.includes(key));

if (missingKeys.length > 0) {
  console.error('You are missing these keys in your .env file:', missingKeys, '\n');
  process.exit(1);
}
