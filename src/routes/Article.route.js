const { Router } = require("express")
const serviceController = require("../controllers/Article.controller")
const route = Router()
const verifyLogin = require("../middlewares/verifylogin.middleware")

route.post("/", serviceController.create);
route.put("/:id", serviceController.update);
route.delete("/:id", serviceController.delete);
route.post("/take", serviceController.getByLimit);
route.get("/", serviceController.get);
route.get("/:id", serviceController.getById);

module.exports = route