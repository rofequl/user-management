module.exports = (sequelize) => {
    require("./PermissionSeeder")(sequelize);
    require("./RoleSeeder")(sequelize);
}