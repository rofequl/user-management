const log = require("../../../config/logging"),
    {models} = require('../../../app/models'),
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
        log.Error(err.message, 'UserController', 'getUser', err.errors, function () {
            res.status(500).json({success: false, message: "Error sending record", error: err.message});
        });
    }
}