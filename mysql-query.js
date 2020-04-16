const mysql = require('mysql2');

const pool = mysql.createPool(require('./config'));

exports.query = (q, ...args) => new Promise((resolve, reject) => {
  pool.query(q, ...args, (err, val) => {
    if (err) reject(err)
    resolve(val)
  })
});
