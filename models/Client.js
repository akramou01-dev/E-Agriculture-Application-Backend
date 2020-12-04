const Sequelize = require("sequelize");
const sequelize = require("../config/Database");
const Client = sequelize.define(
  "client",
  {
    id_client: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    prenom: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    pseudo: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    mot_de_passe: {
      type: Sequelize.STRING(65),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    numero_mobile: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    adresse: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    url_photo: {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: "null",
    },
    etat: {
      type: Sequelize.ENUM("en_attente", "activé", "desactivé", "bloqué"), // on utilise bloquer une fois le client ne veut pas ernouvler son offre (on le garde blocqué pour garder la trace)
      allowNull: false,
      defaultValue: "en_attente",
    },
    derniere_connexion: {
      type: Sequelize.DATE,
      allowNull: true,
      comment: "null",
    },
    changer_mpds_token: {
      type: Sequelize.STRING(65),
      allowNull: true,
      comment: "null",
    },
    changer_mpds_token_expiration: {
      type: Sequelize.DATE,
      allowNull: true,
      comment: "null",
    },
    email_validation_token: {
      type: Sequelize.STRING(65),
      allowNull: true,
      comment: "null",
    },
    numero_compte: {
      type: Sequelize.STRING(65),
      allowNull: true,
      comment: "null",
    },
    numero_carte: {
      type: Sequelize.STRING(65),
      allowNull: true,
      comment: "null",
    },
    id_type_paiment: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      reference: {
        model: "type_paiment",
        key: "id_type",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "client",
  }
);
module.exports = Client;
