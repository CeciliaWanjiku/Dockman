

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Documents', [{
      name: 'test doc',
      content: 'some content here',
      category: 'public',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }], {});
  },

  down(queryInterface, Sequelize) {
      // Add reverting commands here.
      // Return a promise to correctly handle asynchronicity.
    return queryInterface.bulkDelete('Documents', null, {});
  }
};
