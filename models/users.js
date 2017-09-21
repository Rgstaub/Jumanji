module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define('users', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    phone: DataTypes.STRING
  })

  users.associate = function(models) {
    users.hasMany(models.games, {});
    // users.hasMany(models.turns, {});
    // users.hasMany(models.inventories, {})
  }

  return users;
}