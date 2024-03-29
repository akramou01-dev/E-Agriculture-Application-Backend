const Sequelize = require("sequelize");
const sequelize = require("../config/Database");
const Coupon = sequelize.define(
  "coupon",
  {
    id_coupon: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true,
    },
    // etat: {
    //   type: Sequelize.ENUM("valide", "expiré"),
    //   allowNull: false,
    //   defaultValue: "valide",
    // },
    code: {
      type: Sequelize.STRING(45),
      allowNull: false,
      comment: "null",
    },
    date_debut: {
      type: Sequelize.DATE,
      allowNull: false,
      coment: "null",
    },
    date_fin: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    reduction: {
      // en %
      type: Sequelize.INTEGER,
      allowNull: false,
      comment: "null",
    },
    nbr_utilisation: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    id_offre: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      reference: {
        model: "offre",
        key: "id_offre",
      },
    },
    id_admin: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      reference: {
        model: "admin",
        key: "id_admin",
      },
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
    tableName: "coupon",
  }
);
module.exports = Coupon;
