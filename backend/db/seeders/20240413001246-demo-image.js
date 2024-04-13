'use strict';

const { Image } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Image.bulkCreate([
      {
        userId: 1,
        likeableType: 'question',
        likeableId: 1,
        url: 'url 1'
      },
      {
        userId: 2,
        likeableType: 'question',
        likeableId: 2,
        url: 'url 2'
      },
      {
        userId: 1,
        likeableType: 'answer',
        likeableId: 1,
        url: 'url 3'
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
