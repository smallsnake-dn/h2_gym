const bookingService = require("../services/Booking.service")
const ObjectResponse = require("./response/ObjectResponse")

class BookingController {
    async create(req ,res, next) {
        try {
            await bookingService.create(req);
            res.send(ObjectResponse.ok());
        } catch (error) {
            next(error)
        }
    }

    async update(req ,res, next) {
        try {
            await bookingService.update(req);
            res.send(ObjectResponse.ok());
        } catch (error) {
            next(error)
        }
    }

    async delete(req ,res, next) {
        try {
            await bookingService.delete(req);
            res.send(ObjectResponse.ok());
        } catch (error) {
            next(error)
        }
    }

    async getByLimit(req, res, next) {
        try {
            res.send(ObjectResponse.ok(await bookingService.getByLimit(req)));
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new BookingController()