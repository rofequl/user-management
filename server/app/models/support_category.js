const {DataTypes, Model} = require('sequelize');
module.exports = (sequelize) => {
    class SupportCategory extends Model {
    }

    SupportCategory.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {sequelize, tableName: 'support_category', paranoid: true, timestamps: true})
}