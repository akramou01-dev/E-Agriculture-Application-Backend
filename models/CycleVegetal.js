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
    date_debut: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    date_fin: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    jours_irrigation: {
      /**on va faire la solution basic celle de stocker tous les jours dans cet collones en les séparent par des |
       * exemple : 7|5|1  (vendredi|mercredi|samedi)*/

      type: Sequelize.TEXT,
      allowNull: false,
    },
    heures_irrigation: {
      /**on va faire la solution basic stocker tous les heure dans une collones en les separrant par |
       * on va inclure la quantité de l'eau dans heure herigation
       * exemple : 14-1|5-2|10-0.3 ==> (1 heure d'irrigation a 14 heure| 2 heure d'irrigation a 5 heure| 30 min d'irrigation a 10heure )
       */
      type: Sequelize.TEXT,
      allowNull: false,
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
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "cycle_vegetal",
  }
);
module.exports = CycleVegetal;
