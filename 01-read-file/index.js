const path = require('path');
const fs = require('fs');

// Указываем путь к файлу text.txt
const filePath = path.join(__dirname, 'text.txt');

// Создаем ReadStream из файла text.txt
const readStream = fs.createReadStream(filePath);

// Направляем поток чтения в стандартный поток вывода (консоль)
readStream.pipe(process.stdout);

// const stream = fs.createReadStream(path.join(__dirname, 'text.txt'));



readStream.on('error', (err) => console.error(err));
readStream.on('data', (chunk) => console.log(chunk.toString()));