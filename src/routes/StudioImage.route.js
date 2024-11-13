const { Router } = require("express")
const serviceController = require("../controllers/StudioImage.controller")
const route = Router()

route.post("/", serviceController.create);
route.put("/", serviceController.update);
route.delete("/:id", serviceController.delete);
route.get("/:limit", serviceController.getByLimit);

module.exports = route