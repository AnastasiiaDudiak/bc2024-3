const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
    .version('1.0.0')
    .description('Приклад програми з Commander.js')
    .requiredOption('-i, --input <path>', 'Шлях до файлу для читання')
    .option('-o, --output <path>', 'Шлях до файлу для запису результату')
    .option('-d, --display', 'Вивести результат у консоль')
    .parse(process.argv);

const options = program.opts();

// Перевірка на обов'язковий параметр
if (!options.input) {
    console.error('Please, specify input file');
    process.exit(1);
}

let jsonData;
try {
    // Читання файлу синхронно
    const data = fs.readFileSync(options.input, 'utf8');
    jsonData = JSON.parse(data);
} catch (err) {
    console.error('Cannot find input file');
    process.exit(1);
}

// Логіка для знаходження активу з найменшим значенням
let minAsset = null;

jsonData.forEach(asset => {
    if (minAsset === null || asset.value < minAsset.value) {
        minAsset = asset;
    }
});

// Формат виводу
const result = `${minAsset.name}: ${minAsset.value}`;

if (options.display) {
    console.log(result);
}

// Запис у файл, якщо вказано
if (options.output) {
    try {
        fs.writeFileSync(options.output, result);
        console.log(`Результат записано в файл: ${options.output}`);
    } catch (err) {
        console.error('Error writing to output file');
        process.exit(1);
    }
}

