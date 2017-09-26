module.exports = function(sequelize, DataTypes) {
    var puzzles = sequelize.define('puzzles', {
        puzzleRhyme: DataTypes.TEXT,
        puzzleScenario: DataTypes.TEXT,
        puzzleImageUrl: DataTypes.STRING
    });

    puzzles.associate = function(models) {
        puzzles.hasMany(models.choices, {})
    }
    return puzzles;
};