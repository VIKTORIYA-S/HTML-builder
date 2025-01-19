const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const filePath = path.join(__dirname, 'output.txt');


// Функция для проверки разрешений на запись (без удаления файла)
function checkWritePermission() {
    fs.access(filePath, fs.constants.W_OK, (err) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.log('Файл не существует, создадим его для проверки разрешений.');
                fs.writeFile(filePath, 'test', (err) => {
                    if (err) {
                        console.error('Ошибка при создании файла. Вероятно, нет разрешения на запись в эту директорию:', err);
                    } else {
                        console.log('Файл создан успешно. У вас есть разрешение на запись в эту директорию.');
                        // // Удаляем тестовый файл после проверки
                        // fs.unlink(filePath, (err) => {
                        //     if (err) { console.error('Ошибка при удалении тестового файла:', err);
                        //     } else {
                        //         console.log('Тестовый файл успешно удален.');
                        //     }
                        // });
                    }
                });
                } else {
                    console.error('Нет разрешения на запись в эту директорию:', err);
                }
            } else {
                console.log('У вас есть разрешение на запись в эту директорию.');
            }
        });
    } // Проверяем разрешения на запись checkWritePermission();
    checkWritePermission();




function promptUser() {
    rl.question('Пожалуйста, введите текст для записи в файл (или введите "exit" для выхода): ', (input) => {
        if (input.toLowerCase() === 'exit') {
            console.log('До свидания! Хорошего дня!');
            rl.close();
        } else {
            fs.appendFile(filePath, input + '\n', (err) => {
                if (err) {
                    console.error('Ошибка при записи в файл:', err);
                } else {
                    console.log('Текст успешно добавлен в файл output.txt');
                }
                promptUser();
            });
        }
    });
}

rl.on('close', () => {
    console.log('Прощай! Всего наилучшего!');
    process.exit(0);
});

console.log('Привет! Добро пожаловать. Это программа для записи текста в файл.');
promptUser();
