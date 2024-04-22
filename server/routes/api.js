const {Router} = require("express")
const router = Router()
const AuthController = require('../app/controllers/Auth/AuthController')
const RoleController = require('../app/controllers/Auth/RoleController')
const {detectServer} = require("../app/middleware/DetectServer");
const {authMiddleware, JWTRefresh} = require("../app/helper/auth/jwtUtils");

// User Authentication Api
router.get("/user/profile", authMiddleware, AuthController.profile);
router.post("/user/login", detectServer, AuthController.login)
router.post("/user/register", AuthController.register)
router.post("/user/logout", authMiddleware, AuthController.logout);
router.post("/user/token/refresh", JWTRefresh);

// User Role Api
router.get("/role/list", authMiddleware, RoleController.getRole);

module.exports = router;