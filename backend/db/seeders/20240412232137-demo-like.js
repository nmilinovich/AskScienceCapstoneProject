'use strict';

const { Like } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Like.bulkCreate([
      {
        userId: 1,
        likeableType: 'question',
        likeableId: 1,
        dislike: false
      },
      {
        userId: 2,
        likeableType: 'question',
        likeableId: 1,
        dislike: true
      },
      {
        userId: 3,
        likeableType: 'question',
        likeableId: 1,
        dislike: true
      },
      {
        userId: 4,
        likeableType: 'answer',
        likeableId: 1,
        dislike: false
      },
      {
        userId: 1,
        likeableType: 'answer',
        likeableId: 1,
        dislike: false
      },
      {
        userId: 1,
        likeableType: 'question',
        likeableId: 2,
        dislike: false
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Likes';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      likeableType: { [Op.in]: ['question', 'answer', 'comment'] }
    }, {});
  }
};
