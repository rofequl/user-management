// New Role add method
const {body, validationResult} = require("express-validator"),
    {models} = require("../../models"),
    log = require("../../../config/logging");

// Category list send by API
exports.getCategory = async (req, res) => {
    try {
        const result = await models.SupportCategory.findAll({order: [['id', 'DESC']]});
        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (err) {
        log.Error(err.message, 'CategoryController', 'getCategory', err.errors, function () {
            res.status(500).json({success: false, message: "Internal server error", error: err.message});
        });
    }
}

// Support category add method
module.exports.addCategory = [
    body("name", "Category name required!").notEmpty().custom(async (value) => {
        const category = await models.SupportCategory.findOne({where: {name: value}});
        if (category) return Promise.reject('Category already exists');
    }),
    async (req, res) => {
        try {
            // Validation error message return to user
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(422).json({success: false, errors: errors.mapped()});
            await models.SupportCategory.create({name: req.body.name}).then(result => {
                res.status(200).json({
                    success: true,
                    data: result,
                });
            })
        } catch (err) {
            log.Error(err.message, 'CategoryController', 'addCategory', err.errors, function () {
                res.status(500).json({success: false, message: "Internal server error", error: err.message});
            });
        }
    }
]

// Update support category method
module.exports.updateCategory = [
    body("name", "Category name required!").notEmpty().custom(async (value, {req}) => {
        const category = await models.SupportCategory.findOne({where: {name: value}});
        if (category && category.id !== parseInt(req.params.id)) return Promise.reject('Category already exists');
    }),
    async (req, res) => {
        const {id} = req.params;
        const {name} = req.body;
        try {
            // Validation error message return to user
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(422).json({success: false, errors: errors.mapped()});

            // Find the Category by ID
            const category = await models.SupportCategory.findByPk(id);
            if (!category) return res.status(404).json({success: false, message: 'Category not found'});

            // Update category name
            category.name = name;
            await category.save();

            res.status(200).json({
                success: true,
                data: category,
            });
        } catch (err) {
            log.Error(err.message, 'CategoryController', 'updateCategory', err.errors, function () {
                res.status(500).json({success: false, message: "Internal server error", error: err.message});
            });
        }
    }
]

// Category Delete API
exports.deleteCategory = async (req, res) => {
    const {id} = req.params;
    try {
        // Soft delete
        const deletedCategory = await models.SupportCategory.destroy({where: {id: id}});
        if (deletedCategory) {
            res.status(200).json({
                success: true,
                message: 'Category soft deleted successfully'
            });
        } else return res.status(404).json({success: false, message: 'Category not found'});
    } catch (err) {
        log.Error(err.message, 'CategoryController', 'deleteCategory', err.errors, function () {
            res.status(500).json({success: false, message: "Internal server error", error: err.message});
        });
    }
}