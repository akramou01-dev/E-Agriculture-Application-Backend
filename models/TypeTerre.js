const Sequelize = require("sequelize");
const sequelize = require("../config/Database");

const TypeTerre = sequelize.define(
  "type_terre",
  {
    id_type: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    date_creation: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    id_admin: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull : false,
      reference: {
        model: "admin",
        key: "id_admin",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "type_terre",
  }
);
module.exports = TypeTerre;
