const {DataTypes, Model} = require('sequelize');
module.exports = (sequelize) => {
    class HelpDesk extends Model {
    }

    HelpDesk.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        callingTime: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notNull: true
            }
        },
        customerNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        problem: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        solution: {
            type: DataTypes.TEXT
        },
        note: {
            type: DataTypes.TEXT
        }

    }, {sequelize, tableName: 'help_desks', paranoid: true, timestamps: true})
}