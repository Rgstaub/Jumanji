module.exports = function(sequelize, DataTypes) {
    var Puzzles = sequelize.define('puzzles', {
        puzzleName: DataTypes.STRING,
        puzzleRhyme: DataTypes.STRING,
        puzzleOptions: DataTypes.STRING,
        puzzleSolution: DataTypes.STRING,
        puzzleSuccess: DataTypes.STRING,
        puzzleFail: DataTypes.STRING,
        puzzleSound: DataTypes.STRING,
    });
    return Puzzles;
};