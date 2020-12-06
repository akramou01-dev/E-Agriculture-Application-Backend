const Sequelize = require("sequelize");
const sequelize = require("../config/Database");

const Irrigation = sequelize.define(
  "irrigation",
  {
    id_irrigation: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    etat: {
      type: Sequelize.ENUM("marche", "terminé", "annulé"),
      allowNull: false,
      defaultValue: "marche",
    },
    date_debut: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    date_fin: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    id_zone: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      reference: {
        model: "zone",
        key: "id_zone",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "irrigation",
  }
);
module.exports = Irrigation;
