const {body, validationResult} = require("express-validator");

module.exports.login = [
    body("email", "User email is required!").notEmpty().custom((value) => {
        return /^.+@(?:[\w-]+\.)+\w+$/.test(value) ? Promise.resolve() : Promise.reject("Invalid email address")
    }),
    body("password", "User password required!").notEmpty().isLength({min: 6, max: 20})
        .withMessage("password length minimum 6 & maximum 20!"),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({success: false, errors: errors.mapped()});

        res.send('Hello World!')
    }
]

module.exports.register = [
    async (req, res) => {
        res.send('Hello World!')
    }
]