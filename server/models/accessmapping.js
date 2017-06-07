

module.exports = function (sequelize, DataTypes) {
  const AccessMapping = sequelize.define('AccessMapping', {
    documentid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER,
    role: DataTypes.STRING
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      }
    }
  });
  return AccessMapping;
};
