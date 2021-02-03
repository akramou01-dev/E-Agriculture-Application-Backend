const Sequelize = require("sequelize");
const sequelize = require("../config/Database");
const Capteur = sequelize.define(
  "capteur",
  {
    id_capteur: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    etat: {
      type: Sequelize.ENUM("activé", "désactivé"),
      allowNull: false,
    },
    id_zone: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      reference: {
        model: "Zone",
        key: "id_zone",
      },
    },
    id_type: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      reference: {
        model: "capteurSys",
        key: "id_capteur",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "capteur",
  }
);

module.exports = Capteur;
