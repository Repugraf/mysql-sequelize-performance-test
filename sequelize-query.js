const Sequelize = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.database, config.user, config.password, {
  user: config.user,
  host: config.host,
  dialect: 'mysql',
  logging: false
});

class test_table extends Sequelize.Model { }
test_table.init({
  ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  Name: {
    type: Sequelize.STRING(280)
  }
}, { sequelize, modelName: 'test_table', tableName: 'test_table', timestamps: false });

module.exports = {
  sequelize,
  test_table
}
