'use strict';

const { Answer } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

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
        description: "Each hair goes through a cycle of growth, rest, and shedding. It is simply that head hair grows for 2-8 years while body hair grows for 30-45 days only. That means that, rather than body hair growing shorter, it simply doesn't have enough time to grow longer. As such, even head hair has its limits; while some people manage to grow very long hair, other people will find that their hair won't grow past the middle of their back. And finally, the reason we don't notice those hair phases is because each follicle has its own schedule, so every day you're shedding older hair and growing new ones. It's just that the shorter hair isn't as noticeable. That's also the reason laser treatments take many sessions, because they target the growth phase, so it fails to kill hairs that are in the rest or shedding phase. And that also explains why (if you live with a long haired person) the house is always covered in hair yet that person never gets bald"
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
    }, {truncate: true, restartIdentity: true});
  }
};
