const Sequelize = require("sequelize");
const sequelize = require("../config/Database");

const CommandeOffre = sequelize.define(
  "commande-offre",
  {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    id_offre: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      reference: {
        model: "offre",
        key: "id_offre",
      },
    },
    id_commande: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      reference: {
        model: "commande",
        key: "id_commande",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "commande-offre",
  }
);
module.exports = CommandeOffre;
