const Sequelize = require("sequelize");
const sequelize = require("../config/Database");
const CapteurSys = sequelize.define(
  "capteur_sys",
  {
    id_capteur: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    nom: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    id_type: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      reference: {
        model: "type_capteur",
        key: "id_type",
      },
    },
    id_admin: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      reference: {
        model: "admin",
        key: "id_admin",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "capteur_sys",
  }
);

module.exports = CapteurSys;
