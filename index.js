require('dotenv').config();
const { sequelize } = require('./sequelize-query');
const { testInsert, testSelect, testUpdate, testDelete } = require('./tests');

async function main() {
  try {
    await sequelize.sync();
    await testInsert();
    await testSelect();
    await testUpdate();
    await testDelete();
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

main();
