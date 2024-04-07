module.exports = (sequelize) => {
    sequelize.models.Role.bulkCreate([
        {name: 'Super Admin'}
    ]).then(r => console.log('Role seeder successfully!'));
}