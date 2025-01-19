const fs = require('fs');
const path = require('path');

async function compileStyles(srcDir, destFile) {
    try {
        const files = await fs.promises.readdir(srcDir, { withFileTypes: true });
        const styles = [];

        for (const file of files) {
            const filePath = path.join(srcDir, file.name);

            if (file.isFile() && path.extname(file.name) === '.css') {
                const data = await fs.promises.readFile(filePath, 'utf8');
                styles.push(data);
            }
        }

        await fs.promises.writeFile(destFile, styles.join('\n'), 'utf8');
        console.log(`Стили успешно скомпилированы в ${destFile}`);
    } catch (error) {
        console.error('Ошибка при компиляции стилей:', error);
    }
}

const srcDir = path.join(__dirname, 'styles');
const destDir = path.join(__dirname, 'project-dist');
const destFile = path.join(destDir, 'bundle.css');

async function setupAndCompileStyles() {
    try {
        await fs.promises.mkdir(destDir, { recursive: true });
        await compileStyles(srcDir, destFile);
    } catch (error) {
        console.error('Ошибка при создании директории или компиляции стилей:', error);
    }
}

setupAndCompileStyles();
