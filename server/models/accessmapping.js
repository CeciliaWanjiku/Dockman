'use strict';
module.exports = function(sequelize, DataTypes) {
  var AccessMapping = sequelize.define('AccessMapping', {
    documentid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER,
    role: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return AccessMapping;
};