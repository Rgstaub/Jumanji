module.exports = function(sequelize, DataTypes) {
  var turns = sequelize.define('turns', {
    startingPos: DataTypes.INTEGER,
    roll: DataTypes.INTEGER,
    endingPos: DataTypes.INTEGER,
    turn: DataTypes.INTEGER,
  })

  turns.associate = function(models) {
    turns.belongsTo(models.players, {});
    turns.belongsTo(models.choices, {});
    turns.belongsTo(models.puzzles, {});
  }

  return turns;
}