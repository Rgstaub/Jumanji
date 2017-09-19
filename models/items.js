module.exports = function(sequelize, DataTypes) {
    var Items = sequelize.define('items', {
        itemName: DataTypes.STRING,
        itemRhyme: DataTypes.STRING,
        itemHints: DataTypes.STRING,
        itemType: DataTypes.STRING,
        itemsImageURL: DataTypes.STRING,
    });
    return Items;
};