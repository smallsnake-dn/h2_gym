const customerFeedBackService = require("../services/CustomerFeedback.service")
const ObjectResponse = require("./response/ObjectResponse")

class CustomerFeedBackController {
    async create(req ,res, next) {
        try {
            await customerFeedBackService.create(req);
            res.send(ObjectResponse.ok());
        } catch (error) {
            next(error)
        }
    }

    async update(req ,res, next) {
        try {
            await customerFeedBackService.update(req);
            res.send(ObjectResponse.ok());
        } catch (error) {
            next(error)
        }
    }

    async delete(req ,res, next) {
        try {
            await customerFeedBackService.delete(req);
            res.send(ObjectResponse.ok());
        } catch (error) {
            next(error)
        }
    }

    async getByLimit(req, res, next) {
        try {
            res.send(ObjectResponse.ok(await customerFeedBackService.getByLimit(req)));
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new CustomerFeedBackController()