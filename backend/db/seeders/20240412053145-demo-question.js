'use strict';

const { Question } = require('../models');


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Question.bulkCreate([
      {
        userId: 1,
        title: "Why does arm and leg hair have a growth limit while head hair appears to grow continuously?",
        description: 'Why does arm and leg hair stop growing at a certain length, whereas head hair seems to have no limit to its growth?',
        type: "biology",
      },
      {
        userId: 2,
        title: "Quesion 2",
        description: 'Description of 2',
        type: "chemistry",
      },
      {
        userId: 3,
        title: "Quesion 3",
        description: 'Description of 3',
        type: "physics",
      },
      {
        userId: 4,
        title: "Quesion 4",
        description: 'Description of 4',
        type: "biology",
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Questions';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      description: { [Op.in]: ['Description of 4', 'Description of 3', 'Description of 2', 'These are my legitimate concerns'] }
    }, {truncate: true, restartIdentity: true});
  }
};
