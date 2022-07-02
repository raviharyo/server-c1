'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        foreignKey: `categoryId`
      })
      Product.belongsTo(models.User, {
        foreignKey: `authorId`
      })
      Product.hasMany(models.Image, {
        foreignKey: `productId`
      })
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Name can not be empty`
        },
        notNull: {
          msg: `Name can not be Null`
        },

      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Slug can not be empty`
        },
        notNull: {
          msg: `Slug can not be Null`
        },

      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Description can not be empty`
        },
        notNull: {
          msg: `Description can not be Null`
        },

      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Price can not be empty`
        },
        notNull: {
          msg: `Price can not be Null`
        },

      }
    },
    mainImg: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `MainImg can not be empty`
        },
        notNull: {
          msg: `MainImg can not be Null`
        },

      }
    },
    categoryId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',

  });
  return Product;
};