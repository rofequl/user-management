module.exports = (sequelize) => {
    require("./RoleSeeder")(sequelize);
    require("./UserSeeder")(sequelize);
}