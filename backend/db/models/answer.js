'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Answer.belongsTo(
        models.User, {
          foreignKey: 'userId',
          as: 'Owner'
        }
      );
      Answer.belongsTo(
        models.Question, {
          foreignKey: 'userId',
          as: 'Answers'
        }
      );
      Answer.hasMany(
        models.Comment, {
          foreignKey: 'commentableId',
          constraints: false,
          scope: {
            commentableType: 'answer'
          },
          onDelete: 'CASCADE'
        }
      );
    }
  }
  Answer.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true
      }
    },
    questionId: {
      type: DataTypes.INTEGER,
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
    }
  }, {
    sequelize,
    modelName: 'Answer',
  });
  return Answer;
};
