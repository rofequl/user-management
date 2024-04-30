const {body, validationResult} = require("express-validator"),
    {models} = require('../../models'),
    {genPassword, validPassword} = require("../../helper/auth/passwordUtils"),
    {genUsername} = require("../../helper/helper"),
    log = require('../../../config/logging'),
    {issueJWT} = require("../../helper/auth/jwtUtils"),
    {storeUserLoginInfo} = require("../../helper/auth/loginInfo");

// Get user information
module.exports.profile = function (req, res) {
    return res.json({user: req.user});
};

module.exports.login = [
    body("email", "User email is required!").notEmpty().custom((value) => {
        return /^.+@(?:[\w-]+\.)+\w+$/.test(value) ? Promise.resolve() : Promise.reject("Invalid email address")
    }),
    body("password", "User password required!").notEmpty().isLength({min: 6, max: 20})
        .withMessage("password length minimum 6 & maximum 20!"),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({success: false, errors: errors.mapped()});
        let email = req.body.email,
            user = await models.User.findOne({
                where: {email: email},
                attributes: ['id', 'password', 'salt']
            });
        if (user && user.id) {
            const isValid = validPassword(req.body.password, user.password, user.salt);
            if (isValid) {
                let refreshKey = await storeUserLoginInfo(req, user)
                const tokenObject = issueJWT(user, refreshKey);
                res.status(200).json({success: true, token: tokenObject.token, expiresIn: tokenObject.expires});
            } else res.status(401).json({error: "Authentication failed!"});
        } else res.status(401).json({error: "Authentication failed!"});
    }
]

module.exports.register = [
    body("name", "User name required!").notEmpty(),
    body("email", "User email required!").notEmpty().isEmail().withMessage('Invalid email format')
        .custom(async (value) => {
            const user = await models.User.findOne({where: {email: value}});
            if (user) return Promise.reject('Email already exists');
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
                roleId: 1,
            };
            await models.User.create(user)
            res.status(200).json({
                success: true,
                message: 'User created successfully',
            });
        } catch (err) {
            log.Error(err.message, 'AuthController', 'register', err.errors, function () {
                res.status(500).json({success: false, message: "Error saving record", error: err.message});
            });
        }
    }
]

// User logout
module.exports.logout = function (req, res) {
    models.LoginInfo.destroy({where: {userId: req.user, refreshKey: req.refreshToken}})
        .then(num => {
            if (num === 1) res.status(200).json({message: "Logout Successfully"})
            else res.send({message: `Something went wrong please try again later!`});
        }).catch(err => res.status(500).json({message: "Logout problem", error: err}));
};