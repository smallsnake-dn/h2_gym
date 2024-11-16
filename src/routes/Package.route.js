const { Router } = require("express")
const serviceController = require("../controllers/Package.controller")
const route = Router()

route.post("/", serviceController.create);
route.put("/:id", serviceController.update);
route.delete("/:id", serviceController.delete);
route.get("/:id", serviceController.getById);
route.get("/", serviceController.get);

module.exports = route