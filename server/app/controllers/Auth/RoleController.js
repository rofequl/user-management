const log = require("../../../config/logging"),
    {models} = require('../../../app/models'),
    {body, validationResult} = require("express-validator");

// Role list send by API
exports.getRole = async (req, res, next) => {
    try {
        // Role list pagination set
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const result = await models.Role.findAndCountAll({
            offset: offset,
            limit: limit
        });
        const totalPages = Math.ceil(result.count / limit);

        res.status(200).json({
            success: true,
            data: result.rows,
            currentPage: page,
            totalPages: totalPages,
            totalItems: result.count
        });
    } catch (err) {
        log.Error(err.message, 'RoleController', 'getRole', err.errors, function () {
            res.status(500).json({success: false, message: "Error sending record", error: err.message});
        });
    }
}

// Permission list send by API
exports.getPermission = async (req, res, next) => {
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
    body("name", "Role name required!").notEmpty(),
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