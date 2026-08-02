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
    rl.close();
  }
});