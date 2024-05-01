const {body, validationResult} = require("express-validator"),
    {models} = require('../../models'),
    {validPassword} = require("../../helper/auth/passwordUtils"),
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

// User logout
module.exports.logout = function (req, res) {
    models.LoginInfo.destroy({where: {userId: req.user, refreshKey: req.refreshToken}})
        .then(num => {
            if (num === 1) res.status(200).json({message: "Logout Successfully"})
            else res.send({message: `Something went wrong please try again later!`});
        }).catch(err => res.status(500).json({message: "Logout problem", error: err}));
};