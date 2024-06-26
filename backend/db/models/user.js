'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(
        models.Question, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        }
      );
      User.hasMany(
        models.Bookmark, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        }
      );
      User.hasMany(
        models.Answer, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        }
      );
      User.hasMany(
        models.Comment, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        }
      );
      User.hasMany(
        models.Like, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        }
      );
      User.hasMany(
        models.Image, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        }
      );
    }
  };

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [4, 31],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [5, 256],
          isEmail: true
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      }
    }, {
      sequelize,
      modelName: 'User',
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
        }
      }
    }
  );
  return User;
};
