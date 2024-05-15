const {DataTypes, Model} = require('sequelize');

module.exports = (sequelize) => {
    class LoginInfo extends Model {
    }

    LoginInfo.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            }
        },
        refreshKey: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true
            }
        },
        device: {
            type: DataTypes.JSON,
        },
        userAgent: {
            type: DataTypes.STRING,
        },
        ip: {
            type: DataTypes.STRING,
        },
        userLocation: {
            type: DataTypes.JSON,
        },
        expiredTime: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notNull: true
            }
        },
        lastActive: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {sequelize, tableName: 'login_info', timestamps: false})
}