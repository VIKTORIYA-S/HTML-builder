const fs = require('fs');
const path = require('path');
const secretFolder = path.join(__dirname, 'secret-folder');

fs.readdir(secretFolder, (err, files) => {
    files.forEach(file => {
        const filePath = path.join(secretFolder, file);
        fs.stat(filePath, (err, stats) => {
            if (stats.isFile()) {
                const parsedFile = path.parse(file);
                console.log(`${parsedFile.name} - ${parsedFile.ext.slice(1)} - ${stats.size / 1024}kb`);
            }
        });
    });
});


