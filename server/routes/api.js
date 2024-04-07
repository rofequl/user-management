const {Router} = require("express")
const router = Router()
const AuthController = require('../app/controllers/AuthController')
const {detectServer} = require("../app/middleware/DetectServer");
const {authMiddleware, JWTRefresh} = require("../app/helper/auth/jwtUtils");

// User Authentication Api
router.get("/user/profile", authMiddleware, AuthController.profile);
router.post("/user/login", detectServer, AuthController.login)
router.post("/user/register", AuthController.register)
router.post("/user/logout", authMiddleware, AuthController.logout);
router.post("/user/token/refresh", JWTRefresh);

module.exports = router;