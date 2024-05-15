module.exports = async (sequelize) => {
    await require("./PermissionSeeder")(sequelize);
    await require("./RoleSeeder")(sequelize);
    await require("./UserSeeder")(sequelize);
    await require("./SupportCategorySeeder")(sequelize);
}