const fs = require('fs');
const path = require('path');
const componentsFolderPath = path.join(__dirname, 'components');
const templateFilePath = path.join(__dirname, 'template.html');
const projectDistFolderPath = path.join(__dirname, 'project-dist');
const indexFilePath = path.join(projectDistFolderPath, 'index.html');
const stylesFolderPath = path.join(__dirname, 'styles');
const stylesFilePath = path.join(projectDistFolderPath, 'style.css');
const assetsFolderPath = path.join(__dirname, 'assets');
const assetsCopyFolderPath = path.join(projectDistFolderPath, 'assets');

fs.mkdir(projectDistFolderPath, { recursive: true }, (err) => {
  fs.readFile(templateFilePath, 'utf-8', (err, data) => {
    const template = data.match(/{{\s*([\w-]+)\s*}}/g);
    let html = data;
    let processedCount = 0;
    const componentNames = template.map((item) => {
      return item.replace(/{{\s*|\s*}}/g, '');
    });
    componentNames.forEach((name) => {
      const componentFilePath = path.join(componentsFolderPath, `${name}.html`);
      fs.readFile(componentFilePath, 'utf-8', (err, componentContent) => {
        html = html.replaceAll(`{{${name}}}`, componentContent);
        processedCount++;
        if (processedCount === componentNames.length) {
          fs.writeFile(indexFilePath, html, (err) => {
          });
        }
      });
    });

      fs.rm(stylesFilePath, { force: true }, (err) => {
        const writeStream = fs.createWriteStream(stylesFilePath, {
          flag: 'a',
        });
        fs.readdir(stylesFolderPath, (err, files) => {
          const cssFiles = files.filter(
            (file) => path.extname(file) === '.css',
          );

          function copyNextFile(index) {
            if (index >= cssFiles.length) {
              return;
            }
            const file = cssFiles[index];
            const readStream = fs.createReadStream(
              path.join(stylesFolderPath, file),
            );
            readStream.pipe(writeStream, { end: false });
            readStream.on('end', () => {
              copyNextFile(index + 1);
            });
          }
          copyNextFile(0);
        });
      });

      function copyDir(src, dest) {
        fs.readdir(src, (err, files) => {
          files.forEach((file) => {
            const srcPath = path.join(src, file);
            const destPath = path.join(dest, file);

            fs.stat(srcPath, (err, stats) => {
              if (stats.isFile()) {
                fs.copyFile(srcPath, destPath, (err) => {
                  if (err) {
                  }
                });
              } else if (stats.isDirectory()) {
                fs.mkdir(destPath, (err) => {
                  copyDir(srcPath, destPath);
                });
              }
            });
          });
        });
        }

        fs.mkdir(assetsCopyFolderPath, (err) => {
        copyDir(assetsFolderPath, assetsCopyFolderPath);
  });
});
});
