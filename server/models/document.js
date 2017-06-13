const User = require('./user');

module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    name: DataTypes.STRING,
    content: DataTypes.TEXT,
    category: DataTypes.TEXT
  }, {
    classMethods: {
      associate: (models) => {
        Document.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Document;
};
