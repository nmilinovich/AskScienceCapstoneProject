'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Question.belongsTo(
      //   models.User, {
      //     foreignKey: 'userId',
      //     as: 'Owner'
      //   }
      // );
    }
  }
  Question.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true
      }
    },
    type: {
      type: DataTypes.ENUM('biology', 'chemisty', 'physics'),
      allowNull: false,
      validate: {
        notNull: true
      }
    },
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};
