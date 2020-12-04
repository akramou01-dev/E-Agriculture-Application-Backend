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
    id_terre: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      reference: {
        model: "terre",
        key: "id_terre",
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
    nbr_irrigation_rester: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "zone",
  }
);
module.exports = Zone;
