const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Node? ', (answer) => {
  console.log(`Your answer: ${answer}.\nYeah! Go node!`);

  rl.close();
});
