

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      name: 'admin',
      email: 'admin@admin.com',
      password: 'password',
      role: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      name: 'user',
      email: 'user@user.com',
      password: 'password',
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }], {});
  },

  down(queryInterface, Sequelize) {
      // Add reverting commands here.
      // Return a promise to correctly handle asynchronicity.
      return queryInterface.bulkDelete('Users', null, {});
  }
};
