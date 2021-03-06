module.exports = function(sequelize, DataTypes) {
  var choices = sequelize.define('choices', {
    text: DataTypes.STRING,
    itemOption: DataTypes.BOOLEAN,
    correctItemId: DataTypes.INTEGER,
    resultAction: DataTypes.STRING,
    resultValue: DataTypes.INTEGER,
    resultText: DataTypes.STRING
  })

  choices.associate = function(models) {
    choices.belongsTo(models.puzzles, {});
  }

  return choices;
}