const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('mygov', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 100,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: true
});

// Check DB Connection
sequelize.authenticate().then(() => console.log('Database Connection Successfully'))
    .catch(err => console.log('Unable to connect to the database:' + err))

sequelize.sync({alter: true});
module.exports = sequelize