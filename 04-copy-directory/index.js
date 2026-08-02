const fs = require('fs');
const path = require('path');

const files = path.join(__dirname, 'files');
const filesCopy = path.join(__dirname, 'files-copy');

fs.rm(filesCopy, { recursive: true, force: true }, (err) => {
    console.log('удалено');
    fs.mkdir(filesCopy, (err) => {
        console.log('папка создана');
        copyDir(files, filesCopy);
    });
});

function copyDir(src, dest) {
    fs.readdir(src, (err, files) => {
        files.forEach(file => {
            const srcPath = path.join(src, file);
            const destPath = path.join(dest, file);

            fs.stat(srcPath, (err, stats) => {
                if (stats.isFile()) {
                    fs.copyFile(srcPath, destPath, (err) => {
                        if (err) {
                          console.log('Ошибка при копировании файла');
                        }
                    })
                } else if (stats.isDirectory()) {
                  fs.mkdir(destPath, (err) => {
                    copyDir(srcPath, destPath);
                  });
                }
            });
        })
    })
}