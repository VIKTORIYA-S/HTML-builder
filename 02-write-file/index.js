const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'output.txt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Введите текст (для выхода наберите exit):');

rl.on('line', (input) => {
    if (input === 'exit') {
      console.log('Работа завершена');
      rl.close();
    } else {
      fs.appendFile(filePath, input + '\n', (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
});

rl.on('SIGINT', () => {
      console.log('Работа завершена');
      rl.close();
}
);
