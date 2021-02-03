const Sequelize = require("sequelize");
const sequelize = require("../config/Database");

const Zone = sequelize.define(
  "zone",
  {
    id_zone: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nbr_irrigation_rester: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    irrigation_auto : {
      type : Sequelize.BOOLEAN, 
      allowNull : false,
      defaultValue : true,
    },
    jours_irrigation : {
      type : Sequelize.STRING, 
      allowNull : true, 
    },
    heures_irrigation : {
      type : Sequelize.STRING, 
      allowNull : true,
    },
    id_type_agriculture: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      reference: {
        model: "type_agriculture",
        key: "id_type",
      },
    },
    id_terre: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      reference: {
        model: "terre",
        key: "id_terre",
      },
    },
    id_cycle: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: true,
      reference: {
        model: "cycle_vegetal",
        key: "id_cycle",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "zone",
  }
);
module.exports = Zone;
