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

// Model Relationship all defined here
require('./relation')(sequelize)

module.exports = sequelize