const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Beer = sequelize.define("Beer", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  averageRating: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  ratingCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  timestamp: true,
});

module.exports = Beer;
