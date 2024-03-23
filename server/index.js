const express = require('express')
require('./config/database')
const app = express()

const port = 3000

// Init body-parser options (inbuilt with express)
app.use(express.json());

// Import API routes
const router = require('./routes/api.js')
// Use API Routes
app.use('/api', router)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => console.log(`Example app listening on port ${port}`))