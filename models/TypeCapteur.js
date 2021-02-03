const Sequelize = require("sequelize");
const sequelize = require("../config/Database");
const Capteur = sequelize.define(
  "type_capteur",
  {
    id_type: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
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
    tableName: "type_capteur",
  }
);

module.exports = Capteur;
