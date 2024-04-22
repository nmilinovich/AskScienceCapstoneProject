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
      Question.belongsTo(
        models.User, {
          foreignKey: 'userId',
          as: 'questionOwner'
        }
      );
      // Question.hasMany(
      //   models.Bookmark, {
      //     foreignKey: 'userId',
      //   }
      // );
      Question.hasMany(
        models.Answer, {
          foreignKey: 'questionId',
          onDelete: 'CASCADE',
          // as: "Answers"
        }
      );
      Question.hasMany(
        models.Comment, {
          foreignKey: 'commentableId',
          constraints: false,
          scope: {
            commentableType: 'question'
          },
          onDelete: 'CASCADE'
        }
      );
      Question.hasMany(
        models.Like, {
          foreignKey: 'likeableId',
          constraints: false,
          scope: {
            likeableType: 'question'
          },
          onDelete: 'CASCADE',
        }
      );
      Question.hasMany(
        models.Image, {
          foreignKey: 'imageableId',
          constraints: false,
          scope: {
            imageableType: 'question'
          },
          onDelete: 'CASCADE'
        }
      );
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
      type: DataTypes.ENUM('biology', 'chemistry', 'physics'),
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
