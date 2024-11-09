const carouselService = require("../services/Carousel.service")
const ObjectResponse = require("./response/ObjectResponse")

class CarouselController {
    async create(req ,res, next) {
        try {
            await carouselService.create(req);
            res.send(ObjectResponse.ok());
        } catch (error) {
            next(error)
        }
    }

    async update(req ,res, next) {
        try {
            await carouselService.update(req);
            res.send(ObjectResponse.ok());
        } catch (error) {
            next(error)
        }
    }

    async delete(req ,res, next) {
        try {
            await carouselService.delete(req);
            res.send(ObjectResponse.ok());
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new CarouselController()