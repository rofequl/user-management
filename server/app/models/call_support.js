const {DataTypes, Model} = require('sequelize');
module.exports = (sequelize) => {
    class CallSupport extends Model {
    }

    CallSupport.init({
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

    }, {sequelize, tableName: 'call_supports', paranoid: true, timestamps: true})
}