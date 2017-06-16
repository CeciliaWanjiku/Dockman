

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [6, 128],
          msg: 'Email address must be between 6 and 128 characters in length'
        },
        isEmail: {
          msg: 'Email address must be valid'
        }
      }

    },
    role: DataTypes.ENUM('admin', 'user'),
    password: DataTypes.STRING,
    // roleId: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Document, {
          foreignKey: 'userId',
          as: 'documents'
        });
      }
    },
  });
  return User;
};
