const fs = require('fs');
const { program } = require('commander');

// Налаштування командного рядка
program
    .requiredOption('-i, --input <path>', 'шлях до файлу для читання')
    .option('-o, --output <path>', 'шлях до файлу для запису')
    .option('-d, --display', 'вивести результат у консоль');

program.parse(process.argv);
const options = program.opts();

// Перевірка наявності вхідного файлу
if (!options.input) {
    console.error("Please, specify input file");
    process.exit(1);
}

// Читання даних з файлу
let jsonData;
try {
    const data = fs.readFileSync(options.input);
    jsonData = JSON.parse(data);
} catch (err) {
    console.error("Cannot find input file");
    process.exit(1);
}

// Логіка для знаходження активу з найменшим значенням
let minAsset = null;

jsonData.forEach(asset => {
    if (asset.value > 0 && (minAsset === null || asset.value < minAsset.value)) {
        minAsset = asset;
    }
});

// Формат виводу
if (minAsset) {
    const result = `${minAsset.txt}: ${minAsset.value}`;

    // Виведення результату у консоль, якщо задано параметр -d
    if (options.display) {
        console.log(result);
    }

    // Запис у файл, якщо задано параметр -o
    if (options.output) {
        try {
            fs.writeFileSync(options.output, result);
            console.log(`Результат записаний у файл: ${options.output}`);
        } catch (err) {
            console.error('Помилка запису у вихідний файл');
        }
    }
} else {
    console.log("Не знайдено активів з позитивними значеннями.");
}

