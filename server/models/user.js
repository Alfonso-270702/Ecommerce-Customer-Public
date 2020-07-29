'use strict';
const { encrypt} = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.UserProduct, ({foreignKey: 'userId'}))
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: `Email can't be empty`
        }
      },
      unique:{
        msg: 'Email already exist'
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: `Password can't be empty`
        }
      }
    },
    role:DataTypes.STRING  
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate: (user) =>{
        user.role = 'customer'
        user.password = encrypt(user.password)
      }
    }
  });
  return User;
};