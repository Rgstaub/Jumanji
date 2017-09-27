module.exports = function(sequelize, DataTypes) {
    var items = sequelize.define('items', {
        itemId: DataTypes.INTEGER,
        itemName: DataTypes.STRING,
        // itemRhyme: DataTypes.STRING,
        // itemDescription: DataTypes.STRING,
        itemsImageURL: DataTypes.STRING,
    });

    items.associate = function(models) {
        items.hasMany(models.inventories);
    }

    return items;
};