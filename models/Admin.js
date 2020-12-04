const Sequelize = require("sequelize");
const sequelize = require("../config/Database");
const Admin = sequelize.define(
  "admin",
  {
    id_admin: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true,
    },
    nom: {
      type: Sequelize.STRING(45),
      allowNull: false,
      comment: "null",
    },
    prenom: {
      type: Sequelize.STRING(45),
      allowNull: false,
      comment: "null",
    },
    pseudo: {
      type: Sequelize.STRING(45),
      allowNull: true,
      comment: "null",
    },
    mot_de_passe: {
      type: Sequelize.STRING(65),
      allowNull: true,
      comment: "null",
    },
    email: {
      type: Sequelize.STRING(45),
      allowNull: false,
      comment: "null",
    },
    numero_mobile: {
      type: Sequelize.STRING(10),
      allowNull: false,
      comment: "null",
    },
    url_photo: {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: "null",
    },
    derniere_connexion: {
      type: Sequelize.TIME,
      allowNull: true,
      comment: "null",
    },
    changer_mpds_token : {
        type: Sequelize.STRING(65),
        allowNull : true, 
        comment : 'null'
    },
    changer_mpds_token_expiration : {
        type: Sequelize.DATE,
        allowNull : true, 
        comment : 'null'
    },
    email_validation_token : {
        type: Sequelize.STRING(65),
        allowNull : true, 
        comment : 'null'
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "admin",
  }
);
module.exports = Admin;
