module.exports = async (sequelize) => {
    await sequelize.models.Permission.bulkCreate([
        {name: 'View User List'},
        {name: 'Add New User'},
        {name: 'Edit User'},
        {name: 'Delete User'},
        {name: 'View Role List'},
        {name: 'Add New Role'},
        {name: 'Edit Role'},
        {name: 'Delete Role'},
    ]).then(r => console.log('Permission seeder successfully!'));
}