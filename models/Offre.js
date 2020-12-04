const Sequelize = require("sequelize");
const sequelize = require("../config/Database");

const Offre = sequelize.define(
  "offre",
  {
    id_offre: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    titre: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    prix: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    durée: {
      // en année
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    date_creation: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    date_modification: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    etat: {
      type: Sequelize.ENUM("valide", "expiré"),
      allowNull: false,
      defaultValue: "valide",
    },
    date_expiration: {
      // au cas ou aura des offres momentatné (genre il reste que 2 fois et il seront expiré)
      type: Sequelize.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "offre",
  }
);
module.exports = offre;
