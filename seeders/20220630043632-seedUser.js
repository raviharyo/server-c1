'use strict';

const { hashPassword } = require('../helpers/bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const data = require('../db.json')
    data.user.forEach(x => {
      delete x.id
      x.password = hashPassword(x.password)
      x.createdAt = new Date()
      x.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Users', data.user)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
