'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {}
  }
  Bet.init(
    {
      ip: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'composite_index',
        validate: {
          isIP: true
        }
      },
      userAgent: {
        type: DataTypes.STRING,
        defaultValue: 'information is absent'
      },
      team: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'composite_index',
        validate: {
          is: /^[A-Za-z0-9\s]{2,18}$/
        }
      },
      betValue: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isIn: [[100, 200, 500, 1000, 5000]]
        }
      },
      isWinned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: 'Bet'
    }
  );
  return Bet;
};
