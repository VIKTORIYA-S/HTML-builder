const fs = require('fs');
const path = require('path');

// Функция для копирования директорий
async function copyDir(src, dest) {
    await fs.promises.mkdir(dest, { recursive: true });
    const entries = await fs.promises.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            await copyDir(srcPath, destPath);
        } else {
            await fs.promises.copyFile(srcPath, destPath);
        }
    }
}

// Функция для компиляции стилей
async function compileStyles(srcDir, destFile) {
    const files = await fs.promises.readdir(srcDir, { withFileTypes: true });
    const styles = [];

    for (const file of files) {
        if (file.isFile() && path.extname(file.name) === '.css') {
            const data = await fs.promises.readFile(path.join(srcDir, file.name), 'utf8');
            styles.push(data);
        }
    }

    await fs.promises.writeFile(destFile, styles.join('\n'), 'utf8');
}

// Функция для замены тегов шаблона содержимым компонентов
async function buildHtml(templatePath, componentsDir, outputPath) {
    let template = await fs.promises.readFile(templatePath, 'utf8');
    const componentTags = template.match(/{{\s*[\w]+\s*}}/g);

    for (const tag of componentTags) {
        const componentName = tag.replace(/{{\s*|\s*}}/g, '');
        const componentPath = path.join(componentsDir, `${componentName}.html`);

        if (fs.existsSync(componentPath)) {
            const componentContent = await fs.promises.readFile(componentPath, 'utf8');
            template = template.replace(new RegExp(tag, 'g'), componentContent);
        }
    }

    await fs.promises.writeFile(outputPath, template, 'utf8');
}

// Основная функция для сборки проекта
async function buildProject() {
    const projectDist = path.join(__dirname, 'project-dist');
    const stylesDir = path.join(__dirname, 'styles');
    const assetsSrc = path.join(__dirname, 'assets');
    const assetsDest = path.join(projectDist, 'assets');
    const templatePath = path.join(__dirname, 'template.html');
    const componentsDir = path.join(__dirname, 'components');
    const outputHtml = path.join(projectDist, 'index.html');
    const outputCss = path.join(projectDist, 'style.css');

    await fs.promises.mkdir(projectDist, { recursive: true });
    await buildHtml(templatePath, componentsDir, outputHtml);
    await compileStyles(stylesDir, outputCss);
    await copyDir(assetsSrc, assetsDest);

    console.log('Проект успешно собран!');
}

buildProject().catch(err => console.error('Ошибка при сборке проекта:', err));