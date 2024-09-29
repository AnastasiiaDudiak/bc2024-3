const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
    .version('1.0.0')
    .description('Програма для обробки даних з JSON')
    .option('-i, --input <path>', 'Шлях до файлу для читання (обов\'язковий)')
    .option('-o, --output <path>', 'Шлях до файлу для запису (необов\'язковий)')
    .option('-d, --display', 'Вивести результат у консоль (необов\'язковий)')
    .parse(process.argv);

const options = program.opts();

// Перевірка наявності обов'язкового параметра
if (!options.input) {
    console.error('Please, specify input file');
    process.exit(1);
}

// Читання JSON
let jsonData;
try {
    const data = fs.readFileSync(options.input);
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
if (minAsset) {
    const result = `${minAsset.name}: ${minAsset.value}`;

    if (options.display) {
        console.log(result);
    }

    if (options.output) {
        try {
            fs.writeFileSync(options.output, result);
            console.log(`Результат записаний у файл: ${options.output}`);
        } catch (err) {
            console.error('Помилка запису у вихідний файл');
        }
    }
} else {
    console.log('Не вдалося знайти активи');
}


