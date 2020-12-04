const Sequelize = require("sequelize");
const sequelize = require("../config/Database");

const TypePaiment = sequelize.define(
  "type_paiment",
  {
    id_type: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "type_paiment",
  }
);
module.exports = TypePaiment;
