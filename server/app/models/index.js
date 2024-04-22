const {Sequelize} = require('sequelize');
const dbConfig = require('../../config/database')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    dialect: dbConfig.dialect,
    host: dbConfig.HOST,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    operatorsAliases: 0,
});

const modelDefiners = [
    require('./permission'),
    require('./role'),
    require('./user'),
    require('./login_info'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

// Role and Permission Many-to-Many relation
const Role_permission = sequelize.define('Role_Permission', {}, {timestamps: false});
sequelize.models.Role.belongsToMany(sequelize.models.Permission, {through: Role_permission});
sequelize.models.Permission.belongsToMany(sequelize.models.Role, {through: Role_permission});

module.exports = sequelize