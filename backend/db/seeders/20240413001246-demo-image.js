'use strict';

const { Image } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Image.bulkCreate([
      {
        userId: 1,
        imageableType: 'question',
        imageableId: 1,
        url: 'https://external-preview.redd.it/most-of-my-leg-hair-grows-in-groups-of-3-v0-LB19BTNCC3LqEzD2_gBRpDy_IKkyShHPpDpeRHKpu4g.jpg?width=640&crop=smart&auto=webp&s=65438c8ee0ca2d734351f888d009f946ecf7329b'
      },
      {
        userId: 1,
        imageableType: 'question',
        imageableId: 1,
        url: 'https://www.marthastewart.com/thmb/PrIw3eXt0Rz4x7n5G1I6H_pdobI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/hair-part-salon-getty-0421-2000-41dd599b36a749188478fc805b2f7f72.jpg'
      },
      {
        userId: 1,
        imageableType: 'answer',
        imageableId: 1,
        url: 'url 3'
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Images';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      imageableType: { [Op.in]: ['question', 'answer'] }
    }, {truncate: true, restartIdentity: true});
  }
};
