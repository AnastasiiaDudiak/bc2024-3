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

// Читання файлу
fs.readFile(options.input, 'utf8', (err, data) => {
    if (err) {
        console.error('Cannot find input file');
        process.exit(1);
    }

    // Тут ти можеш обробити дані JSON
    const jsonData = JSON.parse(data);

    // Виведення результату
    if (options.display) {
        console.log(jsonData);
    }

    // Запис у файл, якщо вказано
    if (options.output) {
        fs.writeFile(options.output, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error('Error writing to output file');
                process.exit(1);
            }
            console.log(`Результат записано в файл: ${options.output}`);
        });
    }
});
