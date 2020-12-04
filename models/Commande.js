const Sequelize = require("sequelize");
const sequelize = require("../config/Database");

const Commande = sequelize.define(
  "commande",
  {
    id_commande: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    date_creation: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    date_confirmation: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    date_annulation: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    etat: {
      type: Sequelize.ENUM("en_attente", "confirmée", "annulée"),
      allowNull: false,
      defaultValue: "en_attente",
    },
    url_pdf: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    id_client: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      reference: {
        model: "client",
        key: "id_client",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "commande",
  }
);
module.exports = Commande;
