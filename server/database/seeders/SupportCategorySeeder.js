module.exports = async (sequelize) => {
    await sequelize.models.SupportCategory.bulkCreate([
        {name: 'Login Problem'},
        {name: 'NID Verification'},
        {name: 'About myGov'},
    ]).then(r => console.log('SupportCategory seeder successfully!'));
}