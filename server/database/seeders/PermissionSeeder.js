module.exports = async (sequelize) => {
    await sequelize.models.Permission.bulkCreate([
        {name: 'View User List', section: 'Manage User'},
        {name: 'Add New User', section: 'Manage User'},
        {name: 'Edit User', section: 'Manage User'},
        {name: 'Delete User', section: 'Manage User'},
        {name: 'View Role List', section: 'Manage User'},
        {name: 'Add New Role', section: 'Manage User'},
        {name: 'Edit Role', section: 'Manage User'},
        {name: 'Delete Role', section: 'Manage User'},
    ]).then(r => console.log('Permission seeder successfully!'));
}