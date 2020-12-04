const Sequelize = require("sequelize");
const sequelize = require("../config/Database");

const Pompe = sequelize.define(
  "pompe",
  {
    id_pompe: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    etat: {
      type: Sequelize.ENUM("marche", "arret"),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "pompe",
  }
);
module.exports = Pompe;
