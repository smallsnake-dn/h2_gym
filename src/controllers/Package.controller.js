
const packageSerivce = require("../services/Package.service")
const ObjectResponse = require("./response/ObjectResponse")


class PackageController {
    async create(req ,res, next) {
        try {
            let rs = await packageSerivce.create(req);
            res.send(ObjectResponse.ok(rs));
        } catch (error) {
            next(error)
        }
    }

    async update(req ,res, next) {
        try {
            let rs = await packageSerivce.update(req);
            res.send(ObjectResponse.ok(rs));
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

    async getById(req, res, next) {
        try { 
            res.send(ObjectResponse.ok(await packageSerivce.getById(req)));
        } catch (error) {
            next(error)
        }
    }
    
    async get(req, res, next) {
        try { 
            res.send(ObjectResponse.ok(await packageSerivce.get(req)));
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new PackageController()
