'use strict';

const { Answer } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Answer.bulkCreate([
      {
        userId: 1,
        questionId: 1,
        description: 'Answer 1'
      },
      {
        userId: 2,
        questionId: 1,
        description: 'Answer 2'
      },
      {
        userId: 3,
        questionId: 1,
        description: 'Answer 3'
      },
      {
        userId: 1,
        questionId: 2,
        description: 'Answer 4'
      },
      {
        userId: 2,
        questionId: 2,
        description: 'Answer 5'
      },
      {
        userId: 3,
        questionId: 2,
        description: 'Answer 6'
      },
      {
        userId: 1,
        questionId: 3,
        description: 'Answer 7'
      },
      {
        userId: 2,
        questionId: 3,
        description: 'Answer 8'
      },
      {
        userId: 3,
        questionId: 3,
        description: 'Answer 9'
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Answers';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      description: { [Op.in]: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4', 'Answer 5', 'Answer 6', 'Answer 7', 'Answer 8', 'Answer 9',] }
    }, {});
  }
};
