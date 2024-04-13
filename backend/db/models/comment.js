'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(
        models.User, {
          foreignKey: 'userId',
          as: 'AnswerOwner'
        }
      );
      Comment.belongsTo(models.Question, {
        foreignKey: 'commentableId',
        constraints: false,
      });
      Comment.belongsTo(models.Answer, {
        foreignKey: 'commentableId',
        constraints: false,
      });
      Comment.hasMany(
        models.Like, {
          foreignKey: 'commentableId',
          constraints: false,
          scope: {
            likeableType: 'answer'
          },
          onDelete: 'CASCADE'
        }
      );
    }
  }
  Comment.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true
      }
    },
    commentableType: {
      type: DataTypes.ENUM('question', 'answer'),
      allowNull: false,
      validate: {
        notNull: true
      }
    },
    commentableId: {
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
    },
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
