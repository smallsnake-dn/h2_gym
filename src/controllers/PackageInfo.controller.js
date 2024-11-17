
const packageSerivce = require("../services/PackageInfo.service")
const ObjectResponse = require("./response/ObjectResponse")


class PackageInfoController {
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
    
    
    async getById(req ,res, next) {
        try {
            let rs = await packageSerivce.getById(req);
            res.send(ObjectResponse.ok(rs));
        } catch (error) {
            next(error)
        }
    }
    
    async get(req ,res, next) {
        try {
            let rs = await packageSerivce.get(req);
            res.send(ObjectResponse.ok(rs));
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new PackageInfoController()
