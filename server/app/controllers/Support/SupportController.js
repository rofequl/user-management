const {body, validationResult} = require("express-validator");
const {models} = require("../../models");
const log = require("../../../config/logging");
const {generateTrackingId} = require("../../helper/helper");
const fs = require('fs');
const SaveFile = require('../../helper/saveFile');

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

exports.getSupportDetails = async (req, res) => {
    const {id} = req.params;
    try {
        const support = await models.Support.findOne({
            where: {trackingId: id},
            include: [
                {
                    model: models.SupportCategory,
                    attributes: ['id', 'name']
                },
                {
                    model: models.User,
                    attributes: ['id', 'name']
                },
                {
                    model: models.AttachmentUpload,
                    include: [
                        {
                            model: models.User,
                            attributes: ['name', 'profilePicture']
                        }
                    ],
                    order: ['id', 'DESC']
                }]
        });
        if (support) {
            const attachmentUploads = support.AttachmentUploads;
            if (attachmentUploads && attachmentUploads.length > 0) {
                attachmentUploads.forEach(attachment => {
                    modifyAttachmentPaths(attachment)
                });
            }
            res.status(200).json({
                success: true,
                message: 'Support details found',
                data: support,
            });
        } else return res.status(404).json({success: false, message: 'Support not found'});
    } catch (err) {
        log.Error(err.message, 'SupportController', 'getSupportDetails', err.errors, function () {
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

            const lastOrder = await models.Support.findOne({
                order: [['id', 'DESC']]
            });
            const lastInsertId = lastOrder ? lastOrder.id + 1 : 1;

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
                trackingId: generateTrackingId(lastInsertId, 'HD-')
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
            await supportCheck.update(support).then(async (result) => {
                const populatedSupport = await models.Support.findOne({
                    where: {id: result.id},
                    include: [
                        {model: models.SupportCategory, attributes: ['id', 'name']},
                        {model: models.User, attributes: ['id', 'name']}
                    ]
                });
                res.status(200).json({
                    success: true,
                    message: 'Support Update Successfully',
                    data: populatedSupport,
                });
            })
        } catch (err) {
            log.Error(err.message, 'SupportController', 'updateSupport', err.errors, function () {
                res.status(500).json({success: false, message: "Internal server error", error: err.message});
            });
        }
    }
]

/**
 * Deletes a support entry from the database.
 *
 * @return {Promise<void>} - A promise that resolves when the support entry is successfully deleted.
 *                           If the support entry is not found, it returns a 404 status with a message.
 *                           If there is an error, it returns a 500 status with an error message.
 */
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

exports.addFile = async (req, res) => {
    const {id} = req.params;

    if (!req.file) {
        return res.status(400).json({success: false, message: 'No file uploaded'});
    }
    try {
        // Find the Support by ID
        const supportCheck = await models.Support.findByPk(id);
        if (!supportCheck) return res.status(404).json({success: false, message: 'Support not found'});

        const {originalname, mimetype, buffer, size} = req.file;

        // Validate file type (optional, adjust as needed)
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/plain', 'application/x-zip-compressed', 'video/mp4'];
        if (!allowedTypes.includes(mimetype)) return res.status(400).json({
            success: false,
            message: 'Invalid file type'
        });

        const fileUpload = new SaveFile('support', originalname);
        const fileResponse = await fileUpload.save(buffer);
        const attachment = {
            path: fileResponse.path,
            FileName: fileResponse.filename,
            FileType: fileResponse.fileType,
            FileSize: Math.round(size / 1024),
            modelName: 'Support',
            modelId: id,
            userId: req.user.id
        };

        const createdAttachment = await models.AttachmentUpload.create(attachment);

        // Fetch the created attachment along with the user information
        const result = await models.AttachmentUpload.findOne({
            where: {id: createdAttachment.id},
            include: [
                {
                    model: models.User,
                    attributes: ['name', 'profilePicture'] // Include the fields you want from the User model
                }
            ]
        });
        modifyAttachmentPaths(result)
        res.status(200).json({
            success: true,
            message: 'File uploaded successfully!',
            data: result
        });
    } catch (err) {
        log.Error(err.message, 'SupportController', 'addFile', err.errors, function () {
            res.status(500).json({success: false, message: "Internal server error", error: err.message});
        });
    }
}

exports.deleteFile = async (req, res) => {
    const {id} = req.params;
    try {
        // const attachment = await models.AttachmentUpload.destroy({where: {id: id}});
        // if (attachment) {
        res.status(200).json({
            success: true,
            message: 'Attachment deleted successfully'
        });
        // } else return res.status(404).json({success: false, message: 'Attachment not found'});
    } catch (err) {
        log.Error(err.message, 'SupportController', 'deleteFile', err.errors, function () {
            res.status(500).json({success: false, message: "Internal server error", error: err.message});
        });
    }

}

// Helper function to modify attachment paths and user profile pictures
const modifyAttachmentPaths = (attachment) => {
    attachment.path = `${process.env.APP_URL}:${process.env.APP_PORT}/${attachment.path}`;
    if (attachment.User) {
        attachment.User.profilePicture = `${process.env.APP_URL}:${process.env.APP_PORT}/${attachment.User.profilePicture}`;
    }
};
