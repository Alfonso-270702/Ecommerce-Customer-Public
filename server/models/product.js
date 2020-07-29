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
      Product.hasMany(models.UserProduct, ({foreignKey: 'productId'}))
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: `Name can't be empty`
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: `Image url can't be empty`
        },
        isUrl:{
          args: true,
          msg: 'Invalid url'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate:{
        notEmpty:{
          msg: `Price can't be empty`
        },
        notBelowZero(value){
          if(value < 0){
            throw new Error('Price cant below 0')
          }
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate:{
        notEmpty:{
          msg: `Stock can't be empty`
        },
        notBelowZero(value){
          if(value < 0){
            throw new Error('Stock cant below 0')
          }
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};