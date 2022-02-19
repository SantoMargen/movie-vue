'use strict';

const genres = require('../Db/genre.json')
module.exports = {
  up: async (queryInterface, Sequelize) => {
   genres.forEach(el => {
     el.createdAt = new Date()
     el.updatedAt = new Date()
   });

   await queryInterface.bulkInsert('Genres', genres, {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Genres', null, {});
  }
};
