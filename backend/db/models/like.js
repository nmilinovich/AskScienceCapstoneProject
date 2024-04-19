'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Like.belongsTo(
        models.User, {
          foreignKey: 'userId',
          // as: 'likeOwner'
        }
      );
      Like.belongsTo(models.Question, {
        foreignKey: 'likeableId',
        constraints: false,
      });
      Like.belongsTo(models.Answer, {
        foreignKey: 'likeableId',
        constraints: false,
      });
      Like.belongsTo(models.Comment, {
        foreignKey: 'likeableId',
        constraints: false,
      });
    }
  }
  Like.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true
      }
    },
    likeableType: {
      type: DataTypes.ENUM('question', 'answer', 'comment'),
      allowNull: false,
      validate: {
        notNull: true
      }
    },
    likeableId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true
      }
    },
    dislike: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: true
      }
    }
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};
