const express = require('express')
const cors = require("cors");

// Import API routes
const router = require('../routes/api.js')

module.exports = (app) => {
    // Init body-parser options (inbuilt with express)
    app.use(express.json());
    app.use(cors())
    // Use API Routes
    app.use('/api', router)
}