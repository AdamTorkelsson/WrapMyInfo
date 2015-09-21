'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.sequelize.query('ALTER TABLE "Blobs" ' +
        'DROP CONSTRAINT "Blobs_DocumentId_fkey", ' +
        'ADD CONSTRAINT "Blobs_DocumentId_fkey" FOREIGN KEY ("DocumentId") REFERENCES "Documents"(id) ON DELETE CASCADE;', {
      type: queryInterface.sequelize.QueryTypes.RAW
    });

  },

  down: function (queryInterface, Sequelize) {
    queryInterface.sequelize.query('ALTER TABLE "Blobs" ' +
        'DROP CONSTRAINT "Blobs_DocumentId_fkey", ' +
        'ADD CONSTRAINT "Blobs_DocumentId_fkey" FOREIGN KEY ("DocumentId") REFERENCES "Documents"(id) ON DELETE NO ACTION;', {
      type: queryInterface.sequelize.QueryTypes.RAW
    });
  }
};
