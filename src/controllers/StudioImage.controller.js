const studioImageService = require("../services/StudioImage.service")
const ObjectResponse = require("./response/ObjectResponse")


class StudioImageController {
    async create(req ,res, next) {
        try {
            let rs = await studioImageService.create(req);
            res.send(ObjectResponse.ok(rs));
        } catch (error) {
            next(error)
        }
    }

    async update(req ,res, next) {
        try {
            let rs = await studioImageService.update(req);
            res.send(ObjectResponse.ok(rs));
        } catch (error) {
            next(error)
        }
    }

    async delete(req ,res, next) {
        try {
            await studioImageService.delete(req);
            res.send(ObjectResponse.ok());
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            res.send(ObjectResponse.ok(await studioImageService.getById(req)));
        } catch (error) {
            next(error)
        }
    }
    
    async get(req, res, next) {
        try {
            res.send(ObjectResponse.ok(await studioImageService.get(req)));
        } catch (error) {
            next(error)
        }
    }
}


module.exports = new StudioImageController()