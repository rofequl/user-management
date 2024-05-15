const {Router} = require("express")
const router = Router()
const AuthController = require('../app/controllers/Auth/AuthController')
const UserController = require('../app/controllers/Auth/UserController')
const RoleController = require('../app/controllers/Auth/RoleController')
const CategoryController = require('../app/controllers/Support/CategoryController')
const {detectServer} = require("../app/middleware/DetectServer");
const {authMiddleware, JWTRefresh} = require("../app/helper/auth/jwtUtils");

// User Authentication Api
router.get("/user/profile", authMiddleware, AuthController.profile);
router.post("/user/login", detectServer, AuthController.login)
router.post("/user/logout", authMiddleware, AuthController.logout);
router.post("/user/token/refresh", JWTRefresh);

// App User Management API
router.get("/user", authMiddleware, UserController.getUser);
router.post("/user", authMiddleware, UserController.addUser)
router.put("/user/:id", authMiddleware, UserController.updateUser)

// User Role Api
router.get("/role", authMiddleware, RoleController.getRole);
router.post("/role", authMiddleware, RoleController.addRole);
router.get("/role/:id", authMiddleware, RoleController.getRoleDetails);
router.put("/role/:id", authMiddleware, RoleController.updateRole);
router.delete("/role/:id", authMiddleware, RoleController.deleteRole);
router.get("/permission/list", authMiddleware, RoleController.getPermission);

// Support Category
router.get("/support/category", authMiddleware, CategoryController.getCategory);
router.post("/support/category", authMiddleware, CategoryController.addCategory);
router.put("/support/category/:id", authMiddleware, CategoryController.updateCategory);
router.delete("/support/category/:id", authMiddleware, CategoryController.deleteCategory);


module.exports = router;