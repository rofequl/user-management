module.exports = (sequelize) => {
    sequelize.models.Role.bulkCreate([
        {
            name: 'Super Admin',
            permissions: [
                {
                    name: 'View User Lists',
                    Role_permission: {
                        selfGranted: true,
                    },
                },
            ],
        }
    ],{
        include: [ sequelize.models.Permission ]
    }).then(r => console.log('Role seeder successfully!'));
}