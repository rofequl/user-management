module.exports = (sequelize) => {
    sequelize.models.User.create({
        name: 'Admin',
        username: 'admin',
        email: 'admin@email.com',
        gender: 'Male',
        password: '12345678',
        roleId: 1,
        profilePicture: ''
    }).then(r => console.log('Role seeder successfully!'));
}