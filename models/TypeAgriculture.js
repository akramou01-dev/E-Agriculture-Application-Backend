const Sequelize = require("sequelize");
const sequelize = require("../config/Database");
const TypeAgriculture = sequelize.define(
  "type_agriculture",
  {
    id_type: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true,
    },
    type: {
      type: Sequelize.STRING(45),
      allowNull: false,
      comment: "null",
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "type_agriculture",
  }
);
module.exports = TypeAgriculture;
