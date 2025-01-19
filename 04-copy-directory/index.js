const fs = require('fs');
const path = require('path');

async function copyDir(src, dest) {
    try {
        // Проверяем, существует ли целевая директория, если нет - создаем ее
        await fs.promises.mkdir(dest, { recursive: true });

        // Читаем содержимое исходной директории
        const entries = await fs.promises.readdir(src, { withFileTypes: true });

        for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);

            if (entry.isDirectory()) {
                // Рекурсивно копируем директорию
                await copyDir(srcPath, destPath);
            } else {
                // Копируем файл
                await fs.promises.copyFile(srcPath, destPath);
            }
        }

        console.log(`Папка ${dest} успешно скопирована из ${src}`);
    } catch (error) {
        console.error('Ошибка при копировании директории:', error);
    }
}

const srcDir = path.join(__dirname, 'files');
const destDir = path.join(__dirname, 'files-copy');

copyDir(srcDir, destDir);