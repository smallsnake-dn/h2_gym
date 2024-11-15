const { Router } = require("express")
const serviceController = require("../controllers/PackageInfo.controller")
const route = Router()

route.post("/", serviceController.create);
route.put("/", serviceController.update);
route.delete("/:id", serviceController.delete);

module.exports = route