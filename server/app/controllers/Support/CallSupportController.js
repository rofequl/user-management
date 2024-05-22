// Category list send by API
const {body, validationResult} = require("express-validator");
const {models} = require("../../models");
const log = require("../../../config/logging");

// Call support list send by API
exports.getSupport = async (req, res) => {
    try {
        // User list pagination set
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const result = await models.CallSupport.findAndCountAll({
            offset: offset,
            limit: limit,
            order: [['id', 'DESC']],
            include: [
                {
                    model: models.SupportCategory,
                    attributes: ['id', 'name']
                },
                {
                    model: models.User,
                    attributes: ['id', 'name']
                }]
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
        log.Error(err.message, 'CallSupportController', 'getSupport', err.errors, function () {
            res.status(500).json({success: false, message: "Internal server error", error: err.message});
        });
    }
}

// Call support entry method
module.exports.addSupport = [
    body("callingTime", "Calling time is required!").notEmpty(),
    body("customerNumber", "Customer number is required!").notEmpty(),
    body("status", "Status is required!").notEmpty(),
    body("problem", "Problem is required!").notEmpty(),
    body("categoryId", "Category id is required!").notEmpty()
        .custom(async (categoryId) => {
            const category = await models.SupportCategory.findByPk(categoryId);
            if (!category) throw new Error('Invalid Category ID');
        }),
    async (req, res) => {
        try {
            // Validation error message return to user
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(422).json({success: false, errors: errors.mapped()});

            // initialize record
            const support = {
                callingTime: req.body.callingTime,
                customerNumber: req.body.customerNumber,
                status: req.body.status,
                problem: req.body.problem,
                solution: req.body.solution,
                note: req.body.note,
                categoryId: req.body.categoryId,
                userId: req.user.id,
            };
            await models.CallSupport.create(support).then(result => {
                res.status(200).json({
                    success: true,
                    message: 'Call Support Entry Successfully',
                    data: result,
                });
            })
        } catch (err) {
            log.Error(err.message, 'CallSupportController', 'addSupport', err.errors, function () {
                res.status(500).json({success: false, message: "Internal server error", error: err.message});
            });
        }
    }
]

// Update call support method
module.exports.updateSupport = [
    body("callingTime", "Calling time is required!").notEmpty(),
    body("customerNumber", "Customer number is required!").notEmpty(),
    body("status", "Status is required!").notEmpty(),
    body("problem", "Problem is required!").notEmpty(),
    body("categoryId", "Category id is required!").notEmpty()
        .custom(async (categoryId) => {
            const category = await models.SupportCategory.findByPk(categoryId);
            if (!category) throw new Error('Invalid Category ID');
        }),
    async (req, res) => {
        const {id} = req.params;
        try {
            // Validation error message return to user
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(422).json({success: false, errors: errors.mapped()});

            // Find the Support by ID
            const supportCheck = await models.CallSupport.findByPk(id);
            if (!supportCheck) return res.status(404).json({success: false, message: 'Support not found'});

            // initialize record
            const support = {
                callingTime: req.body.callingTime,
                customerNumber: req.body.customerNumber,
                status: req.body.status,
                problem: req.body.problem,
                solution: req.body.solution,
                note: req.body.note,
                categoryId: req.body.categoryId,
                userId: req.user.id,
            };
            await supportCheck.update(support).then(result => {
                res.status(200).json({
                    success: true,
                    message: 'Call Support Update Successfully',
                    data: result,
                });
            })
        } catch (err) {
            log.Error(err.message, 'CallSupportController', 'updateSupport', err.errors, function () {
                res.status(500).json({success: false, message: "Internal server error", error: err.message});
            });
        }
    }
]

// Call Support Delete API
exports.deleteSupport = async (req, res) => {
    const {id} = req.params;
    try {
        // Soft delete
        const deletedSupport = await models.CallSupport.destroy({where: {id: id}});
        if (deletedSupport) {
            res.status(200).json({
                success: true,
                message: 'Call support soft deleted successfully'
            });
        } else return res.status(404).json({success: false, message: 'Call support not found'});
    } catch (err) {
        log.Error(err.message, 'CallSupportController', 'deleteSupport', err.errors, function () {
            res.status(500).json({success: false, message: "Internal server error", error: err.message});
        });
    }
}