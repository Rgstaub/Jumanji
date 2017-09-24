module.exports = function(sequelize, DataTypes) {
  var choices = sequelize.define('choices', {
    text: DataTypes.STRING,
    itemOption: DataTypes.BOOLEAN,
    resultAction: DataTypes.STRING,
    resultValue: DataTypes.INTEGER,
    resultText: DataTypes.STRING
  })

  choices.associate = function(models) {
    choices.belongsTo(models.puzzles, {});
    //choices.belongsTo(models.turns, {});
  }

  return choices;
}