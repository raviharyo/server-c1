'use strict';

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
    data.product.forEach(x => {
      delete x.id
      x.slug = x.name.split(' ').join('-')
      x.createdAt = new Date()
      x.updatedAt = new Date()
    })

    await queryInterface.bulkInsert('Products', data.product)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Products', null)
  }
};
