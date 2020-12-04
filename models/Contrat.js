const Sequelize = require("sequelize");
const { Serializer } = require("v8");
const sequelize = require("../config/Database");

const Contrat = sequelize.define(
  "contrat",
  {
    id_contrat: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    etat: {
      type: Sequelize.ENUM("en_attente", "validée"),
      allowNull: false,
      defaultValue: "en_attente",
    },
    date_debut: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: "en_attente",
    },
    date_fin: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: "en_attente",
    },
    url_pdf: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    // id_commande: {
    //   type: Sequelize.INTEGER.UNSIGNED,
    //   allowNull : false,
    //   reference: {
    //     model: "commande",
    //     key: "id_commande",
    //   },
    // },
    id_offre: {
      type: Sequelize.INTEGER.UNSIGNED,
      reference: {
        model: "offre",
        key: "id_offre",
      },
    },
    id_client: {
      type: Sequelize.INTEGER.UNSIGNED,
      reference: {
        model: "client",
        key: "id_client",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "contrat",
  }
);
module.exports = Contrat;
