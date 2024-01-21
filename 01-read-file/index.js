const path = require('path');

const fs = require('fs');

const stream = fs.createReadStream(path.join(__dirname, 'text.txt'));

stream.on('error', (err) => {console.error(`${err}`);});
stream.on('data', (chunk) => console.log(chunk.toString()));
