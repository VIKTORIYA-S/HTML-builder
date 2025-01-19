const fs = require('fs');
const path = require('path');

// Указываем путь к папке secret-folder
const folderPath = path.join(__dirname, 'secret-folder');

// Функция для получения информации о файлах
function getFilesInfo() {
    fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
        if (err) {
            return console.error('Ошибка при чтении содержимого папки:', err);
        }

        files.forEach(file => {
            if (file.isFile()) {
                const filePath = path.join(folderPath, file.name);

                fs.stat(filePath, (err, stats) => {
                    if (err) {
                        return console.error('Ошибка при получении информации о файле:', err);
                    }

                    const fileSize = (stats.size / 1024).toFixed(2); // размер файла в килобайтах
                    const extName = path.extname(file.name);
                    const baseName = path.basename(file.name, extName);
                    console.log(`${baseName} - ${extName.slice(1)} - ${fileSize}kb`);
                });
            } else {
                console.error(`${file.name} является каталогом. Ожидаются только файлы.`);
            }
        });
    });
}

getFilesInfo();
