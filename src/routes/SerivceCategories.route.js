const { Router } = require("express")
const serviceController = require("../controllers/ServiceCategories.controller")
const route = Router()

route.post("/", serviceController.create);
route.put("/", serviceController.update);
route.delete("/", serviceController.delete);

module.exports = route