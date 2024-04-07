const express = require('express')
// Import API routes
const router = require('../routes/api.js')

module.exports = (app) => {
    // Init body-parser options (inbuilt with express)
    app.use(express.json());

    // Use API Routes
    app.use('/api', router)
}