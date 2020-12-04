const Sequelize = require("sequelize");
const sequelize = require("../config/Database");

const Facture = sequelize.define(
  "facture",
  {
    id_facture: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    date_de_creation: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    date_de_modification: {
      type: Sequelize.DATE,
      allowNull: true,
      comment: "null",
    },
    montant: {
      type: Sequelize.INTEGER,
      allowNull: false,
      comment: "null",
    },
    url_pdf: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    TVA: {
      type: Sequelize.INTEGER(2),
      allowNull: false,
      comment: "null",
      defaultValue: 19,
    },
    id_type_paiment: {
      // on peut l'enlever et le extracter depui le client car on a le id_client
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: true,
      reference: {
        model: "type_paiment",
        key: "id_type",
      },
    },
    id_contrat: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      reference: {
        model: "contrat",
        key: "id_contrat",
      },
    },
    timbre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "facture",
  }
);
module.exports = Facture;
