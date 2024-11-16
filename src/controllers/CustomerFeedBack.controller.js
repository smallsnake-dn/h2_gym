const customerFeedBackService = require("../services/CustomerFeedback.service")
const ObjectResponse = require("./response/ObjectResponse")

class CustomerFeedBackController {
    async create(req ,res, next) {
        try {
            let rs = await customerFeedBackService.create(req);
            res.send(ObjectResponse.ok(rs));
        } catch (error) {
            next(error)
        }
    }

    async update(req ,res, next) {
        try {
            let rs = await customerFeedBackService.update(req);
            res.send(ObjectResponse.ok(rs));
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

    async getById(req, res, next) {
        try {
            res.send(ObjectResponse.ok(await customerFeedBackService.getById(req)));
        } catch (error) {
            next(error)
        }
    }
    
    async get(req, res, next) {
        try {
            res.send(ObjectResponse.ok(await customerFeedBackService.get(req)));
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new CustomerFeedBackController()