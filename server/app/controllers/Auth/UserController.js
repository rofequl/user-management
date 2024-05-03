const log = require("../../../config/logging"),
    {models} = require('../../../app/models'),
    {genPassword} = require("../../helper/auth/passwordUtils"),
    {genUsername} = require("../../helper/helper"),
    {body, validationResult} = require("express-validator");

// User list send by API
exports.getUser = async (req, res, next) => {
    try {
        // User list pagination set
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const result = await models.User.findAndCountAll({
            offset: offset,
            limit: limit,
            order: [['id', 'DESC']],
            include: models.Role
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
        log.Error(err.message, 'UserController', 'getUser', err.errors, function () {
            res.status(500).json({success: false, message: "Error sending record", error: err.message});
        });
    }
}

// New user creation API
module.exports.addUser = [
    body("name", "User name required!").notEmpty(),
    body("email", "User email required!").notEmpty().isEmail().withMessage('Invalid email format')
        .custom(async (value) => {
            const user = await models.User.findOne({where: {email: value}});
            if (user) return Promise.reject('Email already exists');
        }),
    body("gender", "Gender is required!").notEmpty().matches(/^(Male|Female)$/)
        .withMessage('Gender must be either "male" or "female"'),
    body("roleId", "Role id is required!").notEmpty()
        .custom(async (roleId) => {
            const role = await models.Role.findByPk(roleId);
            if (!role) throw new Error('Invalid role ID');
        }),
    body("password", "User password required!").notEmpty().isLength({
        min: 6,
        max: 20,
    }).withMessage("password length minimum 6 & maximum 20!"),
    body("confirm_password", "User confirm password required!").notEmpty().custom((value, {req}) => {
        return value !== req.body.password ? Promise.reject("Password confirmation does not match password") : true;
    }),
    async (req, res) => {
        try {
            // Validation error message return to user
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(422).json({success: false, errors: errors.mapped()});

            // Password Hash & Salt generate and also username
            const saltHash = genPassword(req.body.password), salt = saltHash.salt,
                password = saltHash.hash, username = genUsername(req);
            // initialize record
            const user = {
                name: req.body.name,
                email: req.body.email,
                password,
                username,
                salt,
                gender: req.body.gender,
                roleId: req.body.roleId,
                profilePicture: 'public/images/profile.png',
            };
            await models.User.create(user)
            res.status(200).json({
                success: true,
                message: 'User created successfully',
            });
        } catch (err) {
            log.Error(err.message, 'UserController', 'addUser', err.errors, function () {
                res.status(500).json({success: false, message: "Error saving record", error: err.message});
            });
        }
    }
]

// Update existing user API
module.exports.updateUser = [
    body("name", "User name required!").notEmpty(),
    body("email", "User email required!").notEmpty().isEmail().withMessage('Invalid email format')
        .custom(async (value, {req}) => {
            const user = await models.User.findOne({where: {email: value}});
            if (user && user.id !== parseInt(req.params.id)) return Promise.reject('Email already exists');
        }),
    body("gender", "Gender is required!").notEmpty().matches(/^(Male|Female)$/)
        .withMessage('Gender must be either "male" or "female"'),
    body("roleId", "Role id is required!").notEmpty()
        .custom(async (roleId) => {
            const role = await models.Role.findByPk(roleId);
            if (!role) throw new Error('Invalid role ID');
        }),
    body("password", "User password required!").notEmpty().isLength({
        min: 6,
        max: 20,
    }).withMessage("password length minimum 6 & maximum 20!"),
    body("confirm_password", "User confirm password required!").notEmpty().custom((value, {req}) => {
        return value !== req.body.password ? Promise.reject("Password confirmation does not match password") : true;
    }),
    async (req, res) => {
        const {id} = req.params;
        try {
            // Validation error message return to user
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(422).json({success: false, errors: errors.mapped()});

            // Find the user by ID
            const userCheck = await models.User.findByPk(id);
            if (!userCheck) return res.status(404).json({success: false, message: 'User not found'});

            // Password Hash & Salt generate and also username
            const saltHash = genPassword(req.body.password), salt = saltHash.salt,
                password = saltHash.hash, username = genUsername(req);
            // initialize record
            const user = {
                name: req.body.name,
                email: req.body.email,
                password,
                salt,
                gender: req.body.gender,
                roleId: req.body.roleId,
            };
            await userCheck.update(user)
            res.status(200).json({
                success: true,
                message: 'User updated successfully',
            });
        } catch (err) {
            log.Error(err.message, 'UserController', 'updateUser', err.errors, function () {
                res.status(500).json({success: false, message: "Error saving record", error: err.message});
            });
        }
    }
]