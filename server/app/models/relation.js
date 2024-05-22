module.exports = (sequelize) => {
    // Role and Permission Many-to-Many relation
    const Role_permission = sequelize.define('Role_Permission', {}, {timestamps: false});
    sequelize.models.Role.belongsToMany(sequelize.models.Permission, {through: Role_permission});
    sequelize.models.Permission.belongsToMany(sequelize.models.Role, {through: Role_permission});

    // Role and User Assuming a one-to-many relationship
    sequelize.models.Role.hasMany(sequelize.models.User, {foreignKey: 'roleId'});
    sequelize.models.User.belongsTo(sequelize.models.Role, {foreignKey: "roleId"});

    // Support Category and Call Support one-to-many relationship
    sequelize.models.SupportCategory.hasMany(sequelize.models.HelpDesk, {foreignKey: 'categoryId'});
    sequelize.models.HelpDesk.belongsTo(sequelize.models.SupportCategory, {foreignKey: "categoryId"});

    // User and Call Support one-to-many relationship
    sequelize.models.User.hasMany(sequelize.models.HelpDesk, {foreignKey: 'userId'});
    sequelize.models.HelpDesk.belongsTo(sequelize.models.User, {foreignKey: "userId"});
}