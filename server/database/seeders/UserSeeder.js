module.exports = (sequelize) => {
    sequelize.models.User.create({
        name: 'Admin',
        username: 'admin',
        email: 'admin@email.com',
        gender: 'Male',
        password: '9bbfbe681bc04ad0b9b9bfe962446c72ded355acffdda83c8d63a4c0925cad3ae946889c62aaed9f304b2d4ca74cc0e3faa044bd628cc5ada19b66c26dc3cd60',
        salt: '27a8b249d0fc34efb64255e8927a6995950a14de1df2c5706fca5e5ee754ecbc',
        roleId: 1,
        profilePicture: ''
    }).then(r => console.log('User seeder successfully!'));
}