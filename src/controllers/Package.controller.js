
const packageSerivce = require("../services/Package.service")
const ObjectResponse = require("./response/ObjectResponse")


class PackageController {
    async create(req ,res, next) {
        try {
            console.log("HEREEEEEEEEEEEEE");
            await packageSerivce.create(req);
            res.send(ObjectResponse.ok());
        } catch (error) {
            next(error)
        }
    }

    async update(req ,res, next) {
        try {
            await packageSerivce.update(req);
            res.send(ObjectResponse.ok());
        } catch (error) {
            next(error)
        }
    }

    async delete(req ,res, next) {
        try {
            await packageSerivce.delete(req);
            res.send(ObjectResponse.ok());
        } catch (error) {
            next(error)
        }
    }

    async getByLimit (req, res, next) {
        try { 
            res.send(ObjectResponse.ok(await packageSerivce.getByLimit(req)));
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new PackageController()
