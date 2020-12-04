const Sequelize = require("sequelize");
const sequelize = require("../config/Database");

const CycleVegetal = sequelize.define(
  "cycle_vegetal",
  {
    id_cycle: {
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
    id_type_agriculture: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      reference: {
        model: "type_agriculture",
        key: "id_type",
      },
    },
    date_debut: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    date_fin: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    jours_irrigation: {
      // on va faire la solution basic celle de stocker tous les jours dans cet collones en les séparent par des |
      type: Sequelize.TEXT,
      allowNull: false,
    },
    nbr_irrigation_par_jour: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "cycle_vegetal",
  }
);
module.exports = CycleVegetal;
