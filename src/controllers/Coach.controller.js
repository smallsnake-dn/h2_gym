const coachSerivce = require("../services/Coach.service")
const ObjectResponse = require("./response/ObjectResponse")


class CoachController {
    async create(req ,res, next) {
        try {
            await coachSerivce.create(req);
            res.send(ObjectResponse.ok());
        } catch (error) {
            next(error)
        }
    }

    async update(req ,res, next) {
        try {
            await coachSerivce.update(req);
            res.send(ObjectResponse.ok());
        } catch (error) {
            next(error)
        }
    }

    async delete(req ,res, next) {
        try {
            await coachSerivce.delete(req);
            res.send(ObjectResponse.ok());
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new CoachController()