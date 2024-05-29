const {DataTypes, Model} = require('sequelize');
const {generateTrackingId} = require("../helper/helper");
module.exports = (sequelize) => {
    class Support extends Model {
    }

    Support.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        supportTime: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notNull: true
            }
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['Support', 'Training']],
                notNull: true
            }
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        medium: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['Physical', 'Virtual']],
                notNull: true
            }
        },
        office: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        requestedBy: {
            type: DataTypes.TEXT
        },
        trackingId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: true
            }
        }

    }, {
        sequelize, tableName: 'support', paranoid: true, timestamps: true,
    })
}