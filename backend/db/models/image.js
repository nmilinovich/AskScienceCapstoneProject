'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsTo(
        models.User, {
          foreignKey: 'userId',
          as: 'ImageOwner'
        }
      );
      Image.belongsTo(models.Question, {
        foreignKey: 'imageableId',
        constraints: false,
      });
      Image.belongsTo(models.Answer, {
        foreignKey: 'imageableId',
        constraints: false,
      });
    }
  }
  Image.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true
      }
    },
    imageableType: {
      type: DataTypes.ENUM('question', 'answer'),
      allowNull: false,
      validate: {
        notNull: true
      }
    },
    imageableId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true
      }
    }
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
