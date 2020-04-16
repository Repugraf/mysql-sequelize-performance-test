const { query } = require('./mysql-query');
const { test_table } = require('./sequelize-query');

const mysqlLabel = 'mysql-query';
const sequelizeLabel = 'sequelize-query';

const genRandStr = (length = 10) => {
  const getRandInt = (min, max) => ~~(Math.random() * (max - min + 1)) + min;
  const chars = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;
  let output = '';
  for (let i = 0; i < length; i++) output += chars[getRandInt(0, chars.length - 1)];
  return output;
}
const insertDummyData = async () => {
  for (let i = 0; i < 100; i++) {
    await query(`INSERT INTO test_table (Name) VALUES ('${genRandStr(10)}')`);
  }
}
const clearDB = async () => {
  await query('DELETE FROM test_table')
}

exports.testInsert = async () => {
  console.log('==== INSERT 100 rows (one by one) ====');
  console.time(mysqlLabel);
  for (let i = 0; i < 100; i++) {
    await query(`INSERT INTO test_table (Name) VALUES ('${genRandStr(10)}')`);
  }
  console.timeEnd(mysqlLabel);
  console.time(sequelizeLabel);
  for (let i = 0; i < 100; i++) {
    await test_table.create({ Name: genRandStr(10) });
  }
  console.timeEnd(sequelizeLabel);
  await clearDB();
  console.log('======================================');
}

exports.testSelect = async () => {
  console.log('==== SELECT 100 rows (one by one) ====');
  await insertDummyData();
  console.time(mysqlLabel);
  for (let i = 0; i < 100; i++) {
    await query(`SELECT * FROM test_table`);
  }
  console.timeEnd(mysqlLabel);
  console.time(sequelizeLabel);
  for (let i = 0; i < 100; i++) {
    await test_table.findAll({ raw: true });
  }
  console.timeEnd(sequelizeLabel);
  await clearDB();
  console.log('======================================');
}

exports.testUpdate = async () => {
  console.log('==== UPDATE 100 rows (one by one) ====');
  await insertDummyData();
  let data = await query('SELECT * FROM test_table');
  console.time(mysqlLabel);
  await Promise.all(data.map(async v => {
    await query(`UPDATE test_table SET Name = '${genRandStr(10)}' WHERE ID = ${v.ID}`);
  }));
  console.timeEnd(mysqlLabel);
  data = await query('SELECT * FROM test_table');
  console.time(sequelizeLabel);
  await Promise.all(data.map(async v => {
    await test_table.update({ Name: genRandStr(10) }, { where: { ID: v.ID } });
  }));
  console.timeEnd(sequelizeLabel);
  await clearDB();
  console.log('======================================');
}

exports.testDelete = async () => {
  console.log('==== DELETE 100 rows (one by one) ====');
  await insertDummyData();
  let data = await query('SELECT * FROM test_table');
  console.time(mysqlLabel);
  await Promise.all(data.map(async v => {
    await query(`DELETE FROM test_table WHERE ID = ${v.ID}`);
  }));
  console.timeEnd(mysqlLabel);
  await insertDummyData();
  data = await query('SELECT * FROM test_table');
  console.time(sequelizeLabel);
  await Promise.all(data.map(async v => {
    await test_table.destroy({ where: { ID: v.ID } });
  }));
  console.timeEnd(sequelizeLabel);
  await clearDB();
  console.log('======================================');
}
