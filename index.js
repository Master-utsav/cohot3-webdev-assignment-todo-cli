const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
  .name('counter')
  .description('CLI to do file-based tasks')
  .version('0.8.0');

// `count` command
program.command('count')
  .description('Count the number of words in a file')
  .argument('<file>', 'The file to count')
  .action((file) => {
    countWords(file);
  });

// defualt call
program
  .arguments('<file>')
  .action((file) => {
    countWords(file);
  });

function countWords(file){
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const lines = data.split('\n').length;
        console.log(`There are ${lines} lines in ${file}`);
      }
    });
  }

program.parse(process.argv);
