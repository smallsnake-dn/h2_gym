const { Router } = require("express")
const serviceController = require("../controllers/StudioImage.controller")
const multer = require('multer');
const route = Router()


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

route.post("/", upload.single('studioimagepath'), serviceController.create);
route.put("/:id", serviceController.update);
route.delete("/:id", serviceController.delete);
route.get("/:id", serviceController.getById);
route.get("/", serviceController.get);

module.exports = route