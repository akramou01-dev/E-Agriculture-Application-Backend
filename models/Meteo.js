const Sequelize = require("sequelize");
const sequelize = require("../config/Database");

const Meteo = sequelize.define(
  "meteo",
  {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    pluie: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    humidité: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "meteo",
  }
);
module.exports = Meteo;
