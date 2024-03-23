const {Router} = require("express")
const router = Router()
const AuthController = require('../app/controllers/AuthController')

router.post("/user/login", AuthController.login)

module.exports = router;