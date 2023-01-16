const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  host: 'localhost',
  username: 'root',
  database: 'spotify',
  dialect: 'mysql',
  define: {
    freezeTableName: true,
    timestamps: false,
  },
});

module.exports = {
  sequelize,
};
