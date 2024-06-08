const {DataTypes, Model} = require('sequelize');
module.exports = (sequelize) => {
    class AttachmentUpload extends Model {
    }

    AttachmentUpload.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        FileName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        FileType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        FileSize: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        modelName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        modelId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    }, {sequelize, tableName: 'attachment_upload', timestamps: true})
}