

module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    name: DataTypes.STRING,
    Content: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      }
    }
  });
  return Document;
};
