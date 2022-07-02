'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, {
        foreignKey: `authorId`
      })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: `Email can not be empty`
        },
        notNull: {
          msg: `Email can not be Null`
        },
        isEmail: {
          msg: `FIll email with true format`
        }
      }
    },
    username: DataTypes.STRING,

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `password can not be empty`
        },
        notNull: {
          msg: `password can not be Null`
        },
        len: {
          args: [5, 245],
          msg: `Input Password minimal 5 characters`
        }
      }
    },
    phoneNumber: DataTypes.STRING,
    role: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(instance, options) {
        instance.password = hashPassword(instance.password)
      }
    }
  });
  return User;
};