// Distributed hash table using node and express

const express = require('express');
const hashTable = require('./hash-table');

const table = new hashTable();

const app = express();

app.get('/search', (req, res) => {
  let key = req.query.key;

  let value = table.get(key);

  if (value === undefined) {
    console.log('Couldn\'t find it!');
    return res.send('Couldn\'t find it!');
  }

  console.log(`Value = ${value}`);

  return res.send(value + '\n');
});

app.get('/post', (req, res) => {
  let key = req.query.key;
  let value = req.query.value;
  
  const position = table.put(key, value);

  console.log('Added!');
  res.send(`Added @ ${position} \n`);
});

app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
  console.log(`Server listening on ${server.address().port}...`);
})
