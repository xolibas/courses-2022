const User = (sequelize, DataTypes) => {
  const UserModel = sequelize.define('users', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  return UserModel;
};

module.exports = User;
