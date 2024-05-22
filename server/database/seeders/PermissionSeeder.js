module.exports = async (sequelize) => {
    await sequelize.models.Permission.bulkCreate([
        {name: 'View Staff List', section: 'Manage Staff'},
        {name: 'Add New Staff', section: 'Manage Staff'},
        {name: 'Edit Staff', section: 'Manage Staff'},
        {name: 'Delete Staff', section: 'Manage Staff'},
        {name: 'View Role List', section: 'Manage Staff'},
        {name: 'Add New Role', section: 'Manage Staff'},
        {name: 'Edit Role', section: 'Manage Staff'},
        {name: 'Delete Role', section: 'Manage Staff'},
    ]).then(r => console.log('Permission seeder successfully!'));
}