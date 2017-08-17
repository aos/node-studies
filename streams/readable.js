const { Readable, Writable } = require('stream');

class Counter extends Readable {
  constructor(options) {
    super(options);
    this._max = 1000000;
    this._index = 1;
  }

  _read() {
    const i = this._index++;
    if (i > this._max) {
      this.push(null);
    }
    else {
      const str = '' + i;
      const buf = Buffer.from(str, 'ascii');
      this.push(buf);
    }
  }
}

const myCounter = new Counter();

class MyWritable extends Writable {
  constructor(options) {
    super(options);
  }

  _write(chunk, encoding, callback) {
    if (chunk.toString().indexOf('a') >= 0) {
      callback(new Error('chunk is invalid'));
    }
    else {
      callback();
    }
  }
}
