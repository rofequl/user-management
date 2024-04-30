// noinspection ExceptionCaughtLocallyJS

const log = require("../../../config/logging"),
    {models} = require('../../models'),
    {body, validationResult} = require("express-validator");
const sequelize = require("../../models");

// Role list send by API
exports.getRole = async (req, res) => {
    try {
        const result = await models.Role.findAll({order: [['id', 'DESC']]});
        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (err) {
        log.Error(err.message, 'RoleController', 'getRole', err.errors, function () {
            res.status(500).json({success: false, message: "Error sending record", error: err.message});
        });
    }
}

// Role details send by API
exports.getRoleDetails = async (req, res) => {
    const {id} = req.params;
    try {
        const role = await models.Role.findByPk(id, {include: models.Permission});
        if (!role) return res.status(404).json({success: false, message: 'Role not found'});
        // Extract only the permission IDs from the associated permissions
        const permissionIds = role.Permissions.map(permission => permission.id);

        res.status(200).json({
            success: true,
            data: {
                id: role.id,
                name: role.name,
                permissionIds: permissionIds
            },
        });
    } catch (err) {
        log.Error(err.message, 'RoleController', 'getRoleDetails', err.errors, function () {
            res.status(500).json({success: false, message: "Internal Server Error", error: err.message});
        });
    }
}

// Permission list send by API
exports.getPermission = async (req, res) => {
    try {
        const result = await models.Permission.findAll({
            attributes: ['section', 'id', 'name'],
            order: [['section', 'ASC']] // Ensure results are ordered by section
        })
        // Process the result to group data by section and format it as needed
        const groupedData = {};
        result.forEach(row => {
            if (!groupedData[row.section]) {
                groupedData[row.section] = [];
            }
            groupedData[row.section].push({id: row.id, name: row.name});
        });

        // Convert the grouped data into the desired format
        const formattedResult = Object.keys(groupedData).map(section => ({
            section: section,
            permission_list: groupedData[section]
        }));
        res.status(200).json({
            success: true,
            data: formattedResult,
        });
    } catch (err) {
        log.Error(err.message, 'RoleController', 'getPermission', err.errors, function () {
            res.status(500).json({success: false, message: "Error sending record", error: err.message});
        });
    }
}

// New Role add method
module.exports.addRole = [
    body("name", "Role name required!").notEmpty().custom(async (value) => {
        const user = await models.Role.findOne({where: {name: value}});
        if (user) return Promise.reject('Role already exists');
    }),
    async (req, res) => {
        try {
            // Validation error message return to user
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(422).json({success: false, errors: errors.mapped()});
            await models.Role.create({name: req.body.name}).then(result => {
                let permission = req.body.permission;
                if (permission.length > 0) {
                    permission.forEach(item => {
                        models.Role_Permission.create({RoleId: result.id, PermissionId: item})
                    })
                }
                res.status(200).json({
                    success: true,
                    data: result,
                });
            })
        } catch (err) {
            log.Error(err.message, 'RoleController', 'addRole', err.errors, function () {
                res.status(500).json({success: false, message: "Error saving record", error: err.message});
            });
        }
    }
]

// Update Role method
module.exports.updateRole = [
    body("name", "Role name required!").notEmpty().custom(async (value, {req}) => {
        const role = await models.Role.findOne({where: {name: value}});
        console.log(req.params.id)
        if (role && role.id !== parseInt(req.params.id)) return Promise.reject('Role already exists');
    }),
    async (req, res) => {
        const {id} = req.params;
        const {name, permission} = req.body;
        try {
            // Validation error message return to user
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(422).json({success: false, errors: errors.mapped()});

            // Find the role by ID
            const role = await models.Role.findByPk(id);
            if (!role) return res.status(404).json({success: false, message: 'Role not found'});

            // Begin transaction
            const transaction = await sequelize.transaction();
            try {
                // Update role name
                role.name = name;
                await role.save({transaction});

                // Remove all permissions if permissions array is not provided or is empty
                // Set permissions using setPermissions() method
                if (!permission || permission.length === 0) await role.setPermissions([], {transaction});
                else await role.setPermissions(permission, {transaction});

                // Commit transaction
                await transaction.commit();

                res.status(200).json({
                    success: true,
                    data: role,
                });
            } catch (error) {
                // Rollback transaction on error
                await transaction.rollback();
                throw error; // Throw the error for the outer catch block to handle
            }
        } catch (err) {
            log.Error(err.message, 'RoleController', 'updateRole', err.errors, function () {
                res.status(500).json({success: false, message: "Error saving record", error: err.message});
            });
        }
    }
]

// Role Delete API
exports.deleteRole = async (req, res) => {
    const {id} = req.params;
    try {
        const role = await models.Role.findByPk(id, {include: models.User});
        if (!role) return res.status(404).json({success: false, message: 'Role not found'});
        if (role.Users.length > 0) return res.status(400).json({
            success: false,
            message: 'Role has been assign by users. Cannot delete.'
        });

        await role.destroy();

        res.status(200).json({
            success: true,
            message: 'Role deleted successfully'
        });
    } catch (err) {
        log.Error(err.message, 'RoleController', 'deleteRole', err.errors, function () {
            res.status(500).json({success: false, message: "Error sending record", error: err.message});
        });
    }
}