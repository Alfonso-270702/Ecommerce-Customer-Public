'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProduct.belongsTo(models.User, ({foreignKey: 'userId'}))
      UserProduct.belongsTo(models.Product, ({foreignKey: 'productId'}))
    }
  };
  UserProduct.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserProduct',
    hooks:{
      beforeCreate: (user) =>{
        user.status = false
      }
    }
  });
  return UserProduct;
};