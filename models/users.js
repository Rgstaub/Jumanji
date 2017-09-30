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
    users.hasMany(models.players, {});
  }

  return users;
}

// function formatPhoneNumber(s) {
//   var s2 = (""+s).replace(/\D/g, '');
//   var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
//   return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
// }

// formatPhoneNumber();