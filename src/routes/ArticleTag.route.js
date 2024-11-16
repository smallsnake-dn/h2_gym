const { Router } = require("express")
const serviceController = require("../controllers/ArticleTag.controller")
const route = Router()

route.post("/", serviceController.create);
route.put("/:id", serviceController.update);
route.delete("/:id", serviceController.delete);

module.exports = route