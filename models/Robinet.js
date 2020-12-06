const Sequelize = require("sequelize");
const sequelize = require("../config/Database");

const Robinet = sequelize.define(
  "robinet",
  {
    id_robinet: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    etat: {
      type: Sequelize.ENUM("ouvert", "fermé"),
      allowNull: false,
    },
    id_zone: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      reference: {
        model: "zone",
        key: "id_zone",
      },
    },
    id_pompe: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      reference: {
        model: "pompe",
        key: "id_pompe",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "robinet",
  }
);
module.exports = Robinet;
