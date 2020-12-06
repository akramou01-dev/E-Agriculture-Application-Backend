const Sequelize = require("sequelize");
const sequelize = require("../config/Database");

const CommandeOffre = sequelize.define(
  "commande-offre",
  {},
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "commande-offre",
  }
);
module.exports = CommandeOffre;
