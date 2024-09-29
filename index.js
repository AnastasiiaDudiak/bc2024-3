const { Command } = require('commander');
const program = new Command();

program
    .version('1.0.0')
    .description('Приклад програми з Commander.js')
    .option('-n, --name <type>', 'Ваше ім’я')
    .parse(process.argv);

const options = program.opts();
if (options.name) {
    console.log(`Привіт, ${options.name}!`);
}
