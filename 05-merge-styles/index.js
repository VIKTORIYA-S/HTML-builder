const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const distDir = path.join(__dirname, 'project-dist');

const bundlePath = path.join(distDir, 'bundle.css');

fs.mkdir(distDir, { recursive: true }, (err) => {
    fs.rm(bundlePath, { force: true }, (err) => {
      const writeStream = fs.createWriteStream(bundlePath, { flag: 'a' });
      fs.readdir(stylesDir, (err, files) => {
        files.forEach((file) => {
          if (path.extname(file) === '.css') {
            fs.createReadStream(path.join(stylesDir, file)).pipe(writeStream);
          }
        });
      });
    });
});