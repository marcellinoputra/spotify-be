const { DataTypes } = require('sequelize');
const connectionDatabase = require('../database/database');

const Music = connectionDatabase.sequelize.define(
  'Music',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    song: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    liked: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'music',
  }
);

module.exports = {
  Music,
};
