const {DataTypes, Model} = require('sequelize');
module.exports = (sequelize) => {
    class Permission extends Model {
    }

    Permission.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        section: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {sequelize, timestamps: false})
}