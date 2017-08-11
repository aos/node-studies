// Distributed hash table using node and express

const express = require('express');
const hashTable = require('./hash-table');

const table = new hashTable();

const app = express();

app.get('/search', (req, res) => {
  let key = req.query.key;

  let value = table.get(key);

  if (value === undefined) {
    console.log('Could not find it!');
    return res.send('Sorry, couldn\'t find it!');
  }

  console.log(`Value = ${value}`);

  return res.send(value);
});

app.get('/post', (req, res) => {
  let key = req.query.key;
  let value = req.query.value;
  
  table.put(key, value);

  console.log('Added!');
  res.send('Added!');
});

app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
  console.log(`Server listening on ${server.address().port}...`);
})
