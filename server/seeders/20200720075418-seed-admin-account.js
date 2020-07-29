'use strict';
const { encrypt } = require('../helpers/bcrypt')
module.exports = {
  up:  (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Users', [{
      email: 'admin@mail.com',
      password: encrypt('12345678'),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
  },

  down:  (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
