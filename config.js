module.exports = {
  host: process.env._HOST || 'localhost',
  user: process.env._USER || 'root',
  database: process.env._DATABASE || 'test_db',
  password: process.env._PASSWORD || 'password',
  port: process.env._PORT || 3306,
}
