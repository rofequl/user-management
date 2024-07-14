const {Sequelize} = require('sequelize');
const dbConfig = require('../../config/database')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    dialect: dbConfig.dialect,
    host: dbConfig.HOST,
    charset: 'latin1',
    collate: 'latin1_swedish_ci',
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    operatorsAliases: 0,
    supportBigNumbers: true,
    bigNumberStrings: true,
    timezone: '+06:00',
    logging: false
});

const modelDefiners = [
    require('./permission'),
    require('./role'),
    require('./user'),
    require('./login_info'),
    require('./support_category'),
    require('./help_desk'),
    require('./support'),
    require('./attachments_upload'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

// Model Relationship all defined here
require('./relation')(sequelize)

module.exports = sequelize