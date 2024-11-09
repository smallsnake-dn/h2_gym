const serviceCategories = require("../services/ServiceCategories.service")
const dateTimeUtil = require("../utils/DateTime.util")
const ObjectResponse = require("./response/ObjectResponse")


class ServiceCategoriesController {
    async create(req ,res, next) {
        try {
            await serviceCategories.create(req);
            res.send(ObjectResponse.ok());
        } catch (error) {
            next(error)
        }
    }

    async update(req ,res, next) {
        try {
            await serviceCategories.update(req);
            res.send(ObjectResponse.ok());
        } catch (error) {
            next(error)
        }
    }

    async delete(req ,res, next) {
        try {
            await serviceCategories.delete(req);
            res.send(ObjectResponse.ok());
        } catch (error) {
            next(error)
        }
    }
}


module.exports = new ServiceCategoriesController();