const {DataTypes, Model} = require('sequelize');
module.exports = (sequelize) => {
    class Role extends Model {
    }

    Role.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {tableName: 'role', sequelize, timestamps: false})
}