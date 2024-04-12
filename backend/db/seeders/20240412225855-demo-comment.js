'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Answer.bulkCreate([
      {
        userId: 1,
        commentableType: 'question',
        commentableId: 1,
        description: 'Comment 1'
      },
      {
        userId: 2,
        commentableType: 'question',
        commentableId: 1,
        description: 'Comment 2'
      },
      {
        userId: 3,
        commentableType: 'question',
        commentableId: 2,
        description: 'Comment 3'
      },
      {
        userId: 4,
        commentableType: 'question',
        commentableId: 3,
        description: 'Comment 4'
      },
      {
        userId: 5,
        commentableType: 'question',
        commentableId: 4,
        description: 'Comment 5'
      },
      {
        userId: 1,
        commentableType: 'answer',
        commentableId: 1,
        description: 'Comment 6'
      },
      {
        userId: 2,
        commentableType: 'answer',
        commentableId: 2,
        description: 'Comment 7'
      },
      {
        userId: 5,
        commentableType: 'answer',
        commentableId: 3,
        description: 'Comment 8'
      },
      {
        userId: 3,
        commentableType: 'answer',
        commentableId: 4,
        description: 'Comment 9'
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Comments';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      commentableType: { [Op.in]: ['question', 'answer'] }
    }, {});
  }
};
