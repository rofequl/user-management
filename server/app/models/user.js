const {DataTypes, Model} = require('sequelize');

module.exports = (sequelize) => {
    class User extends Model {
    }

    User.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: true
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            isEmail: true,
            unique: true,
            validate: {
                notNull: true
            }
        },
        mobile: {
            type: DataTypes.STRING,
        },
        dob: {
            type: DataTypes.DATE,
            validate: {
                isDate: true
            }
        },
        gender: {
            type: DataTypes.STRING,
            validate: {
                isIn: [['Male', 'Female']],
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 1         // 1 = Active
        },
        profilePicture: {
            type: DataTypes.STRING
        },
    }, {
        sequelize,
        defaultScope: {
            attributes: {
                exclude: ['password', 'salt']
            }
        },
    })
}