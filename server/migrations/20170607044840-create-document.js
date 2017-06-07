

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('documents', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    Content: {
      type: Sequelize.TEXT
    },
    userId: {
      type: Sequelize.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('documents');
  }
};
