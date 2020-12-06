const Sequelize = require("sequelize");
const sequelize = require("../config/Database");

const Terre = sequelize.define(
  "terre",
  {
    id_terre: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    id_type_terre: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      reference: {
        model: "type_terre",
        key: "id_type",
      },
    },
    localisation: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    superficie: {
      type: Sequelize.INTEGER(9),
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
    date_expriration_offre: {
      type: Sequelize.DATE,
      allowNull: false,
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
    tableName: "terre",
  }
);
module.exports = Terre;
