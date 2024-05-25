const {body, validationResult} = require("express-validator");
const {models} = require("../../models");
const log = require("../../../config/logging");

// Support list send by API
exports.getSupport = async (req, res) => {
    try {
        // Support list pagination set
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const result = await models.Support.findAndCountAll({
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
        log.Error(err.message, 'SupportController', 'getSupport', err.errors, function () {
            res.status(500).json({success: false, message: "Internal server error", error: err.message});
        });
    }
}

// Call support entry method
module.exports.addSupport = [
    body("supportTime", "Support time is required!").notEmpty(),
    body("type", "Support type is required!").notEmpty().matches(/^(Support|Training)$/)
        .withMessage('Type must be either "Support" or "Training"'),
    body("medium", "Support Medium is required!").notEmpty().matches(/^(Physical|Virtual)$/)
        .withMessage('Medium must be either "Physical" or "Virtual"'),
    body("office", "Office name is required!").notEmpty(),
    body("status", "Status is required!").notEmpty(),
    body("description", "Description is required!").notEmpty(),
    body("requestedBy", "Requested By is required!").notEmpty(),
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
                supportTime: req.body.supportTime,
                type: req.body.type,
                status: req.body.status,
                medium: req.body.medium,
                office: req.body.office,
                description: req.body.description,
                requestedBy: req.body.requestedBy,
                categoryId: req.body.categoryId,
                userId: req.user.id,
            };
            await models.Support.create(support).then(result => {
                res.status(200).json({
                    success: true,
                    message: 'Support Entry Successfully',
                    data: result,
                });
            })
        } catch (err) {
            log.Error(err.message, 'SupportController', 'addSupport', err.errors, function () {
                res.status(500).json({success: false, message: "Internal server error", error: err.message});
            });
        }
    }
]

// Update call support method
module.exports.updateSupport = [
    body("supportTime", "Support time is required!").notEmpty(),
    body("type", "Support type is required!").notEmpty().matches(/^(Support|Training)$/)
        .withMessage('Type must be either "Support" or "Training"'),
    body("medium", "Support Medium is required!").notEmpty().matches(/^(Physical|Virtual)$/)
        .withMessage('Medium must be either "Physical" or "Virtual"'),
    body("office", "Office name is required!").notEmpty(),
    body("status", "Status is required!").notEmpty(),
    body("description", "Description is required!").notEmpty(),
    body("requestedBy", "Requested By is required!").notEmpty(),
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
            const supportCheck = await models.Support.findByPk(id);
            if (!supportCheck) return res.status(404).json({success: false, message: 'Support not found'});

            // initialize record
            const support = {
                supportTime: req.body.supportTime,
                type: req.body.type,
                status: req.body.status,
                medium: req.body.medium,
                office: req.body.office,
                description: req.body.description,
                requestedBy: req.body.requestedBy,
                categoryId: req.body.categoryId,
                userId: req.user.id,
            };
            await supportCheck.update(support).then(result => {
                res.status(200).json({
                    success: true,
                    message: 'Support Update Successfully',
                    data: result,
                });
            })
        } catch (err) {
            log.Error(err.message, 'SupportController', 'updateSupport', err.errors, function () {
                res.status(500).json({success: false, message: "Internal server error", error: err.message});
            });
        }
    }
]

// Support Delete API
exports.deleteSupport = async (req, res) => {
    const {id} = req.params;
    try {
        // Soft delete
        const deletedSupport = await models.Support.destroy({where: {id: id}});
        if (deletedSupport) {
            res.status(200).json({
                success: true,
                message: 'Support deleted successfully'
            });
        } else return res.status(404).json({success: false, message: 'Support not found'});
    } catch (err) {
        log.Error(err.message, 'SupportController', 'deleteSupport', err.errors, function () {
            res.status(500).json({success: false, message: "Internal server error", error: err.message});
        });
    }
}