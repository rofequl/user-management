module.exports = async (sequelize) => {

    // Retrieve all Permission
    const allPermission = await sequelize.models.Permission.findAll();

    await sequelize.models.Role.create(
        {
            name: 'Super Admin',
        }).then(role => role.addPermission(allPermission));

}