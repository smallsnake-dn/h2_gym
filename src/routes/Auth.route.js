const { Router } = require("express")
const checkToken = require("../middlewares/checkToken.middleware")
const authController = require("../controllers/Auth.controller")
const route = Router()

route.post("/login", authController.login);
route.post("/refresh", checkToken, authController.refreshToken);

module.exports = route